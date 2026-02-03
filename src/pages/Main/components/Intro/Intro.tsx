import { IMG } from '../../../../assets';

const Intro = () => {
  return (
    <div className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto my-0">
        <div className="flex flex-col items-center">
          <div className="px-4 py-2 text-primary font-bold text-sm uppercase bg-gray-200 rounded-full">
            ✨ THE #1 FARM MANAGEMENT PLATFORM
          </div>

          <h1 className="text-primary font-black text-5xl text-center mt-6 ">
            Select The Best Plan <br /> For Your Needs
          </h1>

          <p className="text-lg text-gray-400 text-center mt-6 ">
            Actually, let's start with optimized insights. Upgrade AgroMap today to <br /> unlock
            smarter insights and control over every acre of your land.
          </p>

          <div className="flex items-center gap-4 mt-10">
            <button className="cursor-pointer px-8 py-2 text-white bg-primary text-base font-medium rounded-xl border-3 border-transparent flex items-center justify-center">
              Start Free Trial
            </button>

            <button className="cursor-pointer text-primary text-base font-medium border-primary border-3 rounded-xl px-8 py-2 flex items-center justify-center">
              View Demo
            </button>
          </div>
        </div>

        <div className="mt-5">
          <img src={IMG.uiImg} />
        </div>
      </div>
    </div>
  );
};

export default Intro;
