import { UseFormRegisterReturn } from "react-hook-form";

interface ITextAreaProps {
  label?: string;
  name?: string;
  register?: UseFormRegisterReturn;
  [key: string]: any;
}

export default function TextArea({
  label,
  name,
  register,
  ...rest
}: ITextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="text-sm text-gray-700 font-medium mb-1 block"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        rows={4}
        className="mt-1 shadow-sm w-full focus:ring-orange-500 focus:border-orange-500 rounded-md border-gray-300 resize-none"
        {...register}
        {...rest}
      />
    </div>
  );
}
