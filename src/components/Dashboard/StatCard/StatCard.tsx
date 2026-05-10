type StatCardProps = {
  label: string;
  val: string;
  icon: React.ElementType;
  color: string;
  bg: string;
};

const StatCard = (stat: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
        <stat.icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
        <p className="text-xl font-bold text-gray-900">{stat.val}</p>
      </div>
    </div>
  );
};

export default StatCard;
