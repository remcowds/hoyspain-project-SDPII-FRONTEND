import { useFormContext } from "react-hook-form";

const LabelInput = ({ label, type, defaultValue, validation, register, ...rest }) => {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor={label} className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">{label}</label>
      <input
        defaultValue={defaultValue}
        placeholder={label}
        type={type}
        id={label}
        name={label}
        {...rest}
      />
    </div>
  );
};

export default LabelInput;