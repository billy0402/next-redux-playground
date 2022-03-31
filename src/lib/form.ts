import { FieldConfig } from '@components/Form';

const setDefaultValues = (fieldConfigs: FieldConfig[], data: any) =>
  fieldConfigs.map((config) => ({
    ...config,
    defaultValue: data[config.name],
  }));

export { setDefaultValues };
