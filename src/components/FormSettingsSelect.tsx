import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  isMulti?: boolean;
}

const FormSettingsSelect = <T extends FieldValues>({
  name,
  control,
  options,
  placeholder = 'Select an option',
  className = 'w-60',
  isMulti = false,
}: FormSelectProps<T>) => {
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger className={cn('text-md h-12', className)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {isMulti ? t(option.label) : option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default FormSettingsSelect;
