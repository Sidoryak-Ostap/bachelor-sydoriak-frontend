import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { useGetStatistics } from '@/hooks/statistics/useGetStatistics';
import { cropOptions } from '@/constants/fields';
import { useMemo } from 'react';
import Cards from './Cards';
import PieChart from './PieChart';

const yieldData = [
  { month: 'Jan', yield: 400 },
  { month: 'Feb', yield: 300 },
  { month: 'Mar', yield: 600 },
  { month: 'Apr', yield: 800 },
  { month: 'May', yield: 700 },
  { month: 'Jun', yield: 900 },
];

interface CropDistItem {
  name: string;
  value: number;
}

const Main = () => {
  const { data: statisticsData, isError } = useGetStatistics();
  const {
    totalFields = 0,
    totalArea = 0,
    averageArea = 0,
    cropAreaDistribution = [] as CropDistItem[],
  } = statisticsData || {};

  const cropDistribution = useMemo(() => {
    if (!statisticsData || isError) return [];

    return (cropAreaDistribution as CropDistItem[]).map(item => {
      const cropInfo = cropOptions.find(crop => crop.value === item.name);
      return {
        name: cropInfo ? cropInfo.label : item.name,
        value: item.value,
        fill: cropInfo ? cropInfo.color : '#d1d5db',
      };
    });
  }, [statisticsData, isError]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Monitor your agricultural performance in real-time.</p>
      </div>

      <Cards totalArea={totalArea} totalFields={totalFields} averageArea={averageArea} />

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Yield Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6">Yield Performance (t/ha)</h3>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldData}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="yield"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorYield)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Pie Chart */}
        <PieChart cropDistribution={cropDistribution} />
      </div>
    </div>
  );
};

export default Main;
