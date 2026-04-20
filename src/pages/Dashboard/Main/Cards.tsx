import { useMemo } from 'react';
import { Sprout, Ruler, TrendingUp, Leaf } from 'lucide-react';
import StatCard from '@/components/Dashboard/StatCard';

type CardsProps = {
  totalFields: number;
  totalArea: number;
  averageArea: number;
};

const Cards = ({ totalFields, totalArea, averageArea }: CardsProps) => {
  const statCards = useMemo(() => {
    return [
      {
        label: 'Total Area',
        val: `${totalArea} ha`,
        icon: Ruler,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
      },
      {
        label: 'Total Fields',
        val: totalFields.toString(),
        icon: Sprout,
        color: 'text-green-600',
        bg: 'bg-green-50',
      },
      {
        label: 'Average Area',
        val: `${averageArea.toFixed(2)} ha`,
        icon: TrendingUp,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
      },
      {
        label: 'Average NDVI',
        val: `0.68`,
        icon: Leaf,
        color: 'text-green-600',
        bg: 'bg-green-50',
      },
    ];
  }, [totalArea, totalFields, averageArea]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
};

export default Cards;
