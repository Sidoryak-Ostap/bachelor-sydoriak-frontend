import { useGetFieldIndices } from '@/hooks/indices/useGetFieldIndices';
import type { FieldIndice } from '@/services/indices';
import { formatDate } from '@/utils/format';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import RangePicker, { type Range } from './components/RangePicker';

const INDICES = ['ndvi', 'ndmi', 'savi', 'evi'];

const Analysis = () => {
  const { id: fieldId } = useParams<{ id: string }>();
  const [activeIndex, setActiveIndex] = useState<string>(INDICES[0]);
  const [activePoint, setActivePoint] = useState<FieldIndice | null>(null);
  const [activeRange, setActiveRange] = useState<Range>('1M');

  const { data: fieldIndices, error, isError } = useGetFieldIndices(fieldId || '');

  useEffect(() => {
    if (isError)
      toast.error(
        `Failed to fetch field indices: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
  }, [isError, error]);

  const chartData = useMemo(() => {
    if (!fieldIndices || fieldIndices.length === 0) return [];

    const data = fieldIndices.map((indice: FieldIndice) => ({
      ...indice,
      date: formatDate(indice.date),
      [activeIndex]: (indice[activeIndex as keyof FieldIndice] as any)?.mean.toFixed(2) || 0,
    }));

    return data;
  }, [activeIndex, fieldIndices]);

  const currentData = useMemo(() => {
    if (activePoint) return activePoint;
    if (fieldIndices && fieldIndices.length > 0) {
      return fieldIndices[fieldIndices.length - 1];
    }
    return null;
  }, [activePoint, fieldIndices]);

  const deltaInfo = useMemo(() => {
    if (!fieldIndices) return null;

    const currentIndex = activePoint
      ? fieldIndices.findIndex(i => i.date === activePoint.date)
      : fieldIndices.length - 1;

    if (currentIndex <= 0) return null;

    const currentVal = (fieldIndices[currentIndex][activeIndex as keyof FieldIndice] as any)?.mean;
    const prevVal = (fieldIndices[currentIndex - 1][activeIndex as keyof FieldIndice] as any)?.mean;

    if (!currentVal || !prevVal) return null;

    const diff = currentVal - prevVal;
    const percent = (diff / prevVal) * 100;

    return {
      diff: diff.toFixed(3),
      percent: percent.toFixed(1),
      isUp: diff > 0,
    };
  }, [activePoint, fieldIndices, activeIndex]);

  return (
    <div className="w-full">
      <div className="bg-gray-100 py-2 px-2 rounded-md flex items-center gap-2 w-fit mb-10">
        {INDICES.map(indice => (
          <button
            key={indice}
            className={`text-sm font-medium py-2 px-4 rounded-md cursor-pointer transition-colors ${
              activeIndex === indice
                ? 'bg-primary text-white'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
            onClick={() => setActiveIndex(indice)}
          >
            {indice.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex items-start justify-between gap-5">
        <div className="flex items-stretch gap-4 w-full">
          <div className="bg-white px-4 py-4 rounded-lg border-2 border-gray-200 flex flex-col gap-3 max-w-50 w-full ">
            <p className="text-sm text-gray-400 font-semibold uppercase">
              mean {activeIndex.toLowerCase()}
            </p>
            <p className="text-2xl text-black font-bold">
              {currentData && currentData[activeIndex as keyof FieldIndice]
                ? (currentData[activeIndex as keyof FieldIndice] as any).mean.toFixed(2)
                : '0.00'}
            </p>
            {deltaInfo && (
              <p
                className={`text-sm font-medium ${
                  deltaInfo.isUp ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {deltaInfo.isUp ? '▲' : '▼'} {deltaInfo.diff} ({deltaInfo.percent}%)
              </p>
            )}
          </div>

          <div className="bg-white px-4 py-4 rounded-lg border-2 border-gray-200 flex flex-col gap-3 max-w-50 w-full">
            <p className="text-sm text-gray-400 font-semibold uppercase">Max value</p>
            <p className="text-2xl text-black font-bold">
              {currentData && currentData[activeIndex as keyof FieldIndice]
                ? (currentData[activeIndex as keyof FieldIndice] as any).max.toFixed(2)
                : '0.00'}
            </p>
          </div>

          <div className="bg-white px-4 py-4 rounded-lg border-2 border-gray-200 flex flex-col gap-3 max-w-50 w-full">
            <p className="text-sm text-gray-400 font-semibold uppercase">min value</p>
            <p className="text-2xl text-black font-bold">
              {currentData && currentData[activeIndex as keyof FieldIndice]
                ? (currentData[activeIndex as keyof FieldIndice] as any).min.toFixed(2)
                : '0.00'}
            </p>
          </div>
        </div>

        <RangePicker activeRange={activeRange} onChange={range => setActiveRange(range)} />
      </div>

      {/* Main Yield Chart */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mt-10">
        <h3 className="text-lg font-bold mb-6">{activeIndex.toUpperCase()} </h3>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              onMouseMove={e => {
                if (e.activeIndex !== undefined && e.activeIndex !== null && fieldIndices) {
                  setActivePoint(fieldIndices[e.activeIndex as number]);
                }
              }}
              onMouseLeave={() => setActivePoint(null)}
              data={chartData}
            >
              <defs>
                <linearGradient id={activeIndex} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis
                dataKey="date"
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
                dataKey={activeIndex}
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill={`url(#${activeIndex})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
