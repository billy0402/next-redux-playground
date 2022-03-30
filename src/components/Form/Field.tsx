import { useFormContext } from 'react-hook-form';

import { FieldConfig } from '.';
import Input from './Input';

type Props = {
  fieldConfig: FieldConfig;
};

const Field = ({ fieldConfig }: Props) => {
  const methods = useFormContext();

  switch (fieldConfig.type) {
    default:
      return <Input {...methods} fieldConfig={fieldConfig} />;
  }
};

export default Field;
