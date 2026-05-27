import { useState, type Dispatch, type SetStateAction } from 'react';
import { Slider } from '@/components/ui/slider';
import { CROP_TYPES, SOIL_TYPES } from './constants';
import { useTranslation } from 'react-i18next';
import type { FieldsFilterType } from '@/pages/Dashboard/Fields/Fields';

type FieldsFilterProps = {
  setOpen: (open: boolean) => void;
  filters: FieldsFilterType;
  setFilters: Dispatch<SetStateAction<FieldsFilterType>>;
};

const FieldsFilter = ({ setOpen, filters, setFilters }: FieldsFilterProps) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const [localFilters, setLocalFilters] = useState<FieldsFilterType>(filters);

  const handleClearAll = () => {
    setLocalFilters({
      crops: [],
      soils: [],
      sizeRange: [0, 100],
    });
  };

  const handleToggleSoil = (soil: string) => {
    setLocalFilters(prev => ({
      ...prev,
      soils: prev.soils.includes(soil) ? prev.soils.filter(s => s !== soil) : [...prev.soils, soil],
    }));
  };

  const handleToggleCrops = (crop: string) => {
    setLocalFilters(prev => ({
      ...prev,
      crops: prev.crops.includes(crop) ? prev.crops.filter(c => c !== crop) : [...prev.crops, crop],
    }));
  };

  const handleApply = () => {
    setFilters(localFilters);
    setOpen(false);
  };

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50  backdrop-blur-[0.5px]"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white py-6 px-4.5 border border-gray-400 rounded-lg w-100"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-black">{t('dashboard.fields.filters.subtitle')}</h2>
          <button
            onClick={handleClearAll}
            className="text-sm text-primary font-medium cursor-pointer"
          >
            {t('dashboard.fields.filters.clearAll')}
          </button>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <h2 className="text-base font-bold text-black">
            {t('dashboard.fields.filters.cropType')}
          </h2>

          <div className="grid grid-cols-4 gap-2">
            {CROP_TYPES.map(crop => {
              const isSelected = localFilters.crops.includes(crop.value);

              return (
                <button
                  onClick={() => handleToggleCrops(crop.value)}
                  key={crop.value}
                  className={`border rounded-lg py-2 text-sm font-medium transition-colors cursor-pointer 
                      ${
                        isSelected
                          ? 'bg-primary border-primary text-white'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                      }`}
                >
                  {t(crop.label)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-4 pb-2 border-b-2 border-gray-200">
          <h3 className="text-base font-bold text-black mb-2">
            {t('dashboard.fields.filters.size')}
          </h3>
          <Slider
            onValueChange={value =>
              setLocalFilters(prev => ({ ...prev, sizeRange: [value[0], value[1]] }))
            }
            defaultValue={[25, 100]}
            value={localFilters.sizeRange}
            max={500}
            step={5}
            className="w-full text-primary mb-2"
          />
          <div className="flex items-center justify-between">
            <p className="text-base text-gray-400">
              {localFilters.sizeRange[0]} {language === 'en' ? 'ha' : 'га'}
            </p>
            <p className="text-base text-gray-400">
              {localFilters.sizeRange[1]} {language === 'en' ? 'ha' : 'га'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-black">
            {t('dashboard.fields.filters.soilType')}
          </h2>

          <div className="grid grid-cols-4 gap-2">
            {SOIL_TYPES.map(soil => {
              const isSelected = localFilters.soils.includes(soil.value);

              return (
                <button
                  onClick={() => handleToggleSoil(soil.value)}
                  key={soil.value}
                  className={`border rounded-lg py-2 text-sm font-medium transition-colors cursor-pointer 
                      ${
                        isSelected
                          ? 'bg-primary border-primary text-white'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                      }`}
                >
                  {t(soil.label)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 mt-10">
          <button
            onClick={() => setOpen(false)}
            className="py-2 px-5.5 text-sm bg-gray-100 border border-gray-400 font-bold rounded-lg w-full cursor-pointer hover:bg-gray-200"
          >
            {t('dashboard.fields.filters.cancel')}
          </button>
          <button
            onClick={handleApply}
            className="py-2 px-5.5 text-sm bg-primary border border-primary text-white font-bold rounded-lg w-full  cursor-pointer hover:bg-primary-dark"
          >
            {t('dashboard.fields.filters.apply')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldsFilter;
