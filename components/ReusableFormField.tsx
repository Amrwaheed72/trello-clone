import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';


type ReusableFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  formLabel: string;
  type?: 'input' | 'textarea';
};

function ReusableFormField<T extends FieldValues>({
  control,
  name,
  placeholder,
  formLabel,
  type = 'input',
}: ReusableFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel}</FormLabel>
          <FormControl>
            {type === 'input' ? (
              <Input placeholder={placeholder} {...field} />
            ) : (
              <Textarea placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default ReusableFormField;
