import { Appointment } from "./appwrite.types";

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParam: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female"


declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
}

declare interface User extends CreateUserParams {
    $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
    namePet: string;
    birthDate: date;
    gender: Gender;
    breed: string;
    species: string;
    address: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    insurancePolicyNumber:string;
    identificationType: FormData | undefined;
    identificationNumber: string | undefined;
    allergies: string | undefined;
    medicalHistory: string | undefined;
    currentMedication: string | undefined;
    treatmentConsent: boolean;
    dataProtectionpolicy: boolean;
}

declare type CreateAppointmentParams = {
    userId: string;
    patient: string;
    primaryPhysician: string;
    reason: string;
    schedule; Date;
    status: Status;
    notes: string | undefined;
}

declare type UpdateAppointmentParams = {
    appointment: string;
    userId: string;
    timeZone: string;
    appointmentId: Appointment;
    type: string;
}