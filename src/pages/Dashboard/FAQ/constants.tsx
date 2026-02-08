import { CircleQuestionMark, RefreshCw, ShieldOff, Mail, Sparkles } from 'lucide-react';

export const FAQDATA = [
  {
    value: 'available-trial',
    icon: <CircleQuestionMark className="text-gray-400" size={20} />,
    question: 'Is there a free trial available?',
    answer:
      "Yes, you can try AgroMap for free for 7 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running.",
  },
  {
    value: 'plan',
    icon: <RefreshCw className="text-gray-400" size={20} />,
    question: 'Can I change my plan later?',
    answer:
      "Yes, you can try AgroMap for free for 7 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running.",
  },
  {
    value: 'policy',
    icon: <ShieldOff className="text-gray-400" size={20} />,
    question: 'What is your cancellation policy?',
    answer:
      "Yes, you can try AgroMap for free for 7 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running.",
  },
  {
    value: 'email',
    icon: <Mail className="text-gray-400" size={20} />,
    question: 'How do I change my account email?',
    answer:
      "Yes, you can try AgroMap for free for 7 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running.",
  },
  {
    value: 'benefits',
    icon: <Sparkles className="text-gray-400" size={20} />,
    question: 'What benefits do paid plans include?',
    answer:
      "Yes, you can try AgroMap for free for 7 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running.",
  },
];
