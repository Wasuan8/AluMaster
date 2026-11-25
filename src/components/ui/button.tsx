import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const variants = cva(
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/15",
                outline: "border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800",
                ghost: "hover:bg-slate-100 dark:hover:bg-slate-800",
            },
        },
        defaultVariants: { variant: "default" },
    }
);

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof variants> {
    asChild?: boolean;
}

export const Button = React.forwardRef < HTMLButtonElement, Props> (
    ({ className, variant, asChild = false, ...props }, ref) => {
        const Component = asChild ? Slot : "button";
        return <Component ref={ref} className={cn(variants({ variant }), className)} {...props} />;
    }
);

Button.displayName = "Button";
