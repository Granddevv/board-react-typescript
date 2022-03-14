import React from "react";

interface IInputProps {
  label: string;
  wrapClass: string;
  inputClass: string;
  labelClass: string;
  [x: string]: any;
}

const Input = (props: IInputProps) => {
  const { label, wrapClass, inputClass, labelClass } = props;

  return (
    <div className={wrapClass}>
      <p className={labelClass}>{label}:</p>
      <input className={inputClass} {...props} />
    </div>
  );
};

export default Input;
