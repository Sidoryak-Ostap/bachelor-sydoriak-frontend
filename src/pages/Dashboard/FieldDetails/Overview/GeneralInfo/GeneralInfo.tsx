import { IMG } from '@/assets';
import { ROUTES } from '@/constants/ROUTES';
import type { Field } from '@/types/field';
import { useNavigate } from 'react-router';

type GeneralInfoProps = {
  fieldData: Field | null;
};

const GeneralInfo = ({ fieldData }: GeneralInfoProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">General Information</h2>

      <ul className="flex flex-col gap-4 mb-10">
        <li className="flex items-center">
          <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">Field Name</p>
          <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
            <p className="text-[17px] text-slate-900">{fieldData?.name}</p>
          </div>
        </li>

        <li className="flex items-center">
          <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">Owner</p>
          <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
            <p className="text-[17px] text-slate-900">{fieldData?.owner}</p>
          </div>
        </li>

        <li className="flex items-center">
          <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">Size</p>
          <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
            <p className="text-[17px] text-slate-900">{fieldData?.area} ha</p>
          </div>
        </li>

        <li className="flex items-center">
          <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">Address</p>
          <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
            <p className="text-[17px] text-slate-900">{fieldData?.address}</p>
          </div>
        </li>

        {/* Soil Type */}
        <li className="flex items-center">
          <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">Soil Type</p>
          <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
            <p className="text-[17px] text-slate-900">{fieldData?.soilType}</p>
          </div>
        </li>

        {/* Crop Type */}
        <li className="flex items-center">
          <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">Crop Type</p>
          <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
            <p className="text-[17px] text-slate-900">{fieldData?.cropType}</p>
          </div>
        </li>
      </ul>

      <div>
        <h2 className="font-bold text-sm text-slate-500 mb-3">Imagery</h2>
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
          title="View on the map"
        >
          View on the map
        </button>
      </div>
    </div>
  );
};

export default GeneralInfo;
