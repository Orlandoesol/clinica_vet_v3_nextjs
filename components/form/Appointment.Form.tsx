"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
//import { Form } from "@/components/ui/form"
import CustomFormField, { FormFieldType } from "@/components/CustomFormField"
import { Button } from "@/components/ui/button"
import SubmitButton from "@/components/SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"
import { DoctorsOptions } from "@/constants"
import { SelectItem } from "@/components/ui/select"

const Appoinmentform = ({
    userId, patientId, type
}: {
    userId: string,
    patientId: string,
    type: "create" | "cancel" | "schedule",
}) => {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
      resolver: zodResolver(UserFormValidation),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
      },
    })


    const { handleSubmit, reset, control } = form;

    async function onSubmit(values: z.infer<typeof UserFormValidation>) {
      setIsLoading(true);

      try {
        const userData = { name: values.name, email: values.email, phone: values.phone };

        const user = await createUser(userData);

        if(user) router.push(`/patients/${user.$id}/register`)
            

        } catch (error){
            console.error(error);
        }
        
    }

    let buttonLabel;

    switch (type) {
        case "create":
            buttonLabel = "Create Appointment";
            break;
        case "cancel":
            buttonLabel = "Cancel Appointment";
            break;
        case "schedule":
            buttonLabel = "Schedule Appointment";
            break;
        default:
            break;
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-white-100">
                <section className="mb-12 text-white-100 space-y-4">
                <h1 className="header text-white-100">New Appoinment</h1>
                <p className="text-white-100">Request a new appointment in 10 seconds</p>
                </section>

                {type !== "cancel" && (
                    <>
                    <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="primaryPhysician"
                    label="Primary Physician"
                    placeholder="Select a physician">
                    {DoctorsOptions.map((option, i) => (
                        <SelectItem 
                            key={i} 
                            value={option}>
                                {option}
                        </SelectItem> 
                    ))}                    
                    </CustomFormField>

                    <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="schedule"
                        label="Expected appointment date"
                        showTimeSelect
                        dateFormat="MM/dd/yyy - h:mm aa"
                        iconSrc="/assets/icons/calendar.svg"
                    />

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="reason"
                        label="Reason for appointment"
                        placeholder="Describe the reason for the appointment"
                        />

                        <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="notes"
                        label="Notes"
                        placeholder="Enter notes"
                        />
                        
                    </div> 
                    </>
                )}

                {type === "cancel" && (
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="Enter reason for cancellation"
                    >
                    </CustomFormField>
                )}

                <SubmitButton isLoading={isLoading}
                className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
                >{buttonLabel}
                </SubmitButton>
                <Button type="button" className="ml-2 bg-blue-900 text-white-100" onClick={() => reset()}>Reset</Button>
            </form>
        </FormProvider>
    )
}

export default Appoinmentform