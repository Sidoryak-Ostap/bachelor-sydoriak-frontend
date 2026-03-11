import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

export const useMapbox = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  const popup = useRef<mapboxgl.Popup | null>(null);
  const [mode, setMode] = useState<'view' | 'draw'>('view');

  useEffect(() => {
    if (!containerRef.current) return;

    const mapInstance = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [24.03, 49.84],
      zoom: 11,
    });

    const drawInstance = new MapboxDraw({
      displayControlsDefault: false,
      userProperties: true,
      defaultMode: 'simple_select',
    });

    const popupInstance = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'field-tooltip',
    });

    mapInstance.addControl(drawInstance);
    map.current = mapInstance;
    draw.current = drawInstance;
    popup.current = popupInstance;

    mapInstance.on('draw.modechange', (e: any) => {
      setMode(e.mode === 'draw_polygon' ? 'draw' : 'view');
    });

    return () => mapInstance.remove();
  }, [containerRef]);

  return { map, draw, popup, mode, setMode };
};
