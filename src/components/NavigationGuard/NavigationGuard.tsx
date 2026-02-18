import { resetFieldCreation } from '@/store/reducers/createFieldSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useBlocker } from 'react-router-dom';

interface NavigationGuardProps {
  shouldBlock: boolean;
}

const NavigationGuard: React.FC<NavigationGuardProps> = ({ shouldBlock }) => {
  const dispatch = useDispatch();

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      shouldBlock && currentLocation.pathname !== nextLocation.pathname
  );

  if (blocker.state !== 'blocked') return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
        <h3 className="text-2xl font-bold text-gray-900">Leave this page?</h3>
        <p className="text-gray-600 mt-3 text-lg">
          You have started creating a field. If you leave now, all data and drawn boundaries will be
          lost.
        </p>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => blocker.reset?.()}
            className="cursor-pointer flex-1 px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Continue
          </button>
          <button
            onClick={() => {
              dispatch(resetFieldCreation());
              blocker.proceed?.();
            }}
            className="cursor-pointer flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 shadow-lg shadow-red-200 transition-all"
          >
            Yes, leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationGuard;
