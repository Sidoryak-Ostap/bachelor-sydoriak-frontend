import { Leaf, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/utils/format';
import { useGetFieldActivities } from '@/hooks/field-activity/useGetFieldActivities';
import type { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

type TableProps = {
  fieldId: string;
  checkedIds: string[];
  setCheckedIds: Dispatch<SetStateAction<string[]>>;
  setActivityToDelete: Dispatch<SetStateAction<string | null>>;
  setIsOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
};

const Table = ({
  fieldId,
  checkedIds,
  setCheckedIds,
  setActivityToDelete,
  setIsOpenDeleteModal,
}: TableProps) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const { data: fieldActivitiesData } = useGetFieldActivities(fieldId || '');

  const handleCheckboxChange = (id: string) => {
    setCheckedIds(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };

  return (
    <div>
      <div className="border-2 border-slate-300 rounded-sm overflow-hidden">
        <div className="grid grid-cols-[1fr_2fr_1fr] p-4 border-b bg-slate-200 border-slate-300">
          <p className="text-sm font-medium text-slate-700 uppercase pl-13.5">
            {t('dashboard.fieldDetails.activity.date')}
          </p>
          <p className="text-sm font-medium text-slate-700 uppercase">
            {t('dashboard.fieldDetails.activity.description')}
          </p>
        </div>

        {fieldActivitiesData && fieldActivitiesData.length > 0 ? (
          fieldActivitiesData.slice(0, 5).map(activity => (
            <div
              className="grid grid-cols-[1fr_2fr_1fr] p-4 border-b border-slate-300 last:border-b-0 hover:bg-slate-50 transition-colors"
              key={activity.id}
            >
              <p className="text-sm font-medium text-slate-700 whitespace-nowrap flex items-center gap-10">
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                  checked={checkedIds.includes(activity?.id)}
                  onChange={() => handleCheckboxChange(activity?.id)}
                />
                {formatDate(activity.date, language)}
              </p>

              <p className="text-sm font-medium text-slate-700 whitespace-nowrap truncate">
                {activity.description}
              </p>

              <div className="flex items-center justify-end gap-3">
                {checkedIds.includes(activity.id) && (
                  <>
                    <Pencil
                      size={20}
                      className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors"
                    />
                    <Trash2
                      size={20}
                      onClick={() => {
                        setActivityToDelete(activity?.id);
                        setIsOpenDeleteModal(true);
                      }}
                      className=" text-slate-400 cursor-pointer hover:text-red-600 transition-colors"
                    />
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <div className="bg-slate-100 p-3 rounded-full mb-3">
              <Leaf size={24} className="text-slate-400 opacity-50" />
            </div>
            <p className="text-slate-500 font-medium">
              {language === 'en' ? 'No recent activities found' : 'Не знайдено останніх дій'}
            </p>
            <p className="text-slate-400 text-sm mt-1">
              {language === 'en'
                ? 'Activities will appear here when you add them.'
                : "Дії з'являться тут, коли ви їх додасте."}
            </p>
          </div>
        )}
      </div>

      {checkedIds.length > 1 && (
        <div className="mt-5">
          <button
            onClick={() => setIsOpenDeleteModal(true)}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 hover:border-red-200 rounded-lg transition-all "
          >
            <Trash2 size={16} />
            {language === 'en'
              ? `Delete ${checkedIds.length} activities`
              : `Видалити ${checkedIds.length} активностей`}
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
