import { useFormContext, UseFormReturn } from 'react-hook-form';

import { FieldConfig } from '.';
import Input from './Input';
import Select from './Select';

type Props = {
  fieldConfig: FieldConfig;
};
type InnerProps = UseFormReturn & {
  fieldConfig: FieldConfig;
};

const Field = ({ fieldConfig }: Props) => {
  const methods = useFormContext();

  switch (fieldConfig.type) {
    case 'select':
      return <Select {...methods} fieldConfig={fieldConfig} />;
    default:
      return <Input {...methods} fieldConfig={fieldConfig} />;
  }
};

export default Field;
export type { InnerProps };
