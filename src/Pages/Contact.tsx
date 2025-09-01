import { memo } from "react"
import ContactFree from "../Components/ContactComponents/ContactFree";
import FormComponent from "../Components/ContactComponents/FormComponent";
import Visite from "../Components/ContactComponents/Visite";



const Contact = () => {
    return(
        <section className="min-h-screen w-full flex flex-col items-center">
            <h1 className="text-center font-bold text-[#1D4ED8] text-[2.6em] mt-10">Contact Us</h1>
            <ContactFree/>
            <FormComponent/>
            <Visite/>
        </section>
    )
}

export default memo(Contact);