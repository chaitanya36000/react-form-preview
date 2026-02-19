
import React from "react";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import {
    Monitor,
    Smartphone,
    Tablet,
    Layout,
    Upload
} from "lucide-react";
import { cn } from "./lib/utils";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./components/ui/select";
import { useAutoScroll } from "./hooks/useAutoScroll";

export interface FormClasses {
    formContainer?: string;
    fieldContainer?: string;
    labelContainer?: string;
    label?: string;
    requiredAsterisk?: string;
    requiredBadge?: string;
    helpText?: string;
    heading?: string;
    paragraph?: string;
    input?: string;
    textarea?: string;
    selectTrigger?: string;
    checkboxContainer?: string;
    checkboxItem?: string;
    checkbox?: string;
    checkboxLabel?: string;
    radioContainer?: string;
    radioItem?: string;
    radioCircleOuter?: string;
    radioCircleInner?: string;
    radioLabel?: string;
    fileUploadContainer?: string;
    fileUploadLabel?: string;
    fileUploadIconWrapper?: string;
    fileUploadIcon?: string;
    fileUploadTextPrimary?: string;
    fileUploadTextSecondary?: string;
    submitButtonContainer?: string;
    submitButton?: string;
    submitDisclaimer?: string;
    emptyStateContainer?: string;
    emptyStateText?: string;
}

interface RenderFormProps {
    fields: any[];
    classes?: FormClasses;
}

