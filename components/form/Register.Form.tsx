"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField, { FormFieldType } from "@/components/CustomFormField"
import { Button } from "@/components/ui/button"
import SubmitButton from "@/components/SubmitButton"
import * as React from "react"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BreedOptions, GenderOptions, SpeciesOptions } from "@/constants"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  


const Registerform = ({ user }: {user: User}) => {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)//
    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
            defaultValues: {
                name: "",
                email: "",
                phone: "",
                namePet: "",
                birthDate: "",
                gender: "",
                breed: "",
                species: "",
                address: "",
                emergencyContactName: "",
                emergencyContactNumber: "",
                primaryPhisician: "",
                insurancePolicyNumber: "",
                identificationType: "",
                identificationNumber: "",
                allergies: "",
                medicalHistory: "",
                currentMedication: "",
                treatmentConsent: "",
                dataProtectionpolicy: ""
            },
    })


    const { handleSubmit, reset, control } = form;

    async function onSubmit(values: z.infer<typeof UserFormValidation>) {
        setIsLoading(true);

        try {
            const patient = { 
                userId: user.$id,
                name: values.name,
                email: values.email,
                phone: values.phone,
                namePet: values.namePet,
                birthDate: values.birthDate,
                gender: values.gender,
                breed: values.breed,
                species: values.species,
                address: values.address,
                emergencyContactName: values.emergencyContactName,
                emergencyContactNumber: values.emergencyContactNumber,
                primaryPhisician: values.primaryPhisician,
                insurancePolicyNumber: values.insurancePolicyNumber,
                identificationType: values.identificationType,
                identificationNumber: values.identificationNumber
                ? FormData
                : undefined,
                allergies: values.allergies,
                medicalHistory: values.medicalHistory,
                currentMedication: values.currentMedication,
                treatmentConsent: values.treatmentConsent,
                dataProtectionpolicy: values.dataProtectionpolicy
            };

        const newPatient = await createUser(patient);

        if(newPatient) router.push(`/patients/${user.$id}/register`)

        } catch (error){
            console.error(error);
        }
    }

    return (
    <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-white-100">

            <section className="mb-12 text-white-100 space-y-4">
                <h1 className="header text-white-100">Welcome 👋</h1>
                <p className="text-white-100">Let us know more about yourself</p>
            </section>

            <section className="mb-12 text-white-100 space-y-6">
                <div className="mb-9 space-y-1">
                    <h2 className="sub-header">Personal Information.</h2>
                </div>
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
                name="namePet"
                label="Name Pet"
                placeholder="Name Pet"
                iconSrc=""
                iconAlt="user"
            />  

            <div className="flex flex-col gap-6 xl:flex-row">
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
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={form.control}
                    name="birthDate"
                    label="Date of Birthdate"
                    iconSrc="/assets/icons/calendar.svg"
                />

                <CustomFormField
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="gender"
                    label="Gener"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <RadioGroup 
                                className="flex h-11 gap-6 xl:justify-between text-dark-200"
                                onValueChange={field.onChange}
                                defaultValue={field.value}>
                                    {GenderOptions.map((option, i) => (
                                        <div 
                                            key={option + i} 
                                            className="radio-group">
                                                <RadioGroupItem 
                                                value={option} 
                                                id={option}/>
                                                <Label 
                                                    className="cursor-pointer" 
                                                >
                                                {option}   
                                                </Label> 
                                        </div>
                                    ))}
                            </RadioGroup>
                        </FormControl>
                    )}
                />
            </div>
            
            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="breed"
                    label="Breed"
                    placeholder="Select a breed">
                    {BreedOptions.map((option, i) => (
                        <SelectItem 
                            key={i} 
                            value={option}>
                                {option}
                        </SelectItem> 
                    ))}                    
                </CustomFormField>

                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="species"
                    label="Species"
                    placeholder="Select a specie">
                    {SpeciesOptions.map((option, i) => (
                        <SelectItem 
                            key={i} 
                            value={option}>
                                {option}
                        </SelectItem> 
                    ))}                    
                </CustomFormField>
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="medicalHistory"
                placeholder="Medical History"
                />

                <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="allergies"
                placeholder="Pollen, Penicilin, etc"
                />
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
                <section className="space-y-6">
                    <div className="mb-9 space-y">
                        <h2 className="sub-header">Consent and Privacy</h2>
                    </div>

                    <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="treatmentConsent"
                    label="I consent to receive treatment for my health condition"
                    />

                    <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="dataProtectionpolicy"
                    label="I acknowledge that I have reviewed and agree to the privacy policy"
                    />                   
                </section>

                
            </div>


            <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
            <Button type="button" className="ml-2 bg-blue-900 text-white-100" onClick={() => reset()}>Reset</Button>
        </form>

    </Form>
)
}

export default Registerform