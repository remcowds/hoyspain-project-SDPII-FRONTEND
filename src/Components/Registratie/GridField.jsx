import { useFormContext } from "react-hook-form";

const GridField = ({
  cols,
  label,
  id,
  icon,
  tekst,
  type,
  defaultValue,
  validation,
  ph,
  sub,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={`my-1 flex flex-col col-span-${cols}`}>
      <div className="input-icons relative">
        <i className={icon}></i>
        <input
          {...register(label, validation)}
          className=" bg-opacity-0 rounded-md py-1 text-gray-700 placeholder:text-gray-700 hover:bg-opacity-20 bg-gray-400"
          defaultValue={defaultValue}
          placeholder={ph?ph:label}
          type={type}
          id={id ? id : label}
          name={id ? id : label}
          {...register(label)}
          {...rest}
        ></input>
        <sub className="absolute left-2 -bottom-5 text-sm lg:block hidden">{sub}</sub>

</div>
      

      {errors[label] && (
        <p data-cy="labelinput-error" className="text-red-500">
          {errors[label].message}
        </p>
      )}
    </div>
  );
};

export default GridField;
