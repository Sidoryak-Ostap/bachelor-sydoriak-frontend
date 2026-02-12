import { IMG } from '@/assets';
import FieldTabs from '@/components/Dashboard/FieldTabs';
import { getNDVIColor } from '@/utils/ndvicolor';
import { CloudSnow, ArrowUp, Sprout, Leaf, Plus, Trash2 } from 'lucide-react';

const fieldActivity = [
  {
    id: 1,
    type: 'Irrigation',
    date: '2026-01-20',
  },
  {
    id: 2,
    type: 'Fertilization',
    date: '2026-01-18',
  },
  {
    id: 3,
    type: 'Pest Control',
    date: '2026-01-15',
  },
];

const FieldDetails = () => {
  return (
    <div className="pt-8 pb-14 px-7">
      <div className="flex flex-col gap-1 mb-5">
        <h3 className="text-primary text-3xl font-bold">Field Details</h3>
        <p className="text-gray-400 text-base">
          Simplify processes and build trust through traceability
        </p>
      </div>

      <div className="mb-10">
        <FieldTabs />
      </div>

      <div className="grid grid-cols-[2fr_3fr] gap-20">
        {/* General Information */}
        <div>
          <h2 className="text-lg font-bold mb-4">General Information</h2>

          <ul className="flex flex-col gap-4 mb-10">
            <li className="flex items-center">
              <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">Field Name</p>
              <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
                <p className="text-[17px] text-slate-900">Field Name</p>
              </div>
            </li>

            <li className="flex items-center">
              <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">Owner</p>
              <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
                <p className="text-[17px] text-slate-900">Jason Stethem</p>
              </div>
            </li>

            <li className="flex items-center">
              <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">Size</p>
              <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
                <p className="text-[17px] text-slate-900">100 ha</p>
              </div>
            </li>

            <li className="flex items-center">
              <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">Address</p>
              <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
                <p className="text-[17px] text-slate-900">Susidovichy 687</p>
              </div>
            </li>

            {/* Soil Type */}
            <li className="flex items-center">
              <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">Soil Type</p>
              <div className="flex-grow bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
                <p className="text-[17px] text-slate-900">Susidovichy 687</p>
              </div>
            </li>

            {/* Crop Type */}
            <li className="flex items-center">
              <p className="w-32 text-[17px] font-medium text-slate-500 shrink-0">Crop Type</p>
              <div className="flex-grow bg-white border border-slate-200 rounded-md px-4 py-2.5 shadow-sm">
                <p className="text-[17px] text-slate-900">Black Soil</p>
              </div>
            </li>
          </ul>

          <div>
            <h2 className="font-bold text-sm text-slate-500 mb-3">Imagery</h2>
            <div className="w-full overflow-hidden rounded-lg">
              <img
                className="w-full h-auto object-cover"
                src={IMG.fieldDetailsImg}
                alt="Field Details"
              />
            </div>
          </div>

          <div>
            <button
              className="w-full border-2 border-primary rounded-md px-4 py-2 text-primary font-medium mt-4 hover:bg-primary hover:text-white transition-colors cursor-pointer"
              title="View on the map"
            >
              View on the map
            </button>
          </div>
        </div>

        {/* Weather and NDVI Section */}

        <div className="flex flex-col gap-8">
          <div className="bg-white shadow-md p-6 flex items-start justify-between gap-20 rounded-2xl">
            <div>
              <h2 className="mb-4 font-semibold text-base">Weather</h2>
              <div className="flex items-center gap-4 mb-6">
                <CloudSnow size={60} className="text-blue-500 mr-2" />
                <p className=" text-gray-600 text-3xl">Snowy, -5°C</p>
              </div>

              <div className="flex flex-col gap-3 text-sm text-slate-500 font-medium">
                <p>Wind: 3m/s</p>
                <p>Precipitation: 0 mm</p>
                <p>Humidity: 80%</p>
                <p>Friday, January 23, 2026</p>
              </div>
            </div>

            <div>
              <h2 className="mb-4 font-semibold text-base">NDVI Index</h2>
              <div className="mb-4">
                <p className="text-4xl font-bold relative" style={{ color: getNDVIColor(0.35) }}>
                  0.35
                  <ArrowUp size={24} className="text-green-500 absolute -top-1 left-19" />
                </p>
              </div>

              <div className="bg-[#FEF3C7] rounded-md  px-3.5 py-3">
                <div className="flex items-start gap-2">
                  <Sprout size={30} className="text-yellow-700 mt-1 mr-2" />
                  <div>
                    <p className="text-sm text-yellow-700 font-semibold">
                      The NDVI index is currently at 0.35, indicating moderate vegetation health.
                    </p>
                    <p className="text-sm text-yellow-700 mb-4">
                      Consider monitoring the field closely and implementing targeted interventions
                      to improve crop health.
                    </p>

                    <p className="text-sm text-yellow-700 font-semibold">
                      Last NDVI update: Jan 05, 2026.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <h2 className="mb-4 font-semibold text-base">Recent Activity</h2>
            <div className="border-2 border-slate-300 rounded-lg">
              {fieldActivity.slice(0, 5).map((activity, index) => (
                <div
                  className={`p-4 border-b border-slate-300 ${index === fieldActivity.slice(0, 5).length - 1 ? 'border-b-0' : ''}`}
                  key={activity.id}
                >
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Leaf size={20} className="text-primary" />
                    {activity.date}: {activity.type}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-primary text-white font-medium rounded-lg border border-primary cursor-pointer px-4 py-2 hover:bg-transparent hover:text-primary transition-colors">
              View all activity
            </button>

            <button className="flex items-center bg-white text-primary font-medium rounded-lg border border-primary cursor-pointer px-4 py-2 hover:bg-primary hover:text-white transition-colors">
              <Plus size={20} className="inline-block mr-1" />
              Add new activity
            </button>

            <button className="group flex items-center bg-transparent border border-red-500 text-red-500 font-medium rounded-lg cursor-pointer px-4 py-2 hover:bg-red-500 hover:text-white transition-colors">
              <Trash2 size={20} className="text-red-500 mr-1 group-hover:text-white" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldDetails;
