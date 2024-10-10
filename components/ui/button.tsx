import { ButtonHTMLAttributes } from "react";

type ButtonType = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonType) {
  const { className, ...rest } = props;
  return (
    <button
      {...rest}
      className={`relative py-2 px-4 rounded-md bg-neutral-700 hover:bg-neutral-900 disabled:bg-neutral-700 disabled:text-transparent font-bold text-sm text-neutral-100 ${className}`}
    >
      {children}
    </button>
  );
}