export const RenderForm: React.FC<RenderFormProps> = ({ fields, classes = {} }) => {
    const [formValues, setFormValues] = React.useState<Record<string, any>>({});

    const handleValueChange = (fieldId: string, value: any) => {
        setFormValues(prev => ({ ...prev, [fieldId]: value }));
    };

    const handleCheckboxToggle = (fieldId: string, optionId: string) => {
        const currentValues = formValues[fieldId] || [];
        const newValues = currentValues.includes(optionId)
            ? currentValues.filter((v: string) => v !== optionId)
            : [...currentValues, optionId];
        handleValueChange(fieldId, newValues);
    };

    const renderElement = (field: any) => {
        switch (field.type) {
            case "heading":
                return <h2 className={cn("text-xl font-bold text-gray-900 mb-2", classes.heading)}>{field.content}</h2>;
            case "paragraph":
                return <p className={cn("text-sm text-gray-600 leading-relaxed mb-4", classes.paragraph)}>{field.content}</p>;
            case "text":
            case "email":
            case "number":
                return (
                    <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        value={formValues[field.id] || ""}
                        onChange={(e) => handleValueChange(field.id, e.target.value)}
                        className={cn("bg-gray-50/50 border-gray-200 h-12 focus:ring-2 focus:ring-purple-100 transition-all rounded-lg", classes.input)}
                    />
                );
            case "textarea":
                return (
                    <Textarea
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        value={formValues[field.id] || ""}
                        onChange={(e) => handleValueChange(field.id, e.target.value)}
                        className={cn("bg-gray-50/50 border-gray-200 min-h-[120px] focus:ring-2 focus:ring-purple-100 transition-all rounded-lg", classes.textarea)}
                    />
                );
            case "dropdown":
                return (
                    <Select
                        disabled={field.disabled}
                        value={formValues[field.id] || ""}
                        onValueChange={(val: any) => handleValueChange(field.id, val)}
                    >
                        <SelectTrigger className={cn("bg-gray-50/50 border-gray-200 h-12 focus:ring-2 focus:ring-purple-100 transition-all rounded-lg text-left", classes.selectTrigger)}>
                            <SelectValue placeholder={field.placeholder || "Select an option"} />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map((opt: any) => (
                                <SelectItem key={opt.id} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case "checkbox":
                return (
                    <div className={cn("space-y-3", classes.checkboxContainer)}>
                        {field.options?.map((opt: any) => (
                            <div key={opt.id} className={cn("flex items-center space-x-3", classes.checkboxItem)}>
                                <Checkbox
                                    id={`preview-${opt.id}`}
                                    disabled={field.disabled}
                                    checked={(formValues[field.id] || []).includes(opt.id)}
                                    onCheckedChange={() => handleCheckboxToggle(field.id, opt.id)}
                                    className={cn("h-5 w-5 rounded border-gray-300", classes.checkbox)}
                                />
                                <Label htmlFor={`preview-${opt.id}`} className={cn("text-sm font-medium leading-none cursor-pointer", classes.checkboxLabel)}>
                                    {opt.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                );
            case "radio":
                return (
                    <div className={cn("space-y-3", classes.radioContainer)}>
                        {field.options?.map((opt: any) => {
                            const isSelected = formValues[field.id] === opt.id;
                            return (
                                <div
                                    key={opt.id}
                                    className={cn("flex items-center space-x-3 cursor-pointer group", classes.radioItem)}
                                    onClick={() => !field.disabled && handleValueChange(field.id, opt.id)}
                                >
                                    <div className={cn(
                                        "h-5 w-5 rounded-full border ring-offset-background transition-all flex items-center justify-center",
                                        isSelected ? "border-purple-600 bg-white" : "border-gray-300",
                                        field.disabled ? "opacity-50 cursor-not-allowed" : "group-hover:border-purple-400",
                                        classes.radioCircleOuter
                                    )}>
                                        <div className={cn(
                                            "h-2.5 w-2.5 rounded-full bg-purple-600 transition-transform",
                                            isSelected ? "scale-100" : "scale-0",
                                            classes.radioCircleInner
                                        )} />
                                    </div>
                                    <Label className={cn(
                                        "text-sm font-medium leading-none cursor-pointer",
                                        field.disabled && "opacity-50 cursor-not-allowed",
                                        classes.radioLabel
                                    )}>
                                        {opt.label}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                );
            case "file":
                return (
                    <div className={cn("flex items-center justify-center w-full", classes.fileUploadContainer)}>
                        <label className={cn("flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-purple-200 transition-all group", classes.fileUploadLabel)}>
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className={cn("p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform", classes.fileUploadIconWrapper)}>
                                    <Upload className={cn("w-6 h-6 text-purple-600", classes.fileUploadIcon)} />
                                </div>
                                <p className={cn("mb-2 text-sm text-gray-700 font-semibold", classes.fileUploadTextPrimary)}>Choose file or drag here</p>
                                <p className={cn("text-xs text-gray-400", classes.fileUploadTextSecondary)}>PDF, PNG, JPG (max 10MB)</p>
                            </div>
                        </label>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={classes.formContainer}>
            <div className="space-y-8">
                {fields.length === 0 ? (
                    <div className={cn("text-center py-20 text-gray-400", classes.emptyStateContainer)}>
                        <p className={cn("text-sm italic", classes.emptyStateText)}>The form is currently empty.</p>
                    </div>
                ) : (
                    fields.map((field: any) => (
                        <div key={field.id} className={cn("space-y-3", classes.fieldContainer)}>
                            {field.type !== "heading" && field.type !== "paragraph" && (
                                <div className={cn("flex justify-between items-baseline", classes.labelContainer)}>
                                    <Label className={cn("text-[13px] font-bold text-gray-800 tracking-tight", classes.label)}>
                                        {field.label}
                                        {field.required && <span className={cn("text-red-500 ml-1 font-bold text-base leading-none", classes.requiredAsterisk)}>*</span>}
                                    </Label>
                                    {field.required && (
                                        <span className={cn("text-[9px] font-extrabold text-red-400 bg-red-50 px-2.5 py-1 rounded-full uppercase tracking-widest border border-red-100/50", classes.requiredBadge)}>Required</span>
                                    )}
                                </div>
                            )}

                            {renderElement(field)}

                            {field.helpText && (
                                <p className={cn("text-[11px] text-gray-400 italic font-medium pl-1", classes.helpText)}>
                                    {field.helpText}
                                </p>
                            )}
                        </div>
                    ))
                )}
            </div>

            {fields.length > 0 && (
                <div className={cn("mt-12 pt-8 border-t border-gray-100 flex flex-col gap-4", classes.submitButtonContainer)}>
                    <Button className={cn("w-full bg-purple-600 hover:bg-purple-700 h-14 text-base font-bold rounded-xl shadow-lg shadow-purple-100 transition-all active:scale-[0.98]", classes.submitButton)}>
                        Submit Order
                    </Button>
                    <p className={cn("text-[10px] text-center text-gray-400 font-medium", classes.submitDisclaimer)}>
                        By submitting, you agree to the custom order terms and conditions.
                    </p>
                </div>
            )}
        </div>
    );
};

interface PurePreviewProps {
    fields: any[];
}
export const PurePreview: React.FC<PurePreviewProps> = ({ fields }) => {
    const [device, setDevice] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
    const { scrollContainerRef, handleAutoScroll, stopScrolling } = useAutoScroll();

    return (
        <div
            ref={scrollContainerRef}
            className="flex-1 bg-gray-100 flex flex-col items-center p-8 overflow-y-auto w-full"
            onMouseMove={(e) => handleAutoScroll(e.clientY)}
            onMouseLeave={stopScrolling}
        >
            {/* Device Toggle */}
            <div className="flex bg-white rounded-full shadow-sm p-1 gap-1 mb-10 border border-gray-200">
                <button
                    onClick={() => setDevice("desktop")}
                    className={cn(
                        "p-2 rounded-full transition-all",
                        device === "desktop" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <Monitor className="h-4 w-4" />
                </button>
                <button
                    onClick={() => setDevice("tablet")}
                    className={cn(
                        "p-2 rounded-full transition-all",
                        device === "tablet" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <Tablet className="h-4 w-4" />
                </button>
                <button
                    onClick={() => setDevice("mobile")}
                    className={cn(
                        "p-2 rounded-full transition-all",
                        device === "mobile" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <Smartphone className="h-4 w-4" />
                </button>
            </div>

            <div
                className={cn(
                    "bg-white shadow-2xl transition-all duration-300 min-h-[600px] h-fit flex flex-col shrink-0 mb-12",
                    device === "desktop" ? "w-full max-w-4xl rounded-xl" :
                        device === "tablet" ? "w-[600px] max-w-full rounded-2xl" :
                            "w-[375px] max-w-full rounded-[40px] border-[8px] border-gray-900"
                )}
            >
                <div className={cn(
                    "p-8 sm:p-12 flex-1",
                    device === "mobile" && "px-6 pt-12 pb-20"
                )}>
                    <div className="flex items-center gap-3 mb-10 border-b border-gray-100 pb-6">
                        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                            <Layout className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Custom Form Preview</h2>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-0.5">Live Preview Application</p>
                        </div>
                    </div>

                    <RenderForm fields={fields} />
                </div>
            </div>

            <div className="mt-8 text-gray-400 text-xs font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                This is a simulated preview of your live form.
            </div>
        </div>
    );
};
