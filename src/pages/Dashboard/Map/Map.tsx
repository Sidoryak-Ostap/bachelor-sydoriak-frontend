import React, { useEffect, useRef, useState } from 'react';

import mapboxgl from 'mapbox-gl';

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
import { useMapbox } from '@/hooks/useMapBox';
import { highlightSingleField, syncAllFieldsLayer } from '@/utils/mapUtils';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map: React.FC = () => {
  const [coordinates, setCoordinates] = useState<number[][] | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const { map, draw, popup, mode, setMode } = useMapbox(mapContainer);
  const { id } = useParams();

  const { data, isDrawing } = useAppSelector(state => state.createField);
  const { mutate, isPending } = useCreateField();
  const { data: fieldData } = useGetFieldById(id || null);
  const { data: allFields } = useGetFields();

  // 1. Event Listeners Effect
  useEffect(() => {
    const currentMap = map.current;
    if (!currentMap) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') deleteSelected();
    };

    const updateCoordinates = (e: any) => {
      if (e.features.length > 0) setCoordinates(e.features[0].geometry.coordinates[0]);
    };

    document.addEventListener('keydown', handleKeyDown);
    currentMap.on('draw.create', updateCoordinates);
    currentMap.on('draw.update', updateCoordinates);
    currentMap.on('draw.delete', () => setCoordinates(null));
    currentMap.on('draw.selectionchange', (e: { features: any[] }) => {
      setIsSelected(e.features.length > 0);
    });
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      currentMap.off('draw.create', updateCoordinates);
      currentMap.off('draw.update', updateCoordinates);
    };
  }, [map.current]);

  // 2. Layers & Navigation Effect
  useEffect(() => {
    const currentMap = map.current;
    if (!currentMap || !allFields) return;

    const setupLayers = () => {
      syncAllFieldsLayer(currentMap, allFields, popup.current!);

      if (id && fieldData) {
        highlightSingleField(currentMap, fieldData, id);
      } else if (!id && allFields.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        allFields.forEach((f: any) =>
          f.boundary.coordinates[0].forEach((c: any) => bounds.extend(c as [number, number]))
        );
        currentMap.fitBounds(bounds, { padding: 50, duration: 1500 });
      }
    };

    if (currentMap.isStyleLoaded()) setupLayers();
    else currentMap.once('load', setupLayers);
  }, [allFields, fieldData, id, map.current]);

  const toggleDrawPolygon = () => {
    if (draw.current) {
      draw.current.changeMode('draw_polygon');
      setMode('draw');
    }
  };

  const cancelDrawing = () => {
    if (draw.current) {
      draw.current.changeMode('simple_select');
      setMode('view');
    }
  };

  const deleteSelected = () => {
    if (draw.current) {
      draw.current.trash();
      setIsSelected(false);
    }
  };

  const handleSaveField = () => {
    if (coordinates) {
      mutate({
        ...data,
        boundary: { type: 'Polygon', coordinates: [coordinates] },
      });
    }
  };

  return (
    <div className="w-full h-full relative group">
      <div className="w-full h-full relative" ref={mapContainer} />

      {isDrawing && coordinates && (
        <ConfirmButton handleSaveField={handleSaveField} coordinates={coordinates} />
      )}

      {isPending && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-50 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <NavigationGuard shouldBlock={isDrawing} />
      <FieldsBar fields={allFields || []} />

      <MapToolBar
        mode={mode}
        isSelected={isSelected}
        toggleDrawPolygon={toggleDrawPolygon}
        cancelDrawing={cancelDrawing}
        deleteSelected={deleteSelected}
        zoomIn={() => map.current?.zoomIn()}
        zoomOut={() => map.current?.zoomOut()}
      />
    </div>
  );
};

export default Map;
