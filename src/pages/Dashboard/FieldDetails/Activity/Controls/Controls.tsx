import { useState } from 'react';
import { Calendar, Funnel, Download, SearchIcon, Plus } from 'lucide-react';
import AddFieldActivity from '@/components/Dashboard/AddFieldActivity/AddFieldActivity';
import { useTranslation } from 'react-i18next';

type ControlsProps = {
  fieldId: string;
};

const Controls = ({ fieldId }: ControlsProps) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddActivityOpen, setIsAddActivityOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-stretch gap-3">
        <div className="flex items-center rounded-md border border-gray-200 px-2 py-2 w-80 bg-white">
          <SearchIcon className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder={t('dashboard.fieldDetails.activity.search')}
            className="ml-2 outline-none border-none w-full text-gray-400 text-base"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <button className="cursor-pointer font-medium bg-white border border-gray-200 rounded-sm py-2.5 px-3 flex items-center justify-center gap-1 text-sm text-black hover:bg-gray-100 transition-colors duration-200">
          <Funnel size={16} />
          {t('dashboard.fieldDetails.activity.type')}
        </button>

        <button className="cursor-pointer font-medium bg-white border border-gray-200 rounded-sm py-2.5 px-3 flex items-center justify-center gap-1 text-sm text-black hover:bg-gray-100 transition-colors duration-200">
          <Calendar size={16} />
          {t('dashboard.fieldDetails.activity.dateRange')}
        </button>

        <button className="cursor-pointer font-medium bg-white border border-gray-200 rounded-sm py-2.5 px-3 flex items-center justify-center gap-1 text-sm text-black hover:bg-gray-100 transition-colors duration-200">
          <Download size={16} />
          {t('dashboard.fieldDetails.activity.export')}
        </button>
      </div>

      <button
        onClick={() => setIsAddActivityOpen(true)}
        className="flex items-center bg-primary text-white font-medium rounded-sm border border-primary cursor-pointer px-4 py-2 hover:bg-primary-dark transition-colors duration-200"
      >
        <Plus size={20} className="inline-block mr-1" />
        {t('dashboard.fieldDetails.activity.addNewActivityBtn')}
      </button>

      {isAddActivityOpen && (
        <AddFieldActivity setOpen={setIsAddActivityOpen} fieldId={fieldId || ''} />
      )}
    </div>
  );
};

export default Controls;
