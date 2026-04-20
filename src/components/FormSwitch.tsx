import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface FormSwitchProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  className?: string;
}

export const FormSwitch = <T extends FieldValues>({
  name,
  control,
  className,
}: FormSwitchProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
          className={cn('scale-125 cursor-pointer', className)}
        />
      )}
    />
  );
};
