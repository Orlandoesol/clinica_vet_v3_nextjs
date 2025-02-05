import Registerform from "@/components/form/Register.Form";
import { getUser } from "@/lib/actions/patient.action";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";


const Register = async ({params: {userId}}: SearchParamProps) => {

    const user = await getUser(userId)

    return(
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

                <Registerform user={user}/>

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
                src="/assets/image/register-img.png"
                height={1000}
                width={1000}
                alt="register"
                className="side-img max-w-[390px]"
                />
        </div>
    )
}

export default Register;