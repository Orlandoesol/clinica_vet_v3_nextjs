'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"



const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters long',
    }),
})

const Patientform = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
      },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }

    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <section className="mb-12 space-y-4">
            <h1 className="hader text-white">Hi there 👋</h1>
            <p className="text-white">Shedule your first appointment</p>
            </section>

        </form>

    </Form>
)
}

export default Patientform