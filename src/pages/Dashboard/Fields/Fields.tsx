import AddField from '@/components/Dashboard/AddField';
import FieldsFilter from '@/components/Dashboard/FieldsFilter';
import Table from '@/components/Dashboard/Table';
import { useGetFields } from '@/hooks/fields/useGetFields';
import type { Field } from '@/types/field';
import { Plus, Funnel, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Fields = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [addField, setAddField] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { isPending, data: fieldsData, error, isError } = useGetFields();

  const searchedFields = fieldsData?.filter((field: Field) => {
    const query = searchQuery.toLowerCase();
    return (
      field.name.toLowerCase().includes(query) ||
      field.address.toLowerCase().includes(query) ||
      field.cropType.toLowerCase().includes(query) ||
      field.soilType.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    if (isError)
      toast.error(error?.message || 'Error fetching fields data. Please try again later.');
  }, [isError]);

  return (
    <div className="px-5 py-6">
      <div className="flex flex-col gap-1 mb-5">
        <h3 className="text-primary text-3xl font-bold">{t('dashboard.fields.title')}</h3>
        <p className="text-gray-400 text-base">{t('dashboard.fields.description')}</p>
      </div>

      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-md border border-gray-200 px-2 py-2 w-80 bg-white">
            <SearchIcon className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search fields...' : 'Шукати поля...'}
              className="ml-2 outline-none border-none w-full text-gray-400 text-base"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="border rounded-lg bg-white border-gray-200 px-4 py-2 text-black flex items-center gap-2 font-medium cursor-pointer text-base transition-colors hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100"
          >
            <Funnel className="text-black" size={18} />
            {t('dashboard.fields.filters.title')}
          </button>
        </div>
        <button
          onClick={() => setAddField(true)}
          className="bg-primary  hover:bg-primary-dark flex items-center px-4 py-2 text-white gap-2 text-base rounded-lg cursor-pointer font-medium"
        >
          <Plus size={22} className="text-white" /> {t('dashboard.fields.addField.btnName')}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold ">
          {searchQuery.length > 0 ? searchedFields?.length : fieldsData?.length || 0}{' '}
          {language === 'en' ? 'Fields' : 'Полів'}
        </h3>
        <Table
          isPending={isPending}
          maxRows={6}
          data={searchQuery.length > 0 ? searchedFields || [] : fieldsData || []}
        />
      </div>
      {showFilter && <FieldsFilter setOpen={setShowFilter} />}
      {addField && <AddField setOpen={setAddField} />}
    </div>
  );
};

export default Fields;
