type AreaDistributionProps = {
  currentDistributionData: {
    excellent: number;
    good: number;
    moderate: number;
    poor: number;
  };
};

const AreaDistribution = ({ currentDistributionData }: AreaDistributionProps) => {
  const distribution = [
    {
      label: 'Excellent',
      range: '0.7 - 1.0',
      percentage: currentDistributionData.excellent,
      color: 'bg-green-700',
    },
    {
      label: 'Good',
      range: '0.5 - 0.7',
      percentage: currentDistributionData.good,
      color: 'bg-green-500',
    },
    {
      label: 'Moderate',
      range: '0.3 - 0.5',
      percentage: currentDistributionData.moderate,
      color: 'bg-yellow-500',
    },
    {
      label: 'Poor',
      range: '< 0.3',
      percentage: currentDistributionData.poor,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md border border-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-slate-800">Area Distribution</h3>
      </div>

      {distribution.map((item, idx) => (
        <div key={idx} className="mb-6 last:mb-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-700">
              {item.label} <span className="text-gray-400 font-normal">({item.range})</span>
            </span>
            <span className="text-sm font-bold text-slate-800">{item.percentage}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${item.color}`}
              style={{ width: `${item.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AreaDistribution;
