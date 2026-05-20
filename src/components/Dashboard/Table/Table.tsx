import { MapPin } from 'lucide-react';
import Pagination from './Pagination';
import { useState } from 'react';
import type { Field } from '@/types/field';
import { Link } from 'react-router';
import { ROUTES } from '@/constants/ROUTES';
import { useTranslation } from 'react-i18next';
import { CROP_TYPES, SOIL_TYPES } from '@/constants/fields';

type TableProps = {
  data: Field[];
  maxRows?: number;
  isPending: boolean;
};

const Row = (rowItem: any) => {
  const { i18n, t } = useTranslation();
  const language = i18n.language;
  const { name, area, address, soilType, cropType } = rowItem;

  console.log(soilType, cropType);

  const soilTypeTranslated = SOIL_TYPES.find(crop => crop.value === soilType);
  const cropTypeTranslated = CROP_TYPES.find(crop => crop.value === cropType);

  return (
    <div className="bg-white border-b border-gray-300 px-5 py-2 last:border-b-0 hover:bg-gray-50">
      <Link
        to={ROUTES.dashboard.fieldDetails(rowItem.id)}
        className="grid grid-cols-[2fr_1fr_2fr_1fr_1fr_1.5fr] gap-4 text-sm items-center"
      >
        <p className="text-left font-medium">{name}</p>

        <p className="text-left">{area}</p>

        <p className="text-left truncate">{address}</p>

        <p className="text-left">{t(soilTypeTranslated?.label || '') || soilType}</p>
        <p className="text-left">{t(cropTypeTranslated?.label || '') || cropType}</p>

        <div className="flex items-center justify-end gap-2">
          <Link
            to={ROUTES.dashboard.mapField(rowItem.id)}
            className="border border-gray-300  px-3 py-2 font-medium text-xs flex items-center gap-2 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <MapPin size={14} />
            {language === 'uk' ? 'Розташування' : 'Location'}
          </Link>
        </div>
      </Link>
    </div>
  );
};

const Table = ({ isPending, data = [], maxRows = 5 }: TableProps) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const gridConfig = 'grid grid-cols-[2fr_1fr_2fr_1fr_1fr_1.5fr] gap-4';
  const totalPages = data.length > 0 ? Math.ceil(data.length / maxRows) : 1;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const onPageChange = (page: number) => setCurrentPage(page);

  const dataToDisplay = data.slice((currentPage - 1) * maxRows, currentPage * maxRows);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-gray-300 overflow-hidden">
        <div className="bg-gray-200 py-3 px-5">
          <div className={`${gridConfig} font-medium text-gray-600 text-sm`}>
            <p className="text-left">{t('dashboard.fields.table.name')}</p>
            <p className="text-left">{t('dashboard.fields.table.area')}</p>
            <p className="text-left">{t('dashboard.fields.table.address')}</p>
            <p className="text-left">{t('dashboard.fields.table.soilType')}</p>
            <p className="text-left">{t('dashboard.fields.table.cropType')}</p>
          </div>
        </div>

        {isPending ? (
          <div className="flex items-center justify-center py-10 bg-white">
            <p className="text-gray-500">
              {language === 'uk' ? 'Завантаження даних...' : 'Loading data...'}
            </p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center py-10 bg-white">
            <p className="text-gray-500">
              {language === 'uk' ? 'Дані відсутні' : 'No data available'}
            </p>
          </div>
        ) : (
          dataToDisplay.map((rowItem, index) => <Row key={index} {...rowItem} />)
        )}
      </div>

      <div className="flex justify-end">
        <Pagination currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Table;
