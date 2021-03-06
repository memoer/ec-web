import React from "react";
import { useFormContext } from "react-hook-form";

interface RadioProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  children: string;
}

const Radio: React.FC<RadioProps> = ({
  name,
  children,
  className,
  value,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <label
      className={`text-gray-700 border rounded p-2 text-center ${className} ${
        errors[name]?.message ? "error-input" : ""
      }`}
    >
      <input type="radio" value={value} {...register(name)} {...rest} />
      <span className="ml-1">{children}</span>
    </label>
  );
};

export default React.memo(Radio) as React.FC<RadioProps>;
