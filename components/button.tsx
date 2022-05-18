import { cls } from "../libs/client/utils";

interface IButtonProps {
  text: string;
  isBig?: boolean;
  [key: string]: any;
}

export default function Button({
  isBig = false,
  onClick,
  text,
  ...rest
}: IButtonProps) {
  return (
    <button
      {...rest}
      className={cls(
        "w-full bg-orange-500 hover:bg-orange-600 text-white px-4 border border-transparent rounded-md shadow-sm  font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ",
        isBig ? "py-3 text-base" : "py-2 text-sm"
      )}
    >
      {text}
    </button>
  );
}
