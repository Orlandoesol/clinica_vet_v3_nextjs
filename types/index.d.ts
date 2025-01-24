declare type searchParamProps = {
    params: { [key: string]: string };
    searchParam: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female"

declare interface createUserParams {
    name: string;
    email: string;
    phone: string;
}

declare interface User extends createUserParams {
    $id: string;
}

declare interface RegisterUserParams extends createUserParams {
    namePet: string;
    birthDate: Date;
    gender: Gender;
    breed: string;
    species: string;
    address: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    primaryPhisician: string;
    insurancePolicyNumber: string;
    identificationType: FormData | undefined;
    idenityficationNumber: string | undefined;
    allergies: string | undefined;
    medicalHistory: string | undefined;
    currentMedication: string | undefined;
    treatmentConsent: boolean;
    dataProtectionPolicy: boolean;
}


