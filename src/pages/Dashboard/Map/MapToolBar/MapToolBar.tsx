import { useAppSelector } from '@/store/store';
import { Minus, MousePointer2, Pencil, Plus, Trash2 } from 'lucide-react';

type MapToolBarProps = {
  mode: 'draw' | 'view';
  isSelected: boolean;
  toggleDrawPolygon: () => void;
  cancelDrawing: () => void;
  deleteSelected: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
};

const MapToolBar = ({
  mode,
  isSelected,
  toggleDrawPolygon,
  cancelDrawing,
  deleteSelected,
  zoomIn,
  zoomOut,
}: MapToolBarProps) => {
  const { isDrawing } = useAppSelector(state => state.createField);

  return (
    <div>
      {isDrawing && (
        <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
          <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-gray-200 flex flex-col gap-1">
            <button
              onClick={mode === 'draw' ? cancelDrawing : toggleDrawPolygon}
              title="Намалювати межі поля"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer text-sm ${
                mode === 'draw'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-700 hover:bg-[#EAF0EF] hover:text-primary'
              }`}
            >
              {mode === 'draw' ? <MousePointer2 size={20} /> : <Pencil size={20} />}
              <span className="font-semibold text-sm">
                {mode === 'draw' ? 'Скасувати малювання' : 'Намалювати поле'}
              </span>
            </button>

            <button
              onClick={deleteSelected}
              disabled={!isSelected}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm ${
                isSelected
                  ? 'bg-red-500 text-white shadow-lg cursor-pointer'
                  : 'text-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              <Trash2 size={20} />
              <span className="font-semibold text-sm">Видалити</span>
            </button>
          </div>

          {mode === 'draw' && (
            <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs animate-pulse g">
              Клікайте по карті, щоб ставити точки меж поля
            </div>
          )}
        </div>
      )}

      <div className="absolute bottom-10 right-6 flex flex-col gap-2 z-10">
        <button
          onClick={zoomIn}
          className="cursor-pointer bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-gray-200 text-gray-700 hover:text-primary transition-colors flex items-center justify-center"
          title="Zoom in"
        >
          <Plus size={18} />
        </button>
        <button
          onClick={zoomOut}
          className="cursor-pointer bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-gray-200 text-gray-700 hover:text-primary transition-colors flex items-center justify-center"
          title="Zoom out"
        >
          <Minus size={18} />
        </button>
      </div>
    </div>
  );
};

export default MapToolBar;
