import { memo } from 'react';

import { InnerProps } from './Field';

const Input =
  // memo(
  function Inner({
    register,
    formState: { errors },
    fieldConfig: { name, type, label, required, defaultValue },
  }: InnerProps) {
    // console.log(fieldConfig);

    return (
      <>
        <label htmlFor={name}>{label}</label>
        <input
          {...register(name, { required: required })}
          id={name}
          type={type}
          defaultValue={defaultValue}
        />
        {errors[name] && <span>{errors[name].message}</span>}
      </>
    );
  };
//   (prevProps, nextProps) => prevProps.fieldConfig === nextProps.fieldConfig,
// );

export default Input;
