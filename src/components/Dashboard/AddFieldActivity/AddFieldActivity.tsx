import FormInput from '@/components/FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { CalendarIcon, X } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form'; // 1. Import Controller
import { addActivitySchema } from './schema';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns/format';
import { uk, enUS } from 'date-fns/locale';
import { capitalizeFirstLetter } from '@/utils/format';
import { useCreateFieldActivity } from '@/hooks/field-activity/useCreateFieldActivity';
import { useTranslation } from 'react-i18next';

type AddFieldProps = {
  setOpen: (open: boolean) => void;
  fieldId: string;
};

const AddFieldActivity = ({ setOpen, fieldId }: AddFieldProps) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{
    description: string;
    date: Date;
  }>({
    resolver: yupResolver(addActivitySchema),
  });

  const { mutate } = useCreateFieldActivity(fieldId);

  const onSubmit = (data: { description: string; date: Date }) => {
    const payload = {
      ...data,
      fieldId,
    };

    mutate(payload);
    setOpen(false);
  };

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-[0.5px]"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white py-6 px-4.5 border border-gray-400 rounded-lg w-100"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-black text-center">
            {t('dashboard.fieldDetails.activity.dialog.title')}
          </h2>
          <X onClick={() => setOpen(false)} className="cursor-pointer" />
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            inputStyles="placeholder:text-gray-500"
            {...register('description')}
            error={errors.description}
            type="text"
            placeholder={t('dashboard.fieldDetails.activity.dialog.description')}
          />

          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={`cursor-pointer flex items-center justify-between gap-2 bg-[#EAF0EF] rounded-[10px] py-2 px-4 w-full border ${
                      errors.date ? 'border-red-500' : 'border-transparent'
                    } transition-colors duration-200`}
                  >
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : (
                      <span className="text-gray-500">
                        {t('dashboard.fieldDetails.activity.dialog.pickDate')}
                      </span>
                    )}
                    <CalendarIcon size={18} className="text-gray-500" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={language === 'uk' ? uk : enUS}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
            )}
          />

          {errors.date && (
            <span className="text-red-500 text-sm -mt-1">
              {capitalizeFirstLetter(errors.date.message || '')}
            </span>
          )}

          <div className="flex items-center justify-between gap-5 mt-10">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="py-2 px-5.5 text-sm bg-gray-100 border border-gray-400 font-bold rounded-lg w-full cursor-pointer hover:bg-gray-200"
            >
              {t('dashboard.fieldDetails.activity.dialog.cancelBtn')}
            </button>
            <button
              type="submit"
              className="py-2 px-5.5 text-sm bg-primary border border-primary text-white font-bold rounded-lg w-full cursor-pointer hover:bg-primary-dark"
            >
              {t('dashboard.fieldDetails.activity.dialog.addBtn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFieldActivity;
