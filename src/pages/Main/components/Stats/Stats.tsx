const STATS_INFO = [
  {
    value: '10K+',
    label: 'Active Farmers',
  },
  {
    value: '2.5M',
    label: 'Acres Mapped',
  },
  {
    value: '25%',
    label: 'Yield Increase',
  },
  {
    value: '4.9/5',
    label: 'User Rating',
  },
];

const Stats = () => {
  return (
    <div className="w-full h-50 bg-primary flex items-center">
      <div className="max-w-5xl mx-auto my-0 flex items-center justify-between w-full px-10 xl:px-0">
        {STATS_INFO.map(({ value, label }) => (
          <div className="flex flex-col gap-2">
            <h2 className="text-white font-bold text-4xl">{value}</h2>
            <p className="text-white text-base opacity-80 text-center">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
