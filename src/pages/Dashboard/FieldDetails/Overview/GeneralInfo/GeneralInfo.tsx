import { IMG } from '@/assets';
import { ROUTES } from '@/constants/ROUTES';
import type { Field } from '@/types/field';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { CROP_TYPES, SOIL_TYPES } from '@/constants/fields';

type GeneralInfoProps = {
  fieldData: Field | null;
};

const GeneralInfo = ({ fieldData }: GeneralInfoProps) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const soilTypeTranslated = SOIL_TYPES.find(soil => soil.value === fieldData?.soilType);
  const cropTypeTranslated = CROP_TYPES.find(crop => crop.value === fieldData?.cropType);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">
        {t('dashboard.fieldDetails.overview.generalInfo.title')}
      </h2>

      <ul className="flex flex-col gap-4 mb-10">
        <li className="flex items-center">
          <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">
            {t('dashboard.fieldDetails.overview.generalInfo.fieldName')}
          </p>
          <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
            <p className="text-[17px] text-slate-900">{fieldData?.name}</p>
          </div>
        </li>

        <li className="flex items-center">
          <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">
            {t('dashboard.fieldDetails.overview.generalInfo.owner')}
          </p>
          <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
            <p className="text-[17px] text-slate-900">{fieldData?.owner}</p>
          </div>
        </li>

        <li className="flex items-center">
          <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">
            {t('dashboard.fieldDetails.overview.generalInfo.size')}
          </p>
          <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
            <p className="text-[17px] text-slate-900">
              {fieldData?.area} {language === 'en' ? 'ha' : 'га'}
            </p>
          </div>
        </li>

        <li className="flex items-center">
          <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">
            {t('dashboard.fieldDetails.overview.generalInfo.address')}
          </p>
          <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
            <p className="text-[17px] text-slate-900">{fieldData?.address}</p>
          </div>
        </li>

        <li className="flex items-center">
          <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">
            {t('dashboard.fieldDetails.overview.generalInfo.soilType')}
          </p>
          <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
            <p className="text-[17px] text-slate-900">
              {soilTypeTranslated ? t(soilTypeTranslated.label) : fieldData?.soilType}
            </p>
          </div>
        </li>

        <li className="flex items-center">
          <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">
            {t('dashboard.fieldDetails.overview.generalInfo.cropType')}
          </p>
          <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
            <p className="text-[17px] text-slate-900">
              {cropTypeTranslated ? t(cropTypeTranslated.label) : fieldData?.cropType}
            </p>
          </div>
        </li>

        {fieldData?.seedingDate && (
          <li className="flex items-center">
            <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">
              {t('dashboard.fieldDetails.overview.generalInfo.seedingDate')}
            </p>
            <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
              <p className="text-[17px] text-slate-900">
                {fieldData?.seedingDate
                  ? new Date(fieldData.seedingDate).toLocaleDateString(language, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : t('dashboard.fieldDetails.overview.generalInfo.notSpecified')}
              </p>
            </div>
          </li>
        )}
      </ul>

      <div>
        <h2 className="font-bold text-sm text-slate-500 mb-3">
          {t('dashboard.fieldDetails.overview.generalInfo.image')}
        </h2>
        <div className="w-full overflow-hidden rounded-lg">
          <img
            className="w-full h-auto object-cover"
            src={fieldData?.previewUrl || IMG.fieldDetailsImg}
            alt="Field Details"
          />
        </div>
      </div>

      <div>
        <button
          onClick={() => navigate(ROUTES.dashboard.mapField(fieldData?.id || ''))}
          className="w-full border-2 border-primary rounded-md px-4 py-2 text-primary font-medium mt-4 hover:bg-primary hover:text-white transition-colors cursor-pointer"
          title={t('dashboard.fieldDetails.overview.generalInfo.viewOnMap')}
        >
          {t('dashboard.fieldDetails.overview.generalInfo.viewOnMap')}
        </button>
      </div>
    </div>
  );
};

export default GeneralInfo;
