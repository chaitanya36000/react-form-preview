import * as React from "react"
import { cn } from "../../lib/utils"

export interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, onCheckedChange, checked, ...props }, ref) => {
        return (
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onCheckedChange?.(e.target.checked)}
                className={cn(
                    "h-4 w-4 shrink-0 rounded-sm border border-gray-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
