import { IMG } from '@/assets';
import { useState } from 'react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center py-10">
      <div className="flex flex-col items-center gap-10 mb-11">
        <h1 className="text-primary font-black text-4xl text-center">
          Select The Best Plan <br /> For Your Needs
        </h1>

        <div className="bg-primary rounded-2xl p-1 relative w-fit">
          <div
            className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white rounded-xl transition-transform duration-300 ease-in-out ${
              isAnnual ? 'translate-x-full' : 'translate-x-0'
            }`}
          />

          <div className="flex items-center relative z-10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`cursor-pointer py-2 px-7 rounded-xl font-bold text-base transition-colors duration-300 ${
                !isAnnual ? 'text-primary' : 'text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`cursor-pointer py-2 px-7 rounded-xl font-bold text-base transition-colors duration-300 ${
                isAnnual ? 'text-primary' : 'text-white'
              }`}
            >
              Annually
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-stretch justify-center gap-11 ">
        <div className="bg-white rounded-2xl pt-8 pb-7 px-7 shadow-md flex flex-col max-w-[290px] w-full">
          <p className="text-primary text-lg font-semibold">Starter</p>
          <h3 className="text-2xl font-semibold text-primary mb-1">Free</h3>
          <p className="text-gray-400 text-sm pb-2 border-b border-gray-200 mb-4">
            For those getting started
          </p>

          <ul className="flex flex-col gap-2 mb-17">
            <li className="flex items-center gap-2">
              <img className="w-5 h-5" src={IMG.circleTickImg} alt="Tick" />
              <p className="font-medium">WebPro ai domain</p>
            </li>

            <li className="flex items-center gap-2">
              <img className="w-5 h-5" src={IMG.circleTickImg} alt="Tick" />
              <p className="font-medium">WebPro ai domain</p>
            </li>

            <li className="flex items-center gap-2">
              <img className="w-5 h-5" src={IMG.circleTickImg} alt="Tick" />
              <p className="font-medium">WebPro ai domain</p>
            </li>

            <li className="flex items-center gap-2">
              <img className="w-5 h-5" src={IMG.circleTickImg} alt="Tick" />
              <p className="font-medium">WebPro ai domain</p>
            </li>
          </ul>

          <button className="bg-primary text-white text-center py-2.5 px-8 text-base font-bold rounded-xl mt-auto">
            Start 7 day free trial
          </button>
        </div>

        <div className="bg-white rounded-2xl pt-8 pb-7 px-7 shadow-md flex flex-col max-w-[290px] w-full">
          <p className="text-primary text-lg font-semibold">Basic</p>
          <h3 className="text-2xl font-semibold text-primary mb-1">
            {isAnnual ? '$149.99' : '$14.99'}
            <span className=" text-primary text-sm ">{isAnnual ? ' /year' : ' /month'}</span>
          </h3>
          <p className="text-gray-400 text-sm pb-2 border-b border-gray-200 mb-4">
            For those getting started
          </p>

          <ul className="flex flex-col gap-2 mb-17">
            <li className="flex items-center gap-2">
              <img className="w-5 h-5" src={IMG.circleTickImg} alt="Tick" />
              <p className="font-medium">WebPro ai domain</p>
            </li>

            <li className="flex items-center gap-2">
              <img className="w-5 h-5" src={IMG.circleTickImg} alt="Tick" />
              <p className="font-medium">WebPro ai domain</p>
            </li>

            <li className="flex items-center gap-2">
              <img className="w-5 h-5" src={IMG.circleTickImg} alt="Tick" />
              <p className="font-medium">WebPro ai domain</p>
            </li>

            <li className="flex items-center gap-2">
              <img className="w-5 h-5" src={IMG.circleTickImg} alt="Tick" />
              <p className="font-medium">WebPro ai domain</p>
            </li>
          </ul>

          <button className="bg-primary text-white text-center py-2.5 px-8 text-base font-bold rounded-xl mt-auto">
            Subscribe now
          </button>
        </div>

        <div className="bg-white rounded-2xl pt-8 pb-7 px-7 shadow-md flex flex-col max-w-[290px] w-full relative overflow-clip">
          <div
            className="bg-primary h-32 w-full absolute top-0 left-0"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0% 12%)' }}
          ></div>

          <p className="text-primary text-lg font-semibold">Pro</p>
          <h3 className="text-2xl font-semibold text-primary mb-1">
            {isAnnual ? '$299.99' : '$29.99'}
            <span className=" text-primary text-sm ">{isAnnual ? ' /year' : ' /month'}</span>
          </h3>
          <p className="text-gray-400 text-sm pb-2 border-b border-gray-200 mb-4">
            For those getting started
          </p>

          <ul className="flex flex-col gap-2 mb-17">
            <li className="flex items-center gap-2">
              <img className="w-5 h-5" src={IMG.circleTickImg} alt="Tick" />
              <p className="font-medium">WebPro ai domain</p>
            </li>

            <li className="flex items-center gap-2">
              <img className="w-5 h-5" src={IMG.circleTickImg} alt="Tick" />
              <p className="font-medium">WebPro ai domain</p>
            </li>

            <li className="flex items-center gap-2">
              <img className="w-5 h-5" src={IMG.circleTickImg} alt="Tick" />
              <p className="font-medium">WebPro ai domain</p>
            </li>

            <li className="flex items-center gap-2">
              <img className="w-5 h-5" src={IMG.circleTickImg} alt="Tick" />
              <p className="font-medium">WebPro ai domain</p>
            </li>
          </ul>

          <button className="bg-primary text-white text-center py-2.5 px-8 text-base font-bold rounded-xl mt-auto">
            Subscribe now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
