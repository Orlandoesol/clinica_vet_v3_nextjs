
import Patientform from "@/components/form/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
        <Image
          src="/assets/icons/logo.png"
          height={1000}
          width={1000}
          alt="Logo Principal"
          className="bm-12 h-24 w-fit"
        />

        <Patientform />

        <div className="text-18-semibold text-white-100 mt-20 flex justify-between">
        <p className="justify-end text-white-100 xl:text-left">
          © 2025 Clinica Veterinaria
        </p>
        <Link href="/?admin=true" className="text-32-semibold text-white-100">
          Admin
        </Link>
          
        </div>
        </div>

      </section>

      <Image
          src="/assets/image/vet_dog_cat.png"
          height={1000}
          width={1000}
          alt="portada"
          className="side-img max-w-[50%]"
        />
    </div>
  )
}

