import { Check } from 'lucide-react';

type ConfirmButtonProps = {
  handleSaveField: () => void;
  coordinates: number[][] | null;
};

const ConfirmButton = ({ handleSaveField, coordinates }: ConfirmButtonProps) => {
  return (
    <button
      onClick={handleSaveField}
      disabled={!coordinates}
      className="cursor-pointer absolute bottom-5 left-1/2 transform -translate-x-1/2 
             bg-white backdrop-blur-md p-4 rounded-full shadow-lg border border-gray-200 
             text-gray-700 hover:text-primary transition-all flex items-center justify-center z-10
             
             /* Disabled styles */
             disabled:bg-gray-50/80 disabled:border-gray-100 
             disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-100"
    >
      <Check size={28} />
    </button>
  );
};

export default ConfirmButton;
