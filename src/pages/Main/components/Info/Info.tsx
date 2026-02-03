import { IMG } from '@/assets';

const Info = () => {
  return (
    <div id="solutions" className="w-full bg-[#F5F5F5] py-25">
      <div className="max-w-7xl mx-auto my-0  px-5 xl:px-0">
        <div className="flex gap-15 items-center">
          <div className="w-1/2">
            <img className="rounded-2xl w-full" src={IMG.fieldImg} alt="Field Illustration" />
          </div>

          <div className="w-1/2">
            <h2 className="text-black font-bold text-4xl mb-6">
              Control Your Farm From <br /> Anywhere
            </h2>
            <p className="text-base text-gray-400 mb-6">
              Whether you're in the tractor cab or the office, AgroMap keeps you connected to your
              operation. Sync data across devices and collaborate with your team instantly.
            </p>

            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <img src={IMG.circleTickImg} alt="Tick Icon" />
                <p className="text-base font-medium">Real-time synchronization</p>
              </li>
              <li className="flex items-center gap-3">
                <img src={IMG.circleTickImg} alt="Tick Icon" />
                <p className="text-base font-medium">Offline mode for remote fields</p>
              </li>
              <li className="flex items-center gap-3">
                <img src={IMG.circleTickImg} alt="Tick Icon" />
                <p className="text-base font-medium">Multi-user access & permissions</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
