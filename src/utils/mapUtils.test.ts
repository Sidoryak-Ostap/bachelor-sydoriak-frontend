import * as turf from '@turf/turf';
import { describe, expect, it, vi } from 'vitest';
import {
  syncAllFieldsLayer,
  highlightSingleField,
  removeNdviLayer,
  calculateArea,
  toggleNdviLayer,
} from './mapUtils';

describe('calculateArea', () => {
  it('should return "0.00" for null coordinates', () => {
    expect(calculateArea(null)).toBe('0.00');
  });

  it('should calculate area correctly for a simple square', () => {
    const coords = [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0],
    ];
    const expectedArea = (turf.area(turf.polygon([[...coords, coords[0]]])) / 10000).toFixed(2);
    expect(calculateArea(coords)).toBe(expectedArea);
  });

  it('should calculate area correctly for a triangle', () => {
    const coords = [
      [0, 0],
      [0, 1],
      [1, 0],
    ];
    const expectedArea = (turf.area(turf.polygon([[...coords, coords[0]]])) / 10000).toFixed(2);
    expect(calculateArea(coords)).toBe(expectedArea);
  });

  it('should calculate area correctly for a complex polygon', () => {
    const coords = [
      [0, 0],
      [0, 2],
      [1, 2],
      [1, 1],
      [2, 1],
      [2, 0],
    ];
    const expectedArea = (turf.area(turf.polygon([[...coords, coords[0]]])) / 10000).toFixed(2);
    expect(calculateArea(coords)).toBe(expectedArea);
  });

  it('should return "0.00" for a polygon with zero area', () => {
    const coords = [
      [0, 0],
      [0, 0],
      [0, 0],
    ];
    expect(calculateArea(coords)).toBe('0.00');
  });

  it('should handle invalid coordinates gracefully', () => {
    const coords = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [0, 0], // Closing the polygon
    ];
    expect(calculateArea(coords)).toBe('0.00');
  });
});

const makeMapMock = (sourceExists: boolean, layerExists?: boolean) => ({
  getSource: vi.fn().mockReturnValue(sourceExists ? { setData: vi.fn() } : null),
  getLayer: vi.fn().mockReturnValue(layerExists ? {} : null),
  addSource: vi.fn(),
  addLayer: vi.fn(),
  on: vi.fn(),
  getCanvas: vi.fn().mockReturnValue({ style: {} }),
  fitBounds: vi.fn(),

  removeLayer: vi.fn(),
  removeSource: vi.fn(),
});

const popupMock = {
  setLngLat: vi.fn().mockReturnThis(),
  setHTML: vi.fn().mockReturnThis(),
  addTo: vi.fn().mockReturnThis(),
  remove: vi.fn(),
};

describe('syncAllFieldsLayer', () => {
  const fields = [
    {
      id: 1,
      name: 'Field A',
      area: 10,
      cropType: 'Wheat',
      boundary: { type: 'Polygon', coordinates: [] },
    },
  ];
  it('calls setData when source already exists', () => {
    const map = makeMapMock(true);
    syncAllFieldsLayer(map as any, fields, popupMock as any);

    expect(map.getSource).toHaveBeenCalledWith('all-fields-source');
    expect(map.addSource).not.toHaveBeenCalled();
  });

  it('adds source and 2 layers when source does not exist', () => {
    const map = makeMapMock(false);
    syncAllFieldsLayer(map as any, fields, popupMock as any);

    expect(map.addSource).toHaveBeenCalledWith(
      'all-fields-source',
      expect.objectContaining({ type: 'geojson' })
    );
    expect(map.addLayer).toHaveBeenCalledTimes(2);
  });

  it('maps fields to correct GeoJSON features', () => {
    const map = makeMapMock(false);
    syncAllFieldsLayer(map as any, fields, popupMock as any);

    const [, sourceArg] = map.addSource.mock.calls[0];
    expect(sourceArg.data.features[0].properties).toEqual({
      title: 'Field A',
      id: 1,
      area: 10,
      crop: 'Wheat',
    });
  });

  it('registers hover events on the fill layer', () => {
    const map = makeMapMock(false);
    syncAllFieldsLayer(map as any, fields, popupMock as any);

    const eventNames = map.on.mock.calls.map(([event]: any) => event);
    expect(eventNames).toContain('mousemove');
    expect(eventNames).toContain('mouseleave');
  });
});

