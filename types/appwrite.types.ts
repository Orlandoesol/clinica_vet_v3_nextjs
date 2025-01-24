import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
    userId: string;
    name: string;
    email: string;
    phone: string;
    namePet: string;
    birthDate: Date;
    gender: Gender;
    breed: string;
    species: string;
    address: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhisician: string;
    insurancePolicyNumber:string;
    identificationType: FormData | undefined;
    identificationNumber: string | undefined;
    allergies: string | undefined;
    medicalHistory: string | undefined;
    currentMedication: string | undefined;
    treatmentConsent: boolean;
    dataProtectionpolicy: boolean;
}
