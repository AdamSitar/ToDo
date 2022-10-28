import React from "react";
import { FieldError } from "react-hook-form";

interface IErrorBoxProps {
  errors: any;
}

const ErrorBox: React.FC<IErrorBoxProps> = ({ errors }) => {
  const errorsToShow = Object.keys(errors);
  return (
    <div className="flex flex-col">
      {errorsToShow.map((key: any) => (
        <span key={key} className="self-center text-red-500">
          {errors[key].message}
        </span>
      ))}
    </div>
  );
};

export default ErrorBox;
