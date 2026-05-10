import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Sprout } from 'lucide-react';
import type { Field } from '@/types/field';
import { ROUTES } from '@/constants/ROUTES';
import { Link, useNavigate, useParams } from 'react-router';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { changeField, setNdviActive } from '@/store/reducers/fieldMapSlice';
import { useAppSelector } from '@/store/store';

type FieldsBarProps = {
  fields: Field[];
};

const FieldsBar = ({ fields }: FieldsBarProps) => {
  const dispatch = useDispatch();
  const isNDVIVisible = useAppSelector(state => state.fieldMap.isNdviActive);
  const [isOpen, setIsOpen] = useState(true);
  const { id: fieldId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (fieldId) {
      dispatch(changeField(fieldId));
    }
  }, [fieldId]);

  return (
    <div
      className={`absolute top-0 left-0 h-full border-r border-gray-200 bg-white transition-all duration-200 ease-in-out z-20 ${
        isOpen ? 'w-70' : 'w-0'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer absolute top-10 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-lg hover:bg-gray-50 hover:scale-110 transition-all z-30 group ${
          isOpen ? '-right-4 p-1.5' : 'left-4 p-3 border-blue-100 bg-blue-50/50 backdrop-blur-sm'
        }`}
      >
        {isOpen ? (
          <ChevronLeft size={18} className="text-gray-500 group-hover:text-primary" />
        ) : (
          <ChevronRight size={24} className="text-primary animate-pulse" />
        )}
      </button>

      <div
        className={`h-full overflow-y-auto overflow-x-hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full min-h-full px-5 py-6 flex flex-col">
          <div className="top-0 pb-4 mb-4 flex items-baseline justify-between z-10">
            <h2 className="text-xl font-bold text-gray-800 whitespace-nowrap">My Fields</h2>
            <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
              {fields.length} Total
            </span>
          </div>

          {fields.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 pb-20">
              <div className="p-4 bg-gray-50 rounded-full">
                <Sprout size={32} className="text-gray-300" />
              </div>
              <p className="text-gray-500 text-sm text-center font-medium max-w-45">
                No fields found. Start by adding a new field!
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {fields.map(field => (
                <li key={field.id}>
                  <Link
                    onDoubleClick={e => {
                      e.preventDefault();
                      dispatch(setNdviActive(!isNDVIVisible));
                      navigate(ROUTES.dashboard.fieldDetails(field.id));
                    }}
                    to={ROUTES.dashboard.mapField(field.id)}
                    className={`
                            group flex items-center gap-4 p-3 transition-all cursor-pointer rounded-xl border
                            ${
                              fieldId === field.id
                                ? 'bg-primary/5 border-primary shadow-md ring-1 ring-primary/20'
                                : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-primary/50'
                            }
                          `}
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                      <img
                        src={field.previewUrl}
                        alt={field.name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{field.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        {field.area} ha
                      </p>
                    </div>

                    {fieldId === field.id && (
                      <button
                        onClick={e => {
                          e.preventDefault();
                          dispatch(setNdviActive(!isNDVIVisible));
                        }}
                        type="button"
                        className={clsx(
                          'cursor-pointer text-sm font-medium border-2 rounded-lg px-3 py-1 transition-colors',
                          isNDVIVisible
                            ? 'text-blue-600 border-blue-600'
                            : 'text-gray-500 border-gray-300 '
                        )}
                      >
                        NDVI
                      </button>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FieldsBar;