describe('highlightSingleField', () => {
  const fieldData = {
    name: 'Field A',
    boundary: {
      type: 'Polygon',
      coordinates: [
        [
          [30.1, 50.1],
          [30.2, 50.1],
          [30.2, 50.2],
          [30.1, 50.2],
          [30.1, 50.1],
        ],
      ],
    },
  };
  describe('when source does not exist', () => {
    it('adds source and 2 layers', () => {
      const map = makeMapMock(false);
      highlightSingleField(map as any, fieldData, '1');

      expect(map.addSource).toHaveBeenCalledWith(
        'single-field-source',
        expect.objectContaining({ type: 'geojson' })
      );
      expect(map.addLayer).toHaveBeenCalledTimes(2);
    });
  });

  describe('when source already exists', () => {
    it('calls setData instead of addSource', () => {
      const map = makeMapMock(true);
      highlightSingleField(map as any, fieldData, '1');

      expect(map.addSource).not.toHaveBeenCalled();
      const source = map.getSource('single-field-source') as any;
      expect(source.setData).toHaveBeenCalled();
    });
  });

  describe('GeoJSON shape', () => {
    it('builds a Feature when id and fieldData are provided', () => {
      const map = makeMapMock(false);
      highlightSingleField(map as any, fieldData, '1');

      const [, sourceArg] = map.addSource.mock.calls[0];
      expect(sourceArg.data).toMatchObject({
        type: 'Feature',
        properties: { title: 'Field A' },
      });
    });

    it('builds an empty FeatureCollection when id is missing', () => {
      const map = makeMapMock(false);
      highlightSingleField(map as any, fieldData, undefined);

      const [, sourceArg] = map.addSource.mock.calls[0];
      expect(sourceArg.data).toMatchObject({
        type: 'FeatureCollection',
        features: [],
      });
    });

    it('builds an empty FeatureCollection when fieldData is null', () => {
      const map = makeMapMock(false);
      highlightSingleField(map as any, null, '1');

      const [, sourceArg] = map.addSource.mock.calls[0];
      expect(sourceArg.data).toMatchObject({
        type: 'FeatureCollection',
        features: [],
      });
    });
  });

  describe('fitBounds', () => {
    it('calls fitBounds when id and fieldData are provided', () => {
      const map = makeMapMock(false);
      highlightSingleField(map as any, fieldData, '1');

      expect(map.fitBounds).toHaveBeenCalledWith(expect.anything(), {
        padding: 100,
        duration: 2000,
      });
    });

    it('does not call fitBounds when id is missing', () => {
      const map = makeMapMock(false);
      highlightSingleField(map as any, fieldData, undefined);

      expect(map.fitBounds).not.toHaveBeenCalled();
    });
  });
});

describe('removeNdviLayer', () => {
  it('removes layer and source when both exist', () => {
    const map = makeMapMock(true, true);
    removeNdviLayer(map as any, '42');

    expect(map.removeLayer).toHaveBeenCalledWith('ndvi-layer-42');
    expect(map.removeSource).toHaveBeenCalledWith('ndvi-source-42');
  });

  it('does not remove layer when it does not exist', () => {
    const map = makeMapMock(false, false);
    removeNdviLayer(map as any, '42');

    expect(map.removeLayer).not.toHaveBeenCalled();
  });

  it('does not remove source when it does not exist', () => {
    const map = makeMapMock(false, true);
    removeNdviLayer(map as any, '42');

    expect(map.removeLayer).toHaveBeenCalledWith('ndvi-layer-42');
    expect(map.removeSource).not.toHaveBeenCalled();
  });

  it('uses fieldId to build correct source and layer ids', () => {
    const map = makeMapMock(true, true);
    removeNdviLayer(map as any, 'field-99');

    expect(map.getLayer).toHaveBeenCalledWith('ndvi-layer-field-99');
    expect(map.getSource).toHaveBeenCalledWith('ndvi-source-field-99');
  });
});
