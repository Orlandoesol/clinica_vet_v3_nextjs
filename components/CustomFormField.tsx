'use client'

import {
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Control } from "react-hook-form"

export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phone_input",
    CHECKBOX = "checkbox",
    DATA_PICKER = "date_picker",
    SELECT = "select", 
    SKELETON = "skeleton"
}

interface FormData {
    name: string,
    phone: string,
}


interface CustomProps {
    control: Control<FormData>,
    fieldType: FormFieldType,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    dateFormat?: string,
    disabled?: boolean,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field:any) => React.ReactNode,
}

