import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { FAQDATA } from './constants';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <div className=" min-h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center gap-4 mb-10 max-w-2xl w-full mx-auto">
        <h1 className="font-black text-4xl text-center text-primary">{t('dashboard.faq.title')}</h1>
        <p className="text-base text-gray-400 text-center">{t('dashboard.faq.description')}</p>
      </div>

      <Accordion
        type="multiple"
        defaultValue={['available-trial']}
        className="max-w-2xl w-full mx-auto"
      >
        {FAQDATA.map(item => (
          <AccordionItem key={item.value} value={item.value} className="border-b-0">
            <AccordionTrigger className="flex items-start gap-4 py-4 text-left hover:no-underline cursor-pointer">
              <div className="bg-white border border-gray-400 rounded-lg flex items-center justify-center p-2 shrink-0">
                {item.icon}
              </div>

              <div className="flex-1 font-bold text-base pt-1">{t(item.question)}</div>
            </AccordionTrigger>

            <AccordionContent className="pl-13 text-base text-gray-400">
              {t(item.answer)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
