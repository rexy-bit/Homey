import { memo } from "react"
import FreeConsultation from "../Components/ServicesComponents/FreeConsultation";
import SalesService from "../Components/ServicesComponents/SalesService";
import PropertyPurchase from "../Components/ServicesComponents/PropertyPurchase";
import RentService from "../Components/ServicesComponents/RentService";
import RentalManagement from "../Components/ServicesComponents/RentalManagement";


const Services = () => {

    return(
        <section className="flex flex-col min-h-screen items-center w-full">
            
            <div style={{backgroundImage : "url('/houses2.jpg')"}} className="w-full h-[500px] bg-cover bg-center flex justify-center ">
              <div className="w-full bg-black/60 flex flex-col items-center">
                  <h1 className="text-white mt-15 font-bold text-[2.5em]">Our Services</h1>
                  <p className="mt-5 text-white text-[1.1em] font-bold w-[600px] text-center max-[650px]:w-[300px] max-[650px]:text-[1em]">Tailored solutions and exclusive benefits to bring your real estate vision to life with confidence.</p>
                  <p className="mt-5 text-white text-[1.1em] font-bold w-[600px] text-center max-[650px]:w-[300px] max-[650px]:text-[1em]">Your satisfaction is our priority: explore our services and benefit from our expertise.</p>
              </div>
            </div>

             <FreeConsultation/>

              <SalesService/>
             
               <PropertyPurchase/>
               <RentService/>
               <RentalManagement/>

        </section>
    )
}

export default memo(Services);