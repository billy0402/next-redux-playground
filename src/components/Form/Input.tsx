import { memo } from 'react';

import { InnerProps } from './Field';

const Input =
  // memo(
  function Inner({ register, formState: { errors }, fieldConfig }: InnerProps) {
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
//   (prevProps, nextProps) => prevProps.fieldConfig === nextProps.fieldConfig,
// );

export default Input;
