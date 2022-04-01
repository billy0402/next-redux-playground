import { InnerProps } from './Field';

const Select = ({
  register,
  formState: { errors },
  fieldConfig: { name, label, required, multiple, options, defaultValue },
}: InnerProps) => {
  // console.log(fieldConfig);

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select
        {...register(name, { required: required })}
        id={name}
        multiple={multiple}
        defaultValue={defaultValue}
      >
        <option>請選擇{name}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && <span>{errors[name].message}</span>}
    </>
  );
};

export default Select;
