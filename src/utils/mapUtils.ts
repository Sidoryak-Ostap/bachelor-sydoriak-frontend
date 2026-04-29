import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

export const syncAllFieldsLayer = (map: mapboxgl.Map, fields: any[], popup: mapboxgl.Popup) => {
  const sourceId = 'all-fields-source';
  const layerId = 'all-fields-layer';
  const labelId = 'all-fields-labels';

  const featureCollection: any = {
    type: 'FeatureCollection',
    features: fields.map((f: any) => ({
      type: 'Feature',
      geometry: f.boundary,
      properties: {
        title: f.name,
        id: f.id,
        area: f.area,
        crop: f.cropType || 'Not specified',
      },
    })),
  };

  const source = map.getSource(sourceId) as mapboxgl.GeoJSONSource;

  if (source) {
    source.setData(featureCollection);
  } else {
    map.addSource(sourceId, { type: 'geojson', data: featureCollection });

    // The Fill Layer
    map.addLayer({
      id: layerId,
      type: 'fill',
      source: sourceId,
      paint: {
        'fill-color': '#00ff88',
        'fill-opacity': 0.2,
        'fill-outline-color': '#ffffff',
      },
    });

    // The Text Labels
    map.addLayer({
      id: labelId,
      type: 'symbol',
      source: sourceId,
      layout: {
        'text-field': ['get', 'title'],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': 12,
        'text-anchor': 'center',
      },
      paint: {
        'text-color': '#ffffff',
        'text-halo-color': 'rgba(0,0,0,0.8)',
        'text-halo-width': 1,
      },
    });

    // Hover Events
    map.on('mousemove', layerId, e => {
      if (!e.features?.length) return;

      map.getCanvas().style.cursor = 'pointer';
      const props = e.features[0].properties;

      popup
        .setLngLat(e.lngLat)
        .setHTML(
          `
          <div style="padding: 4px; font-family: sans-serif;">
            <div style="font-weight: bold; font-size: 14px; color: #1a202c;">${props?.title}</div>
            <div style="font-size: 13px; color: #4a5568; margin-top: 4px;">
              Crop: ${props?.crop}<br/>
              Area: ${props?.area} ha
            </div>
          </div>
        `
        )
        .addTo(map);
    });

    map.on('mouseleave', layerId, () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
  }
};

export const highlightSingleField = (
  map: mapboxgl.Map,
  fieldData: any | null,
  id: string | undefined
) => {
  const sourceId = 'single-field-source';
  const layerId = 'single-field-layer';
  const labelId = 'single-field-label';

  // 1. Prepare the GeoJSON
  const singleGeoJson: any =
    id && fieldData
      ? {
          type: 'Feature',
          geometry: fieldData.boundary,
          properties: { title: fieldData.name },
        }
      : {
          type: 'FeatureCollection',
          features: [],
        };

  const source = map.getSource(sourceId) as mapboxgl.GeoJSONSource;

  if (source) {
    source.setData(singleGeoJson);
  } else {
    // 2. Initialize layers if they don't exist
    map.addSource(sourceId, { type: 'geojson', data: singleGeoJson });

    map.addLayer({
      id: layerId,
      type: 'fill',
      source: sourceId,
      paint: {
        'fill-color': '#0080ff',
        'fill-opacity': 0.5,
        'fill-outline-color': '#ffffff',
      },
    });

    map.addLayer({
      id: labelId,
      type: 'symbol',
      source: sourceId,
      layout: {
        'text-field': ['get', 'title'],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': 16,
        'text-anchor': 'center',
      },
      paint: {
        'text-color': '#ffffff',
        'text-halo-color': '#000',
        'text-halo-width': 2,
      },
    });
  }

  if (id && fieldData) {
    const coords = fieldData.boundary.coordinates[0];
    const bounds = coords.reduce(
      (acc: mapboxgl.LngLatBounds, coord: number[]) => acc.extend(coord as [number, number]),
      new mapboxgl.LngLatBounds(coords[0] as [number, number], coords[0] as [number, number])
    );

    map.fitBounds(bounds, { padding: 100, duration: 2000 });
  }
};

export const calculateArea = (coords: number[][] | null) => {
  if (!coords) return '0.00';
  const polygon = turf.polygon([[...coords, coords[0]]]);
  const areaInMeters = turf.area(polygon);

  const areaInHectares = areaInMeters / 10000;

  return areaInHectares.toFixed(2);
};

export const removeNdviLayer = (map: mapboxgl.Map, fieldId: string) => {
  const sourceId = `ndvi-source-${fieldId}`;
  const layerId = `ndvi-layer-${fieldId}`;

  if (map.getLayer(layerId)) {
    map.removeLayer(layerId);
  }
  if (map.getSource(sourceId)) {
    map.removeSource(sourceId);
  }
};

export const toggleNdviLayer = (
  map: mapboxgl.Map,
  imageUrl: string | null,
  coords: number[][] | null,
  fieldId: string
) => {
  const sourceId = `ndvi-source-${fieldId}`;
  const layerId = `ndvi-layer-${fieldId}`;

  // Якщо imageUrl або coords відсутні — видаляємо шар (якщо він є)
  if (!imageUrl || !coords) {
    removeNdviLayer(map, fieldId);
    return;
  }

  const source = map.getSource(sourceId) as mapboxgl.ImageSource;

  if (source) {
    // Якщо джерело вже є, просто оновлюємо URL та координати
    source.updateImage({ url: imageUrl, coordinates: coords as any });
  } else {
    // Додаємо нове джерело типу 'image'
    map.addSource(sourceId, {
      type: 'image',
      url: imageUrl,
      coordinates: coords as any,
    });

    // Додаємо шар
    map.addLayer(
      {
        id: layerId,
        type: 'raster',
        source: sourceId,
        paint: {
          'raster-opacity': 0.8,
          'raster-fade-duration': 300,
          'raster-resampling': 'linear',
        },
      },
      'single-field-label'
    );
  }
};
