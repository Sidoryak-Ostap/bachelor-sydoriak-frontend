import { useForm } from 'react-hook-form';

import FormSettingsSelect from '@/components/FormSettingsSelect';
import { INTERFACE_LANGUAGES, TIMEZONES } from './constants';
import { FormSwitch } from '@/components/FormSwitch';
import { settingsSchema, type SettingsFormValues } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '@/store/store';
import { useUpdateSettings } from '@/hooks/settings/useUpdateSettings';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t } = useTranslation();
  const { settings } = useAppSelector(state => state.user);

  console.log(settings);
  const { control, handleSubmit } = useForm<SettingsFormValues>({
    defaultValues: {
      language: settings.language,
      timezone: settings.timezone,
      autoAreaCalculation: settings.autoAreaCalculation,
      emailUpdates: settings.emailUpdates,
      weeklySummary: settings.weeklySummary,
      marketingNews: settings.marketingNews,
    },
    resolver: yupResolver(settingsSchema),
  });

  const { mutate, isPending } = useUpdateSettings();

  const onSubmit = (data: SettingsFormValues) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-10 pt-5 px-5 bg-gray-100 min-h-screen">
      <div className="mb-10">
        <div className="flex flex-col gap-1 mb-8">
          <h2 className="text-black font-semibold text-xl">{t('dashboard.settings.title')}</h2>
          <p className="text-base text-gray-400">{t('dashboard.settings.description')}</p>
        </div>

        <div className="flex flex-col">
          <div className="bg-white px-6 py-5 rounded-t-md border border-gray-300">
            <div className="flex items-center justify-between">
              <div className="text-base">
                <p className="text-black font-semibold">{t('dashboard.settings.language.title')}</p>
                <p className="text-gray-400">{t('dashboard.settings.language.description')}</p>
              </div>
              <FormSettingsSelect
                isMulti={true}
                name="language"
                control={control}
                options={INTERFACE_LANGUAGES}
              />
            </div>
          </div>

          <div className="bg-white px-6 py-5 border-x border-gray-300">
            <div className="flex items-center justify-between">
              <div className="text-base">
                <p className="text-black font-semibold">{t('dashboard.settings.timezone.title')}</p>
                <p className="text-gray-400">{t('dashboard.settings.timezone.description')}</p>
              </div>
              <FormSettingsSelect name="timezone" control={control} options={TIMEZONES} />
            </div>
          </div>

          <div className="bg-white px-6 py-5 rounded-b-md border border-gray-300 border-t-0">
            <div className="flex items-center justify-between">
              <div className="text-base">
                <p className="text-black font-semibold">
                  {t('dashboard.settings.autoAreaCalc.title')}
                </p>
                <p className="text-gray-400">{t('dashboard.settings.autoAreaCalc.description')}</p>
              </div>
              <FormSwitch name="autoAreaCalculation" control={control} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-1 mb-8">
          <h2 className="text-black font-semibold text-xl">
            {t('dashboard.settings.notifications.title')}
          </h2>
          <p className="text-base text-gray-400">
            {t('dashboard.settings.notifications.description')}
          </p>
        </div>

        <div className="flex flex-col">
          <div className="bg-white px-6 py-5 rounded-t-md border border-gray-300">
            <div className="flex items-center justify-between">
              <div className="text-base">
                <p className="text-black font-semibold">
                  {t('dashboard.settings.notifications.emailUpdates.title')}
                </p>
                <p className="text-gray-400">
                  {t('dashboard.settings.notifications.emailUpdates.description')}
                </p>
              </div>
              <FormSwitch name="emailUpdates" control={control} />
            </div>
          </div>

          <div className="bg-white px-6 py-5 border-x border-gray-300">
            <div className="flex items-center justify-between">
              <div className="text-base">
                <p className="text-black font-semibold">
                  {t('dashboard.settings.notifications.weekSummuaryReport.title')}
                </p>
                <p className="text-gray-400">
                  {t('dashboard.settings.notifications.weekSummuaryReport.description')}
                </p>
              </div>
              <FormSwitch name="weeklySummary" control={control} />
            </div>
          </div>

          <div className="bg-white px-6 py-5 rounded-b-md border border-gray-300 border-t-0">
            <div className="flex items-center justify-between">
              <div className="text-base">
                <p className="text-black font-semibold">
                  {t('dashboard.settings.notifications.productNews.title')}
                </p>
                <p className="text-gray-400">
                  {t('dashboard.settings.notifications.productNews.description')}
                </p>
              </div>
              <FormSwitch name="marketingNews" control={control} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          disabled={isPending}
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary-dark transition-colors cursor-pointer"
        >
          {t('dashboard.settings.saveChanges')}
        </button>
      </div>
    </form>
  );
};

export default Settings;
