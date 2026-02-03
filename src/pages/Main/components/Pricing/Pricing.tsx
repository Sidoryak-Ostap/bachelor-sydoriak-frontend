import { CircleCheckBig } from 'lucide-react';

const Pricing = () => {
  return (
    <div id="pricing" className="bg-white py-25">
      <div className="max-w-7xl mx-auto  px-5 xl:px-0">
        <h2 className="text-center text-black font-bold text-4xl mb-15">
          Simple, Transparent Pricing
        </h2>

        <div className="flex items-stretch justify-between gap-6 ">
          <div className="flex-1 flex flex-col p-8 rounded-2xl border-2 border-gray-200">
            <p className="text-primary text-lg font-semibold mb-2">Starter</p>
            <h3 className="text-black font-bold text-4xl mb-2">Free</h3>
            <p className="text-base text-gray-400 mb-12">For those just getting started</p>

            <ul className="flex flex-col gap-3 mb-17">
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">Field Mapping Basic</p>
              </li>
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">1 User Account</p>
              </li>
            </ul>

            <button className="mt-auto bg-primary text-white font-bold text-base py-3 w-full rounded-lg cursor-pointer">
              Start 7 day free trial
            </button>
          </div>

          <div className="flex-1 flex flex-col p-8 rounded-2xl border-2 border-gray-200">
            <p className="text-primary text-lg font-semibold mb-2">Basic</p>
            <h3 className="text-black font-bold text-4xl mb-2">$14.99</h3>
            <p className="text-base text-gray-400 mb-12">Essential tools for growing farms</p>

            <ul className="flex flex-col gap-3 mb-17">
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">Everything in Starter</p>
              </li>
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">Profitability Analysis</p>
              </li>
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">Export Reports</p>
              </li>
            </ul>

            <button className="mt-auto bg-primary text-white font-bold text-base py-3 w-full rounded-lg cursor-pointer">
              Subscribe now
            </button>
          </div>

          <div className="flex-1 flex flex-col p-8 rounded-2xl border-2 border-primary relative">
            <p className="text-primary text-lg font-semibold mb-2">Pro</p>
            <h3 className="text-black font-bold text-4xl mb-2">$29.99</h3>
            <p className="text-base text-gray-400 mb-12">
              Advanced features for professional farms
            </p>

            <ul className="flex flex-col gap-3 mb-17">
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">Unlimited Fields</p>
              </li>
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">Team Collaboration</p>
              </li>
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">Priority Support</p>
              </li>
            </ul>

            <button className="mt-auto bg-primary text-white font-bold text-base py-3 w-full rounded-lg cursor-pointer">
              Subscribe now
            </button>

            <div className="uppercase text-white font-bold text-xs rounded-2xl bg-primary absolute -top-3.5 right-1/2 translate-x-1/2 px-3 py-1.5">
              Best value
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
