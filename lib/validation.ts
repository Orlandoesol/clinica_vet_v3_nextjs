import { z } from "zod";

export const UserFormValidation = z.object({
    name: z.string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be less than 100 characters long"),
    email: z.string()
    .refine((email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email), "Please enter a valid email address" ),
    phone: z.string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
})

export const PatientFormValidation = z.object({
    name: z.string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be less than 100 characters long"),
    namePet: z.string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Owner name must be less than 50 characters long"),
    email: z.string()
    .refine((email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email), "Please enter a valid email address" ),
    phone: z.string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    birthDate: z.coerce.date(),
    gender: z.enum(["Male" , "Female"]),
    breed: z.enum(["labrador", "bulldog", "poodle", "beagle", "Siamese" , "Persian"
    , "Maine Coon" , "Bengal"]),
    species: z.enum(["dog", "cat", "rabbit", "hamster"]),
    address: z.string()
    .min(5, "Addres must be at least 5 characters long")
    .max(500, "Address must be less than 500 characters long"),
    emergencyContactName: z.string()
    .min(2, "Contact must be at least 2 characters long")
    .max(100, "Contact must be less than 100 characters long"),
    emergencyContactPhone:z.string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    primaryPhisician: z.string()
    .min(2, "Contact must be at least 2 characters long")
    .max(100, "Contact must be less than 100 characters long"),
    insurancePolicyNumber:z.string()
    .min(2, "Contact must be at least 2 characters long")
    .max(50, "Contact must be less than 100 characters long"),
    identificationType: z.enum(["passport", "NUIP", "CC", "CE"]),
    identificationNumber: z.string()
    .min(2, "Contact must be at least 2 characters long")
    .max(20, "Contact must be less than 20 characters long"),
    appointment: z.date(),
    allergies: z.string().optional(),
    medicalHistory: z.string(),
    currentMedication: z.string(),
    treatmentConsent: z.boolean().default(false).refine(value => value === true, {
        message: "You must accept the treatment consent"
    }),
    dataProtectionpolicy: z.boolean().default(false).refine(value => value === true, {
        message: "You must accept the Data Protection Policy"
    }),
})