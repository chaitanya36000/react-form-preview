import * as React from "react"
import { cn } from "../../lib/utils"

const Select = ({ children, value, onValueChange, disabled }: any) => {
    return React.cloneElement(children as React.ReactElement<any>, { value, onValueChange, disabled })
}

const SelectTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }: any, ref) => (
    <button
        ref={ref}
        className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        {...props}
        onClick={(e) => {
            // Implementation of custom dropdown logic would go here
            // For simplicity in this package, we might use a native select if it needs to be very portable
            // but let's stick to a UI-only version for now that can be extended.
        }}
    >
        {children}
    </button>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder, value }: any) => {
    return <span>{value || placeholder}</span>
}

const SelectContent = ({ children }: any) => {
    return <div className="hidden">{children}</div> // Simplified
}

const SelectItem = ({ value, children }: any) => {
    return <div data-value={value}>{children}</div>
}

export {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
}
