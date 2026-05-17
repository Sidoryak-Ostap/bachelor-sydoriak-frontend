import { CircleCheck, Microscope, X, MessageSquareWarning, Lightbulb } from 'lucide-react';

type FieldAnalysisModalProps = {
  setOpen: (open: boolean) => void;
  reportData:
    | {
        status: string;
        stressLevel: string;
        recommendations: string[];
        risks: string[];
        analysis: string;
      }
    | undefined;
};

const FieldAnalysisModal = ({ setOpen, reportData }: FieldAnalysisModalProps) => {
  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-[0.5px]"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white py-6 px-4.5 border border-gray-400 rounded-lg max-w-3xl w-full max-h-[80vh] flex flex-col overflow-y-auto"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 rounded-lg p-3">
              <Microscope className="text-primary" size={24} />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-slate-800">Аналіз стану поля</h3>
              <p className="text-slate-600">Детальний звіт на основі вегетаційних індексів</p>
            </div>
          </div>

          <div
            className="p-2 rounded-md bg-slate-100 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <X className="text-gray-500" />
          </div>
        </div>

        <div className="mt-6 flex items-stretch gap-6">
          <div className="bg-green-100 rounded-lg p-3 border border-green-400 flex items-start gap-2 w-2/3">
            <CircleCheck className="text-green-600 w-20" size={24} />
            <p className="text-green-800 font-semibold">{reportData?.status}</p>
          </div>

          <div className="bg-white rounded-lg p-3 border border-gray-400 flex flex-col items-center justify-center gap-2 w-1/3">
            <p className="text-green-800 font-semibold uppercase">Рівень стресу</p>
            <p className="bg-green-100 text-green-800 font-semibold rounded-full px-3 py-2 flex items-center justify-center">
              {reportData?.stressLevel.toLowerCase() === 'low' && 'Низький'}
              {reportData?.stressLevel.toLowerCase() === 'medium' && 'Середній'}
              {reportData?.stressLevel.toLowerCase() === 'high' && 'Високий'}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-slate-800">Аналіз динаміки індексів</h2>
          <p className="text-slate-600 text-md mt-1">{reportData?.analysis}</p>
        </div>

        {reportData?.risks && reportData.risks.length > 0 && (
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-400 mt-6">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquareWarning className="text-orange-600" size={24} />
              <p className="text-orange-600 font-semibold text-lg">Потенційні ризики</p>
            </div>

            <ul className="text-orange-600 flex flex-col gap-2">
              {reportData?.risks.map((risk, index) => (
                <li key={index} className="flex items-center gap-2">
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        )}

        {reportData?.recommendations && reportData.recommendations.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-400 mt-6">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="text-blue-600" size={24} />
              <p className="text-blue-600 font-semibold text-lg">Рекомендації</p>
            </div>

            <ul className="text-blue-50-600 flex flex-col gap-2">
              {reportData?.recommendations.map((rec, index) => (
                <li key={index} className="flex items-center gap-2">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end">
          <button
            onClick={() => setOpen(false)}
            className="bg-primary text-white py-2 px-4 rounded-md  transition-colors cursor-pointer hover:bg-primary/90"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldAnalysisModal;
