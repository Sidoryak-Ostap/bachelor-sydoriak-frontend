import { useGetFieldActivities } from '@/hooks/field-activity/useGetFieldActivities';
import { getNDVIColor } from '@/utils/ndvicolor';
import { ArrowUp, CloudSnow, Leaf, Plus, Sprout, Trash2 } from 'lucide-react';
import { useParams } from 'react-router';

type StatusOverviewProps = {
  onDelete: () => void;
  onAddActivity: () => void;
  handleChangeTab: (index: number) => void;
};

const StatusOverview = ({ onDelete, onAddActivity, handleChangeTab }: StatusOverviewProps) => {
  const { id: fieldId } = useParams();

  const { data: fieldActivitiesData } = useGetFieldActivities(fieldId || '');

  return (
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
                  Consider monitoring the field closely and implementing targeted interventions to
                  improve crop health.
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
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
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
              <p className="text-slate-500 font-medium">No recent activities found</p>
              <p className="text-slate-400 text-sm mt-1">
                Check back later for updates on your field.
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
          View all activity
        </button>

        <button
          onClick={onAddActivity}
          className="flex items-center bg-white text-primary font-medium rounded-lg border border-primary cursor-pointer px-4 py-2 hover:bg-primary hover:text-white transition-colors"
        >
          <Plus size={20} className="inline-block mr-1" />
          Add new activity
        </button>

        <button
          onClick={onDelete}
          className="group flex items-center bg-transparent border border-red-500 text-red-500 font-medium rounded-lg cursor-pointer px-4 py-2 hover:bg-red-500 hover:text-white transition-colors"
        >
          <Trash2 size={20} className="text-red-500 mr-1 group-hover:text-white" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default StatusOverview;
