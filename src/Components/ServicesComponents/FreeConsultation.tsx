import  { memo } from "react"
import { useNavigate } from "react-router-dom";


const FreeConsultation = () => {

    const navigate = useNavigate();

    return(
        
            <section className="flex flex-col items-center w-full">
                <h1 className="text-[#1D4ED8] font-bold text-[2em] mt-10 underline max-[700px]:w-[300px] max-[700px]:text-center max-[700px]:text-[1.5em]">Free Consultations & Property Visits</h1>

                <p className="w-[600px] text-center mt-5 text-[17px] text-gray-800 max-[650px]:w-[300px]">
                    We offer free real estate consultations to help you make the right decision, whether you are buying, selling, or renting. Our experts provide professional advice tailored to your needs.
Additionally, we organize free property visits, so you can explore homes, apartments, or offices before making a commitment.
                </p>

                <div className="flex flex-row justify-center items-center w-[1000px] gap-20 mt-10 max-[1050px]:w-[600px] max-[700px]:flex-col max-[1050px]:gap-10 slideLeft">
                    <div className="flex flex-col max-[1050px]:items-center max-[1050px]:w-[300px] max-[1050px]:text-center">
                        <p className="text-[1.7em] text-[#1D4ED8] leading-9 font-[600] max-[1050px]:text-[1.5em] max-[1050px]:leading-6">Get expert advice before making a decision.</p>
                        <p className="text-[1.2em] mt-5 text-gray-800 max-[1050px]:text-[1em] max-[1050px]:mt-2">
                     Our free consultations are designed to answer your questions, understand your needs, and guide you toward the right property without any commitment. 
                        </p>
                    </div>
                    
                    <img src="/consultation.avif" className="w-[500px] h-[300px] object-cover max-[1050px]:w-[300px] max-[1050px]:h-[200px]" />
                   
                </div>

                <div className="flex flex-row justify-center items-center w-[1000px] gap-20 mt-15 max-[1050px]:w-[600px] max-[700px]:flex-col max-[1050px]:gap-10 slideRight">
                 
                  
                    <img src="/visits.avif" className="w-[500px] h-[300px] object-cover max-[1050px]:w-[300px] max-[1050px]:h-[200px]" />
                 
                       <div className="flex flex-col max-[1050px]:items-center max-[1050px]:w-[300px] max-[1050px]:text-center">
                        <p className="text-[1.7em] text-[#1D4ED8] leading-9 font-[600] max-[1050px]:text-[1.5em] max-[1050px]:leading-6">Experience the property before you decide.</p>
                        <p className="text-[1.2em] mt-5 text-gray-800 max-[1050px]:text-[1em] max-[1050px]:mt-2">
                         Our free visits allow you to explore every detail, feel the space, and make sure it’s the right fit for your future home.
                        </p>
                    </div>
                </div>

                <button className="text-white bg-[#1D4ED8] px-3 py-2 font-bold rounded-lg mt-10 cursor-pointer transition-all duration-200 hover:text-[#1D4ED8] hover:bg-white hover:border hover:border-[#1D4ED8] active:scale-90 mb-15" onClick={()=> navigate("/contact")}>Contact Us for a free consultation</button>
            </section>
    )
}

export default memo(FreeConsultation);