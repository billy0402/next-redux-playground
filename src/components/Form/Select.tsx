import { InnerProps } from './Field';

const Select = ({
  register,
  formState: { errors },
  fieldConfig,
}: InnerProps) => {
  // console.log(fieldConfig);

  return (
    <>
      <label htmlFor={fieldConfig.name}>{fieldConfig.label}</label>

      <select
        {...register(fieldConfig.name, { required: fieldConfig.required })}
        {...fieldConfig}
        id={fieldConfig.name}
        multiple={fieldConfig.multiple}
      >
        <option>請選擇{fieldConfig.name}</option>
        {fieldConfig.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[fieldConfig.name] && (
        <span>{errors[fieldConfig.name].message}</span>
      )}
    </>
  );
};

export default Select;
