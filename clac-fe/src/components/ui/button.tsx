import * as React from "react";

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { className = "", ...rest } = props;

  return (
    <button
      {...rest}
      className={`px-4 py-2 rounded bg-black text-white ${className}`}
    />
  );
}
