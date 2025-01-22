'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from "libphonenumber-js/core";

export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton"
}

interface FormData {
    name: string,
    email: string,
    phone: string,
}

interface CustomProps {
    control: Control<FormData>,
    fieldType: FormFieldType, //primero definirlo en PatientForm
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: FormData) => React.ReactNode;

}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {

    const { fieldType, iconSrc, iconAlt, placeholder, renderSkeleton } = props

    if (fieldType === FormFieldType.SKELETON && renderSkeleton) {
        return renderSkeleton(field);
    }

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border bg-white-100 border-dark-400 bg-white">
                    {iconSrc && (
                        <Image
                        src={iconSrc}
                        height={24}
                        width={24}
                        alt={iconAlt || "icon"}
                        className="ml-2 "
                        />
                    )}
                    <FormControl>
                        <Input 
                        placeholder={placeholder}
                        {...field}
                        className="bg-white border-0 text-dark-200"
                        />
                    </FormControl>

                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                <PhoneInput 
                defaultCountry="CO"
                placeholder={placeholder}
                internacional
                withCountryCallingCode
                value={field.value as E164Number | undefined }
                onChange={field.onChange}
                className="input-phone"
                
                />
                </FormControl>
            )
        default:
            break;
        }
}

const CustomFormField = ( props: CustomProps) => {
    const { control, fieldType, name, label } = props;
    return (
        <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className="flex-1">
                {fieldType !== FormFieldType.CHECKBOX && label && (
                <FormLabel>{label}</FormLabel>
                )}

                <RenderField field={field} props={props} />

                <FormMessage className="shad-console" />
                
                <FormMessage className="shad-error" />
            </FormItem>
            )}
        />
    )
}

export default CustomFormField