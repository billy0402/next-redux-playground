import { HTMLAttributes } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import Field from './Field';

type FieldConfig = HTMLAttributes<HTMLInputElement> & {
  name: string;
  type: string;
  label: string;
  required: boolean;
};

type Props = {
  fieldConfigs: FieldConfig[];
  onSubmit: (data: any) => void;
  children?: React.ReactNode;
};

const Form = ({ fieldConfigs, onSubmit, children }: Props) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {fieldConfigs.map((fieldConfig) => (
          <Field key={fieldConfig.name} fieldConfig={fieldConfig} />
        ))}
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
export type { FieldConfig };
