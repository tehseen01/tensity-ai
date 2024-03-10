"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import ReactTextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  TextareaAutosizeProps;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <ReactTextareaAutosize
        maxRows={6}
        className={cn(
          "flex w-full rounded-md resize-none border border-input bg-background outline-none border-none px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
