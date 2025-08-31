import { memo } from "react";


const ContactFree = () => {

    return(
        <div className="flex flex-row w-[1000px] gap-10 items-center mt-10 max-[1050px]:w-[700px] max-[1050px]:justify-center max-[750px]:flex-col max-[750px]:w-[300px] max-[750px]:gap-5">
             <img src="/consulting.jpg" alt="" className="w-[600px] h-[300px] object-cover slideLeft max-[1050px]:w-[300px] max-[1050px]:h-[150px] rounded-lg"/>
             <div className="slideRight flex flex-col max-[750px]:items-center">

                <h1 className="font-bold text-[#1D4ED8] text-[1.6em] max-[1050px]:text-[1.4em]">For Free Consultations :</h1>
                <p className="text-gray-800 text-[1.1em] max-[1050px]:text-[1em] max-[1050px]:w-[300px] max-[750px]:text-center">
                    Looking for advice or ready to discuss your real estate project? Call us directly at +213 0123456789 to book your free consultation and start your journey with Homey.
                </p>

                
             </div>
        </div>
    );
}

export default memo(ContactFree);