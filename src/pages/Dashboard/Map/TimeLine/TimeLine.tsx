import type { FieldImage } from '@/services/indices';
import { type Dispatch, type SetStateAction } from 'react';

type TimeLineProps = {
  fieldImagesData: FieldImage[];
  activeFieldMap: FieldImage;
  setActiveFieldMap: Dispatch<SetStateAction<FieldImage>>;
};

const TimeLine = ({ fieldImagesData, activeFieldMap, setActiveFieldMap }: TimeLineProps) => {
  return (
    <div className="w-full p-4 rounded-lg bg-white">
      <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
        {fieldImagesData.map(image => (
          <button
            key={image.date}
            onClick={() => setActiveFieldMap(image)}
            className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              image.date === activeFieldMap.date
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {new Date(image.date).toLocaleDateString()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
