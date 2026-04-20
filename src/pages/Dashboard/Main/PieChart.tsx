import { Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie } from 'recharts';

type PieChartProps = {
  cropDistribution: {
    name: string;
    value: number;
    fill: string;
  }[];
};

const PieChart = ({ cropDistribution }: PieChartProps) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
      <h3 className="text-lg font-bold mb-6">Crop Distribution</h3>
      <div className="flex-1 h-62">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={cropDistribution}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={8}
              dataKey="value"
            />
            <Tooltip />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        {cropDistribution.map(item => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="text-gray-600">{item.name}</span>
            </div>
            <span className="font-bold">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
