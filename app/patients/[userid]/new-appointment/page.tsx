import Appointmentform from "@/components/form/Appointment.Form";
import { getPatient } from "@/lib/actions/patient.action";
import { SearchParams } from "next/dist/server/request/search-params";
import Image from "next/image";
//import Link from "next/link";

const NewAppointment= async ({params: {userId}}: SearchParams) => {
    const patient = await getPatient(userId);

    return (
        <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-w-[860px] flex-1 justify-between">
            <Image
                src="/assets/icons/logo.png"
                height={1000}
                width={1000}
                alt="Logo Principal"
                className="bm-12 h-24 w-fit"
            />

            <Appointmentform
            patientId={patient?.$id}
            type="create"
            userId={userId}
            />

            <div className="text-18-semibold text-white-100 mt-20 flex justify-between">
                <p className="justify-end text-white-100 xl:text-left">
                © 2025 Clinica Veterinaria
                </p>
            </div>
            </div>
        </section>

        <Image
            src="/assets/images/appointment-img.png"
            height={1000}
            width={1000}
            alt="appointment"
            className="side-img max-w-[390px] bg-bottom"
            />
        </div>
    )
}

export default NewAppointment;