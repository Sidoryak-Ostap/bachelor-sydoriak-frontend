import { useGetFieldActivities } from '@/hooks/field-activity/useGetFieldActivities';
import { useGetFieldIndices } from '@/hooks/indices/useGetFieldIndices';
import { useGetCurrentFieldWeather } from '@/hooks/weather/useGetCurrentFieldWeather';
import { capitalizeString } from '@/utils/capitalize';
import { formatDate } from '@/utils/format';
import { getNDVIColor } from '@/utils/ndvicolor';
import { ArrowDown, ArrowUp, CloudSnow, Leaf, Loader2, Plus, Sprout, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { Wheat } from 'lucide-react';
import { useGetFieldDataReport } from '@/hooks/field-report/useGetFieldDataReport';
import FieldAnalysisModal from '@/components/Dashboard/FieldAnalysisModal/FieldAnalysisModal';
import type { Field } from '@/types/field';
import { calculateYieldForecast } from '@/utils/yield';

type StatusOverviewProps = {
  fieldData: Field | undefined;
  onDelete: () => void;
  onAddActivity: () => void;
  handleChangeTab: (index: number) => void;
};

const StatusOverview = ({
  fieldData,
  onDelete,
  onAddActivity,
  handleChangeTab,
}: StatusOverviewProps) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'en';
  const { id: fieldId } = useParams();
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState<boolean>(false);

  const { data: fieldActivitiesData } = useGetFieldActivities(fieldId || '');

  const { data: currentFieldWeatherData, isError: isCurrentWeatherError } =
    useGetCurrentFieldWeather(fieldId || '');
  const { data: fieldIndicesData, isError: isFieldIndicesError } = useGetFieldIndices(
    fieldId || ''
  );

  useEffect(() => {
    if (isCurrentWeatherError) {
      toast.error('Failed to fetch current weather data. Please try again later.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
      });
    }

    if (isFieldIndicesError) {
      toast.error('Failed to fetch field indices data. Please try again later.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  }, [currentFieldWeatherData, isCurrentWeatherError, fieldIndicesData, isFieldIndicesError]);

  const lastIndices =
    fieldIndicesData && fieldIndicesData.length > 0
      ? fieldIndicesData[fieldIndicesData.length - 1]
      : null;

  const currentNDVI = lastIndices ? lastIndices.ndvi.mean : null;
  const previousNDVI =
    fieldIndicesData && fieldIndicesData.length > 1
      ? fieldIndicesData[fieldIndicesData.length - 2].ndvi.mean
      : null;

  const ndviChange =
    currentNDVI !== null && previousNDVI !== null ? currentNDVI - previousNDVI : null;

  const {
    data: fieldDataReport,
    isPending: isFieldDataReportPending,
    mutate: loadFieldDataReport,
  } = useGetFieldDataReport(fieldId || '');

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white shadow-md p-6 flex items-start justify-between gap-10 rounded-2xl">
        <div className="min-w-1/3">
          <h2 className="mb-4 font-semibold text-base">
            {t('dashboard.fieldDetails.overview.statusInfo.weather.title')}
          </h2>
          <div className="flex items-center gap-2 mb-6">
            <p className=" text-gray-600 text-3xl flex flex-col gap-1">
              {capitalizeString(currentFieldWeatherData?.current.description || '')}{' '}
              {currentFieldWeatherData?.current.temp.toFixed(1)}
              °C
            </p>
            <CloudSnow size={100} className="text-blue-400" />
          </div>

          <div className="flex flex-col gap-3 text-sm text-slate-500 font-medium">
            <p>
              {t('dashboard.fieldDetails.overview.statusInfo.weather.windSpeed')}:{' '}
              {currentFieldWeatherData?.current.wind_speed} {language === 'en' ? 'm/s' : 'м/с'}
            </p>
            <p>
              {t('dashboard.fieldDetails.overview.statusInfo.weather.precipitation')}:{' '}
              {currentFieldWeatherData?.current.rain || 0} {language === 'en' ? 'mm' : 'мм'}
            </p>
            <p>
              {t('dashboard.fieldDetails.overview.statusInfo.weather.humidity')}:{' '}
              {currentFieldWeatherData?.current.humidity}%
            </p>
            <p>{formatDate(new Date(), language)}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-semibold text-base">
            {t('dashboard.fieldDetails.overview.statusInfo.ndviIndex.title')}
          </h2>
          <div className="mb-4">
            <p
              className="text-4xl font-bold relative"
              style={{ color: getNDVIColor(currentNDVI || 0) }}
            >
              {currentNDVI !== null ? currentNDVI.toFixed(2) : 'N/A'}
              {ndviChange !== null && ndviChange > 0 && (
                <div className="absolute -top-1 left-19 flex items-center gap-1">
                  <ArrowUp size={22} className="text-green-500" />
                  <span className="text-green-500 text-sm">(+{ndviChange.toFixed(2)})</span>
                </div>
              )}
              {ndviChange !== null && ndviChange < 0 && (
                <div className="absolute -top-1 left-19 flex items-center gap-1">
                  <ArrowDown size={22} className="text-red-500" />
                  <span className="text-red-500 text-sm">({ndviChange.toFixed(2)})</span>
                </div>
              )}
            </p>
          </div>

          <div className="bg-[#FEF3C7] rounded-md px-3.5 py-3">
            <div className="flex items-center gap-2 ">
              <Sprout size={30} className="text-yellow-700 mt-1 mr-2" />
              <div>
                <p className="text-sm text-yellow-700 font-semibold">
                  {t('dashboard.fieldDetails.overview.statusInfo.ndviIndex.lastUpdate')}
                  {formatDate(lastIndices ? new Date(lastIndices.date) : new Date(), language)}
                </p>
              </div>
            </div>
          </div>

          {((fieldDataReport && fieldDataReport?.status) || fieldData?.interpretation?.status) && (
            <div className="bg-[#FEF3C7] rounded-md  px-3.5 py-3 mt-4">
              <p className="text-sm text-yellow-700 font-semibold mb-2">
                {fieldDataReport?.status || fieldData?.interpretation?.status}
              </p>
              <p
                onClick={() => setIsAnalysisModalOpen(true)}
                className="text-sm text-yellow-700 cursor-pointer"
              >
                Детальний аналіз
              </p>
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              onClick={() => loadFieldDataReport()}
              disabled={isFieldDataReportPending}
              className="group mt-4 font-semibold bg-primary text-white rounded-lg border border-primary px-4 py-2 hover:bg-transparent hover:text-primary transition-colors flex items-center cursor-pointer"
            >
              {isFieldDataReportPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Wheat
                    size={20}
                    className="mr-1 transition-colors text-white group-hover:text-primary"
                  />
                  Аналізувати дані
                </>
              )}
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/40 to-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">Прогноз врожайності</h4>
                </div>
              </div>

              <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/10">
                Ранній
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                {calculateYieldForecast(currentNDVI).toFixed(2)}
              </span>
              <span className="text-sm font-medium text-slate-500">т/га</span>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="mb-4 font-semibold text-base">
          {t('dashboard.fieldDetails.overview.statusInfo.recentActivity.title')}
        </h2>
        <div className="border-2 border-slate-300 rounded-lg overflow-hidden">
          {fieldActivitiesData && fieldActivitiesData.length > 0 ? (
            fieldActivitiesData.slice(0, 5).map(activity => (
              <div
                className={`p-4 border-b border-slate-300 last:border-b-0 hover:bg-slate-50 transition-colors`}
                key={activity.id}
              >
                <p className="text-sm font-medium flex items-center gap-2 text-slate-700">
                  <Leaf size={20} className="text-primary shrink-0" />
                  <span className="font-semibold whitespace-nowrap">
                    {new Date(activity.date).toLocaleDateString(
                      language === 'en' ? 'en-US' : 'uk-UA',
                      {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      }
                    )}
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="truncate">{activity.description}</span>
                </p>
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
                  ? 'Check back later for updates on your field.'
                  : 'Поверніться пізніше для оновлень про ваше поле.'}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => handleChangeTab(1)}
          className="bg-primary text-white font-medium rounded-lg border border-primary cursor-pointer px-4 py-2 hover:bg-transparent hover:text-primary transition-colors"
        >
          {t('dashboard.fieldDetails.overview.statusInfo.buttons.viewAllActivity')}
        </button>

        <button
          onClick={onAddActivity}
          className="flex items-center bg-white text-primary font-medium rounded-lg border border-primary cursor-pointer px-4 py-2 hover:bg-primary hover:text-white transition-colors"
        >
          <Plus size={20} className="inline-block mr-1" />
          {t('dashboard.fieldDetails.overview.statusInfo.buttons.addNewActivity')}
        </button>

        <button
          onClick={onDelete}
          className="group flex items-center bg-transparent border border-red-500 text-red-500 font-medium rounded-lg cursor-pointer px-4 py-2 hover:bg-red-500 hover:text-white transition-colors"
        >
          <Trash2 size={20} className="text-red-500 mr-1 group-hover:text-white" />
          {t('dashboard.fieldDetails.overview.statusInfo.buttons.deleteField')}
        </button>
      </div>

      {isAnalysisModalOpen && (
        <FieldAnalysisModal
          reportData={fieldDataReport || fieldData?.interpretation || undefined}
          setOpen={open => setIsAnalysisModalOpen(open)}
        />
      )}
    </div>
  );
};

export default StatusOverview;
