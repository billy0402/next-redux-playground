import { memo } from 'react';

import { UseFormReturn } from 'react-hook-form';

import { FieldConfig } from '.';

type Props = UseFormReturn & {
  fieldConfig: FieldConfig;
};

const Input =
  // memo(
  function Inner({ register, formState: { errors }, fieldConfig }: Props) {
    // console.log(fieldConfig);

    return (
      <>
        <label htmlFor={fieldConfig.name}>{fieldConfig.label}</label>
        <input
          {...register(fieldConfig.name, { required: fieldConfig.required })}
          {...fieldConfig}
          id={fieldConfig.name}
        />
        {errors[fieldConfig.name] && (
          <span>{errors[fieldConfig.name].message}</span>
        )}
      </>
    );
  };
//   (prevProps, nextProps) =>
//     prevProps.formState.isDirty === nextProps.formState.isDirty,
// );

export default Input;
