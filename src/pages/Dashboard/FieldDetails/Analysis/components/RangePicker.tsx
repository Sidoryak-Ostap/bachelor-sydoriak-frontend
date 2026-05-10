export type Range = '1M' | '3M' | 'ALL';

interface RangePickerProps {
  activeRange: Range;
  onChange: (range: Range) => void;
}

const RangePicker = ({ activeRange, onChange }: RangePickerProps) => {
  const ranges: Range[] = ['1M', '3M', 'ALL'];

  return (
    <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
      {ranges.map(range => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
            activeRange === range
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
};

export default RangePicker;
