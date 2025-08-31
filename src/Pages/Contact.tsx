import { memo } from "react"
import ContactFree from "../Components/ContactComponents/ContactFree";



const Contact = () => {
    return(
        <section className="min-h-screen w-full flex flex-col items-center">
            <h1 className="text-center font-bold text-[#1D4ED8] text-[2.4em] mt-10">Contact Us</h1>
            <ContactFree/>
        </section>
    )
}

export default memo(Contact);