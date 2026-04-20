import { useForm } from 'react-hook-form';

import FormSettingsSelect from '@/components/FormSettingsSelect';
import { INTERFACE_LANGUAGES, TIMEZONES } from './constants';
import { FormSwitch } from '@/components/FormSwitch';
import { settingsSchema, type SettingsFormValues } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '@/store/store';
import { useUpdateSettings } from '@/hooks/settings/useUpdateSettings';

const Settings = () => {
  const { settings } = useAppSelector(state => state.user);
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
          <h2 className="text-black font-semibold text-xl">General Preferences</h2>
          <p className="text-base text-gray-400">
            Customize your basic application experience and regional settings.
          </p>
        </div>

        <div className="flex flex-col">
          <div className="bg-white px-6 py-5 rounded-t-md border border-gray-300">
            <div className="flex items-center justify-between">
              <div className="text-base">
                <p className="text-black font-semibold">Interface language</p>
                <p className="text-gray-400">
                  Select the language used throughout the application.
                </p>
              </div>
              <FormSettingsSelect name="language" control={control} options={INTERFACE_LANGUAGES} />
            </div>
          </div>

          <div className="bg-white px-6 py-5 border-x border-gray-300">
            <div className="flex items-center justify-between">
              <div className="text-base">
                <p className="text-black font-semibold">Timezone</p>
                <p className="text-gray-400">Used for calculating accurate report schedules.</p>
              </div>
              <FormSettingsSelect name="timezone" control={control} options={TIMEZONES} />
            </div>
          </div>

          <div className="bg-white px-6 py-5 rounded-b-md border border-gray-300 border-t-0">
            <div className="flex items-center justify-between">
              <div className="text-base">
                <p className="text-black font-semibold">Automatic Area Calculation</p>
                <p className="text-gray-400">
                  Automatically calculate the exact area of boundaries.
                </p>
              </div>
              <FormSwitch name="autoAreaCalculation" control={control} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-1 mb-8">
          <h2 className="text-black font-semibold text-xl">Notifications</h2>
          <p className="text-base text-gray-400">Control how you receive alerts.</p>
        </div>

        <div className="flex flex-col">
          <div className="bg-white px-6 py-5 rounded-t-md border border-gray-300">
            <div className="flex items-center justify-between">
              <div className="text-base">
                <p className="text-black font-semibold">Email Updates</p>
                <p className="text-gray-400">Receive critical system alerts via email.</p>
              </div>
              <FormSwitch name="emailUpdates" control={control} />
            </div>
          </div>

          <div className="bg-white px-6 py-5 border-x border-gray-300">
            <div className="flex items-center justify-between">
              <div className="text-base">
                <p className="text-black font-semibold">Weekly Summary Reports</p>
                <p className="text-gray-400">Get a comprehensive overview every Monday.</p>
              </div>
              <FormSwitch name="weeklySummary" control={control} />
            </div>
          </div>

          <div className="bg-white px-6 py-5 rounded-b-md border border-gray-300 border-t-0">
            <div className="flex items-center justify-between">
              <div className="text-base">
                <p className="text-black font-semibold">Marketing & Product News</p>
                <p className="text-gray-400">Occasional emails regarding new features.</p>
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
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Settings;
