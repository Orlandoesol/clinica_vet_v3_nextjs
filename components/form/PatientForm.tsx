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

const Patientform = () => {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)//
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

    return (
    <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-white-100">
            <section className="mb-12 text-white-100 space-y-4">
            <h1 className="hader text-white-100">Hi there 👋</h1>
            <p className="text-white-100">Shedule your first appointment</p>
            </section>

            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
            />

            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            iconSrc="/assets/icons/email.svg"
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

    </FormProvider>
)
}

export default Patientform