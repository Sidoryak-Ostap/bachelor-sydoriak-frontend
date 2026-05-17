import { CircleQuestionMark, RefreshCw, ShieldOff, Mail, Sparkles } from 'lucide-react';

export const FAQDATA = [
  {
    value: 'available-trial',
    icon: <CircleQuestionMark className="text-gray-400" size={20} />,
    question: 'dashboard.faq.freeTrial.question',
    answer: 'dashboard.faq.freeTrial.answer',
  },
  {
    value: 'plan',
    icon: <RefreshCw className="text-gray-400" size={20} />,
    question: 'dashboard.faq.changePlan.question',
    answer: 'dashboard.faq.changePlan.answer',
  },
  {
    value: 'policy',
    icon: <ShieldOff className="text-gray-400" size={20} />,
    question: 'dashboard.faq.cancellationPolicy.question',
    answer: 'dashboard.faq.cancellationPolicy.answer',
  },
  {
    value: 'email',
    icon: <Mail className="text-gray-400" size={20} />,
    question: 'dashboard.faq.changeEmail.question',
    answer: 'dashboard.faq.changeEmail.answer',
  },
  {
    value: 'benefits',
    icon: <Sparkles className="text-gray-400" size={20} />,
    question: 'dashboard.faq.paidPlansBenefits.question',
    answer: 'dashboard.faq.paidPlansBenefits.answer',
  },
];
