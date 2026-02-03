import { Map, TrendingUp, FileText } from 'lucide-react';

const FEATURES_INFO = [
  {
    icon: <Map className="text-primary" />,
    title: 'Precision Mapping',
    description:
      'Visualize your fields with satellite imagery. Mark boundaries, track soil health, and monitor crop progress in real-time.',
  },
  {
    icon: <TrendingUp className="text-primary" />,
    title: 'Profitability Analysis',
    description:
      'Understand your inputs versus outputs. Our AI-driven insights help you make cost-effective decisions for every season.',
  },
  {
    icon: <FileText className="text-primary" />,
    title: 'Automated Reports',
    description:
      'Generate detailed reports for stakeholders instantly. From yield predictions to resource usage, get the data you need.',
  },
];

const Features = () => {
  return (
    <div id="features" className="bg-white py-20">
      <div className="max-w-7xl mx-auto my-0 px-5 xl:px-0">
        <div className="flex flex-col items-center mb-10">
          <h3 className="uppercase text-primary text-base font-bold mb-4">Capabilities</h3>
          <h2 className="text-black text-[32px] font-bold">Everything You Need to Grow</h2>
        </div>

        <div className="flex items-center justify-between gap-8">
          {FEATURES_INFO.map(({ icon, title, description }) => (
            <div key={title} className="rounded-2xl p-8 bg-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-gray-200 flex items-center justify-center mb-6">
                {icon}
              </div>
              <h2 className="mb-2.5 text-black text-xl font-bold">{title}</h2>
              <p className="text-base text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
