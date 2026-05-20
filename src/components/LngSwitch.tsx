import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LngSwitch = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'uk'>('uk');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (selectedLang: 'en' | 'uk') => {
    setLang(selectedLang);
    setIsOpen(false);
    i18n.changeLanguage(selectedLang);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-[#00875a] text-primary bg-white rounded-2xl text-base font-semibold transition-all hover:bg-zinc-50 focus:outline-none min-w-[100px]"
      >
        <span>{lang}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 text-[#00875a] ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden border border-zinc-100">
          <div className="py-1">
            <button
              onClick={() => handleLanguageSelect('en')}
              className={`flex w-full items-center px-4 py-2 text-sm font-medium transition-colors ${
                lang === 'en'
                  ? 'bg-zinc-100 text-primary'
                  : 'text-zinc-700 hover:bg-zinc-50 hover:text-primary'
              }`}
            >
              {lang === 'en' ? 'English' : 'Англійська'}
            </button>
            <button
              onClick={() => handleLanguageSelect('uk')}
              className={`flex w-full items-center px-4 py-2 text-sm font-medium transition-colors ${
                lang === 'uk'
                  ? 'bg-zinc-100 text-primary'
                  : 'text-zinc-700 hover:bg-zinc-50 hover:text-primary'
              }`}
            >
              {lang === 'uk' ? 'Українська' : 'Ukrainian'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
