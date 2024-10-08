import { HTMLAttributes } from "react";

export default function Container({
  children,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={`flex bg-neutral-100 rounded-2xl shadow-md ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
