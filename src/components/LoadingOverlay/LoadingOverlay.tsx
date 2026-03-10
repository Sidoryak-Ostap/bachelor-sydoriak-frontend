import { Loader } from 'lucide-react';

const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[1px] transition-opacity">
      <Loader />
    </div>
  );
};

export default LoadingOverlay;
