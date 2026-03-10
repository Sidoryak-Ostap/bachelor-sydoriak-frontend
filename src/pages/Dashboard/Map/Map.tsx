import React, { useEffect, useRef, useState } from 'react';

import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapToolBar from './MapToolBar';
import { useAppSelector } from '@/store/store';
import { useCreateField } from '@/hooks/fields/useCreateField';
import Loader from '@/components/Loader/Loader';
import ConfirmButton from './ConfirmButton';
import NavigationGuard from '@/components/NavigationGuard/NavigationGuard';
import { useParams } from 'react-router-dom';
import { useGetFieldById } from '@/hooks/fields/useGetFieldById';
import { useGetFields } from '@/hooks/fields/useGetFields';
import FieldsBar from './FieldsBar/FieldsBar';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map: React.FC = () => {
  const [coordinates, setCoordinates] = useState<number[][] | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [mode, setMode] = useState<'view' | 'draw'>('view');
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);

  const { id } = useParams();

  const { data, isDrawing } = useAppSelector(state => state.createField);
  const { mutate, isPending } = useCreateField();
  const { data: fieldData } = useGetFieldById(id || null);
  const { data: allFields } = useGetFields();

  // initialize map and draw controls

  useEffect(() => {
    if (!mapContainer.current) return;

    // 1. Ініціалізація карти
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [24.03, 49.84],
      zoom: 11,
    });

    // 2. Ініціалізація Draw без стандартних кнопок
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      userProperties: true,
      defaultMode: 'simple_select',
    });

    mapInstance.addControl(draw);
    drawRef.current = draw;
    map.current = mapInstance;

    const handleSelectionChange = (e: any) => {
      setIsSelected(e.features.length > 0);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelected();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const updateCoordinates = (e: any) => {
      if (e.features.length > 0) {
        setCoordinates(e.features[0].geometry.coordinates[0]);
      }
    };

    mapInstance.on('draw.create', updateCoordinates);
    mapInstance.on('draw.update', updateCoordinates);
    mapInstance.on('draw.delete', () => setCoordinates(null));

    mapInstance.on('draw.selectionchange', handleSelectionChange);

    mapInstance.on('draw.modechange', (e: any) => {
      if (e.mode === 'draw_polygon') setMode('draw');
      else setMode('view');
    });

    return () => {
      mapInstance.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    const currentMap = map.current;
    if (!currentMap || !allFields) return;

    const updateLayers = () => {
      // --- ALL FIELDS LAYER ---
      const allSourceId = 'all-fields-source';
      const featureCollection: any = {
        type: 'FeatureCollection',
        features: allFields.map((f: any) => ({
          type: 'Feature',
          geometry: f.boundary,
          properties: { title: f.name, id: f.id },
        })),
      };

      if (currentMap.getSource(allSourceId)) {
        (currentMap.getSource(allSourceId) as mapboxgl.GeoJSONSource).setData(featureCollection);
      } else {
        currentMap.addSource(allSourceId, { type: 'geojson', data: featureCollection });
        currentMap.addLayer({
          id: 'all-fields-layer',
          type: 'fill',
          source: allSourceId,
          paint: { 'fill-color': '#00ff88', 'fill-opacity': 0.2, 'fill-outline-color': '#ffffff' },
        });
        currentMap.addLayer({
          id: 'all-fields-labels',
          type: 'symbol',
          source: allSourceId,
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
      }

      // --- SINGLE HIGHLIGHTED FIELD LAYER ---
      const singleSourceId = 'single-field-source';
      if (id && fieldData) {
        const singleGeoJson: any = {
          type: 'Feature',
          geometry: fieldData.boundary,
          properties: { title: fieldData.name },
        };

        if (currentMap.getSource(singleSourceId)) {
          (currentMap.getSource(singleSourceId) as mapboxgl.GeoJSONSource).setData(singleGeoJson);
        } else {
          currentMap.addSource(singleSourceId, { type: 'geojson', data: singleGeoJson });
          currentMap.addLayer({
            id: 'single-field-layer',
            type: 'fill',
            source: singleSourceId,
            paint: {
              'fill-color': '#0080ff',
              'fill-opacity': 0.5,
              'fill-outline-color': '#ffffff',
            },
          });
          currentMap.addLayer({
            id: 'single-field-label',
            type: 'symbol',
            source: singleSourceId,
            layout: {
              'text-field': ['get', 'title'],
              'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
              'text-size': 16,
              'text-anchor': 'center',
            },
            paint: { 'text-color': '#ffffff', 'text-halo-color': '#000', 'text-halo-width': 2 },
          });
        }

        // Fly to the specific field
        const coords = fieldData.boundary.coordinates[0];
        // Cast coords[0] as a tuple of two numbers
        const bounds = coords.reduce(
          (acc: mapboxgl.LngLatBounds, coord: number[]) => acc.extend(coord as [number, number]),
          new mapboxgl.LngLatBounds(coords[0] as [number, number], coords[0] as [number, number])
        );
        currentMap.fitBounds(bounds, { padding: 100, duration: 2000 });
      } else if (!id) {
        // Clear highlight if no ID
        if (currentMap.getSource(singleSourceId)) {
          (currentMap.getSource(singleSourceId) as mapboxgl.GeoJSONSource).setData({
            type: 'FeatureCollection',
            features: [],
          });
        }

        // Fit bounds to ALL fields if we are on general map
        if (allFields.length > 0) {
          const bounds = new mapboxgl.LngLatBounds();
          allFields.forEach((f: any) =>
            f.boundary.coordinates[0].forEach((c: any) => bounds.extend(c))
          );
          currentMap.fitBounds(bounds, { padding: 50, duration: 1500 });
        }
      }
    };

    if (currentMap.isStyleLoaded()) updateLayers();
    else currentMap.once('load', updateLayers);
  }, [allFields, fieldData, id]);

  const zoomIn = () => map.current?.zoomIn();
  const zoomOut = () => map.current?.zoomOut();

  // Методи для керування малюванням
  const toggleDrawPolygon = () => {
    if (drawRef.current) {
      drawRef.current.changeMode('draw_polygon');
      setMode('draw');
    }
  };

  const cancelDrawing = () => {
    if (drawRef.current) {
      drawRef.current.changeMode('simple_select');
      setMode('view');
    }
  };

  const deleteSelected = () => {
    if (drawRef.current) {
      drawRef.current.trash();
      setIsSelected(false);
    }
  };

  const handleSaveField = () => {
    if (coordinates) {
      mutate({
        ...data,
        boundary: {
          type: 'Polygon',
          coordinates: [coordinates],
        },
      });
    }
  };

  const isUnsavedChanges = isDrawing;

  return (
    <div className="w-full h-full relative group">
      <div className="w-full h-full relative" ref={mapContainer} />

      {isDrawing && coordinates && (
        <ConfirmButton handleSaveField={handleSaveField} coordinates={coordinates} />
      )}

      {isPending && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-100 flex items-center justify-center transition-all">
          <Loader />
        </div>
      )}

      <NavigationGuard shouldBlock={isUnsavedChanges} />

      <FieldsBar fields={allFields || []} />
      <MapToolBar
        mode={mode}
        isSelected={isSelected}
        toggleDrawPolygon={toggleDrawPolygon}
        cancelDrawing={cancelDrawing}
        deleteSelected={deleteSelected}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
      />
    </div>
  );
};

export default Map;
