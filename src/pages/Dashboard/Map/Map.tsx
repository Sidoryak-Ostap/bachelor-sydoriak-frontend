import React, { useEffect, useRef, useState } from 'react';

import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapToolBar from './MapToolBar';
import { useAppSelector } from '@/store/store';
import { useCreateField } from '@/hooks/useCreateField';
import Loader from '@/components/Loader/Loader';
import ConfirmButton from './ConfirmButton';
import NavigationGuard from '@/components/NavigationGuard/NavigationGuard';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);

  const [mode, setMode] = useState<'view' | 'draw'>('view');
  const [isSelected, setIsSelected] = useState(false);

  const [coordinates, setCoordinates] = useState<number[][] | null>(null);

  const { data, isDrawing } = useAppSelector(state => state.createField);
  const { mutate, isPending } = useCreateField();

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
