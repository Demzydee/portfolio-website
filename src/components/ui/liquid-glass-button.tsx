import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const liquidButtonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-[0.14em] uppercase text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-white/6 text-white/95 shadow-[0_0_20px_rgba(255,255,255,0.08)] backdrop-blur-md border border-white/15 hover:bg-white/10 active:scale-[0.98]",
        primary:
          "bg-white/8 text-white/95 shadow-[0_0_20px_rgba(255,255,255,0.08)] backdrop-blur-md border border-white/15 hover:bg-white/12 active:scale-[0.98]",
        ghost: "bg-transparent text-white/85 border border-white/10 hover:bg-white/5",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 py-2 text-[10px]",
        lg: "h-12 px-8 py-3 text-sm",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  asChild?: boolean
}

const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(
          liquidButtonVariants({ variant, size, className }),
          "relative overflow-hidden before:absolute before:inset-[1px] before:rounded-full before:bg-[linear-gradient(180deg,rgba(255,255,255,0.20),rgba(255,255,255,0.04))] before:opacity-90 before:content-[''] before:backdrop-blur-[2px]",
          "after:absolute after:inset-0 after:rounded-full after:border after:border-white/10 after:content-['']"
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      </Comp>
    )
  }
)
LiquidButton.displayName = "LiquidButton"

export { LiquidButton, liquidButtonVariants }
