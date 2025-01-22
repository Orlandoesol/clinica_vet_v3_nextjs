'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField, { FormFieldType } from "@/components/CustomFormField"
import { Button } from "@/components/ui/button"
import SubmitButton from "@/components/SubmitButton"
import { useState } from "react"


const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters long',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address',
    }),
    phone: z.string().min(5, "Please enter a valid phone number"),
})

const Patientform = () => {

    const [isLoading, setIsLoading] = useState(false)//
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
        phone: "",
      },
    })


    const { handleSubmit, reset, control } = form;

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }

    return (
    <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <section className="mb-12 text-white-100 space-y-4">
            <h1 className="hader text-white">Hi there 👋</h1>
            <p className="text-white">Shedule your first appointment</p>
            </section>

            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name="username"
            label="Full Name"
            placeholder="Enter your full name"
            iconSrc="assets/icons/user.svg"
            iconAlt="user"
            />

            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            iconSrc="assets/icons/email.svg"
            iconAlt="user"
            />

            <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={control}
            name="phone"
            label="Phone Number"
            placeholder="Phone Number"
            />

            <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            <Button type="button" className="ml-2 bg-blue-900 text-white-100" onClick={() => reset()}>Reset</Button>
        </form>

    </Form>
)
}

export default Patientform