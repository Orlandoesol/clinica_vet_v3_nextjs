"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "../ui/form"
import CustomFormField, { FormFieldType } from "@/components/CustomFormField"
//import { Button } from "@/components/ui/button"
import SubmitButton from "@/components/SubmitButton"
import { useState, Dispatch, SetStateAction } from "react"
import { getAppointmentSchema } from "@/lib/validation"
import { Appointment } from "@/types/appwrite.types"
import { useRouter } from "next/navigation"
//import { createUser } from "@/lib/actions/patient.action"
import { DoctorsOptions } from "@/constants"
import { SelectItem } from "@/components/ui/select"
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.action"
import "react-datepicker/dist/react-datepicker.css"

export const AppointmentForm = ({
    userId,
    patientId,
    type = "create",
    appointment,
    setOpen,
}:{
    userId: string;
    patientId: string;
    type: "create" | "schedule" | "cancel";
    appointment?: Appointment;
    setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {

const router = useRouter();
const [ isLoading, setIsLoading] = useState(false);

const AppointmentFormValidation = getAppointmentSchema(type); 

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: appointment ? appointment?.primaryPhisician : "",
            schedule: appointment
                ? new Date(appointment?.schedule!)
                : new Date(Date.now()),
            reason: appointment ? appointment?.reason : "",
            notes: appointment?.note || "",
            cancellationReason: appointment?.cancellationReason || "",
        },
    });


    //const { handleSubmit, reset, control } = form;

    const onSubmit = async (
        values: z.infer<typeof AppointmentFormValidation>
    ) => {
        setIsLoading(true);

        let status;

        switch (type) {
            case "cancel":
                status = "Cancelled";
                break;
            case "schedule":
                status = "Scheduled";
                break;
            default:
                status = "Pending"
        }

        try {
            if(type === "create" && patientId) {
                const appointment = {
                    userId,
                    patient: patientId,
                    primaryPhisician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    status: status as Status,
                    notes: values.notes,
                };

                const newAppointment = await createAppointment(appointment);

                if(newAppointment) {
                    form.reset();
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
                    )
                }
                }else{
                    const appointmentToUpdate = {
                        userId,
                        appointmentId: appointment?.$id,
                        appointment: {
                            primaryPhysician: values.primaryPhysician,
                            schedule: new Date(values.schedule),
                            status: status as Status,
                            cancellationReason: values.cancellationReason,
                        },
                        type,
                    }

                    const updatedAppointment = await updateAppointment(appointmentToUpdate)

                    if (updatedAppointment) {
                        setOpen && setOpen(false)
                        form.reset()
                        }
                }
            } catch (error){
                console.error(error);
            }
            setIsLoading(false)
        }
            let buttonlabel;
            switch(type) {
                case "cancel":
                    buttonlabel = "Cancel Appointment";
                    break;
                case "schedule":
                    buttonlabel = "Schedule Appointment";
                    break;
                default:
                    buttonlabel = "Submit Appointment";
            }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-white-100">
                {  type !== "create" && (
                <section className="mb-12 text-white-100 space-y-4">
                <h1 className="header text-white-100">New Appoinment</h1>
                <p className="text-white-100">Request a new appointment in 10 seconds</p>
                </section>
                )}
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

                    <div 
                    className={`flex flex-col gap-6 ${type === "create" &&   "xl:flex-row"}`}
                    >
                        <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="reason"
                        label="Reason for appointment"
                        placeholder="Describe the reason for the appointment"
                        disabled={type === "schedule"}
                        />

                        <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="notes"
                        label="Notes"
                        placeholder="Enter notes"
                        disabled={type === "schedule"}
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
                    />
                )}

                <SubmitButton isLoading={isLoading}
                className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
                >
                {buttonlabel}
                </SubmitButton>
                
            </form>
        </Form>
    )
}

export default AppointmentForm