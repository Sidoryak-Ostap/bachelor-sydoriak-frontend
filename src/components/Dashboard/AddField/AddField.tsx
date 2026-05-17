import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import { CROP_TYPES, SOIL_TYPES } from '@/constants/fields';
import { yupResolver } from '@hookform/resolvers/yup';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { addFieldSchema } from './schema';
import { useDispatch } from 'react-redux';
import { setFieldInfo } from '@/store/reducers/createFieldSlice';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/constants/ROUTES';
import { useTranslation } from 'react-i18next';

type AddFieldProps = {
  setOpen: (open: boolean) => void;
};

const AddField = ({ setOpen }: AddFieldProps) => {
  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    fieldName: string;
    address: string;
    owner: string;
    area: number;
    cropType: string;
    soilType: string;
  }>({
    resolver: yupResolver(addFieldSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    dispatch(setFieldInfo(data));
    setOpen(false);
    navigate(ROUTES.dashboard.map);
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
          <h2 className="text-base font-bold text-black">
            {t('dashboard.fields.addField.dialog.title')}
          </h2>
          <X onClick={() => setOpen(false)} className="cursor-pointer" />
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            inputStyles="placeholder:text-gray-500"
            {...register('fieldName')}
            error={errors.fieldName}
            type="text"
            placeholder={t('dashboard.fields.addField.dialog.name')}
          />

          <FormInput
            inputStyles="placeholder:text-gray-500"
            {...register('owner')}
            error={errors.owner}
            type="text"
            placeholder={t('dashboard.fields.addField.dialog.owner')}
          />

          <FormInput
            inputStyles="placeholder:text-gray-500"
            {...register('address')}
            error={errors.address}
            type="text"
            placeholder={t('dashboard.fields.addField.dialog.address')}
          />

          <FormInput
            inputStyles="placeholder:text-gray-500"
            {...register('area')}
            error={errors.area}
            type="number"
            placeholder={t('dashboard.fields.addField.dialog.area')}
            step="any"
          />

          <FormSelect
            isMulti={true}
            control={control}
            options={CROP_TYPES}
            {...register('cropType')}
            error={errors.cropType}
            placeholder={t('dashboard.fields.addField.dialog.cropType')}
          />
          <FormSelect
            isMulti={true}
            control={control}
            options={SOIL_TYPES}
            {...register('soilType')}
            error={errors.soilType}
            placeholder={t('dashboard.fields.addField.dialog.soilType')}
          />

          <div className="flex items-center justify-between gap-5 mt-10">
            <button
              onClick={() => setOpen(false)}
              className="py-2 px-5.5 text-sm bg-gray-100 border border-gray-400 font-bold rounded-lg w-full cursor-pointer hover:bg-gray-200"
            >
              {t('dashboard.fields.addField.dialog.cancelBtn')}
            </button>
            <button className="py-2 px-5.5 text-sm bg-primary border border-primary text-white font-bold rounded-lg w-full  cursor-pointer hover:bg-primary-dark">
              {t('dashboard.fields.addField.dialog.saveBtn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddField;
