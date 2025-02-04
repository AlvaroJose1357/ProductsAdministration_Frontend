import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <p className="rounded-lg bg-red-600 p-2 text-center text-sm font-bold text-white uppercase">
      {children}
    </p>
  );
}
