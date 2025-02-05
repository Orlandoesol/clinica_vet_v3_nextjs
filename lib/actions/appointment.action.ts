"use server"

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite"

import { Appointment } from "@/types/appwrite.types"

import {
    APPOINTMENT_COLLECTION_ID,
    DATABASE_ID,
    databases,
    messaging,
} from "../appwrite.config"
import { parseStringify } from "../utils";
import { CreateAppointmentParams, UpdateAppointmentParams } from "@/types";


//Create appointment
export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment
        )
        revalidatePath('/admnin')
        return parseStringify(newAppointment)
    }catch (error) {
        console.error("An error occurred while creating a new appointment: " , error)
    }
}

//Get appointment
export const getRecentAppointmentList = async () => {
    try {

        const appointmentList = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc("$createdAt")]
        )

        const initialCounts = {
            scheduledCount : 0,
            pendingCount : 0,
            cancellCount : 0,
        }

        const counts = (appointmentList.documents as Appointment[]).reduce(
            (acc, appointment) => {
                switch (appointment.status) {
                    case "scheduled":
                        acc.scheduledCount++;
                        break;
                    case "pending":
                        acc.pendingCount++;
                        break;
                    case "cacelled":
                        acc.cancellCount++;
                        break;
                }
                return acc;
            },
            initialCounts
        )
        const data = {
            totalCount: appointmentList.total,
            ...counts,
            documents: appointmentList.documents,
        }
    
        return parseStringify(data)

    } catch (error) {
        console.error("An error occurred while retrievieng the recent appointment: " , error)
    }
}

//send message
export const sendsSMSNotification = async (userId: string, content: string) => {
    try {
        const message = await messaging.createSms(
            ID.unique(),
            content,
            [],
            [userId]
        )
        return parseStringify(message)
    } catch (error){
        console.error("An error ocuured while sendig sms", error)
    }
}

//Update appointment
export const updateAppointment = async ({
    appointment,
    userId,
    appointmentId,
    type,
}: UpdateAppointmentParams) => {
        try {
            const updateAppointment = await databases.updateDocument(
                DATABASE_ID!,
                APPOINTMENT_COLLECTION_ID!,
                appointment,
                appointmentId
            )

            if(!updateAppointment) throw Error;

            const smsMessage = `You have successfully scheduled the appointment. ${type === "schedule" }`
                await sendsSMSNotification(userId, smsMessage);

                revalidatePath('/admnin')
                return parseStringify(updateAppointment)
                
        } catch (error){
            console.error("An error occurred while scheduling an appointment: " , error)
        }
    }


//Get appointment
export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId
        )
        return parseStringify(appointment)
    }catch (error) {
        console.error("An error ocurred while retrievieng the existing patient: ", error)
    }
}//cierre de getapontment