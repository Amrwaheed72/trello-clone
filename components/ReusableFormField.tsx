import dynamic from 'next/dynamic';

import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Control, FieldValues, Path } from 'react-hook-form';
import { FormField } from './ui/form';

const FormControl = dynamic(() =>
  import('./ui/form').then((mod) => mod.FormControl),
);
const FormItem = dynamic(() => import('./ui/form').then((mod) => mod.FormItem));
const FormLabel = dynamic(() =>
  import('./ui/form').then((mod) => mod.FormLabel),
);
const FormMessage = dynamic(() =>
  import('./ui/form').then((mod) => mod.FormMessage),
);
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
