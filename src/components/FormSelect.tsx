import { useState, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { ChevronDown, Check } from 'lucide-react';
import { capitalizeFirstLetter } from '../utils/format';

type Option = {
  label: string;
  value: string | number;
};

type FormSelectProps = {
  label?: string;
  name: string;
  options: Option[];
  placeholder?: string;
  control: any;
  error?: any;
};

const FormSelect = ({ label, name, options, placeholder, control, error }: FormSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {label && <label className="block text-base font-medium text-gray-700 mb-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedOption = options.find(opt => opt.value === value);

          return (
            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between bg-[#EAF0EF] rounded-[10px] py-2.5 px-4 w-full border cursor-pointer transition-all duration-200 ${
                  error
                    ? 'border-red-500'
                    : isOpen
                      ? 'border-primary/50 ring-2 ring-primary/10'
                      : 'border-transparent'
                }`}
              >
                <span className={`truncate ${!selectedOption ? 'text-gray-500' : 'text-black'}`}>
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </div>

              {isOpen && (
                <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto overflow-x-hidden py-1 ">
                  {options.map(option => {
                    const isSelected = option.value === value;
                    return (
                      <li
                        key={option.value}
                        onClick={() => {
                          onChange(option.value);
                          setIsOpen(false);
                        }}
                        className={`flex items-center justify-between px-4 py-3 cursor-pointer text-sm transition-colors ${
                          isSelected
                            ? 'bg-[#EAF0EF] text-primary font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="truncate">{option.label}</span>
                        {isSelected && <Check size={16} className="text-primary" />}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        }}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">{capitalizeFirstLetter(error.message || '')}</p>
      )}
    </div>
  );
};

export default FormSelect;
