import { useTranslation } from 'react-i18next';

export type Range = {
  value: '1M' | '3M' | 'ALL';
  label: string;
};

interface RangePickerProps {
  activeRange: Range;
  onChange: (range: Range) => void;
}

const RangePicker = ({ activeRange, onChange }: RangePickerProps) => {
  const { t } = useTranslation();

  const ranges: Range[] = [
    {
      value: '1M',
      label: '1M',
    },
    {
      value: '3M',
      label: '3M',
    },
    {
      value: 'ALL',
      label: t('dashboard.fieldDetails.analysis.all'),
    },
  ];

  return (
    <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
      {ranges.map(range => (
        <button
          key={range.value}
          onClick={() => onChange(range)}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
            activeRange.value === range.value
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default RangePicker;
