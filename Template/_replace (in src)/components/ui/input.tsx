import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "placeholder:txt placeholder:opacity-40 flex h-10 w-full rounded-md border border-textcolor border-opacity-50 bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-textcolor focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-textcolor-dark dark:border-opacity-50 dark:focus-visible:ring-textcolor-dark",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
