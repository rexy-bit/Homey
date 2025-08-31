import { memo } from "react"
import { useNavigate } from "react-router-dom";


const PropertyPurchase = () => {

    const navigate = useNavigate();

    return(

        <section className=" flex flex-col items-center w-full">
            
             <h1 className="text-[#1D4ED8] font-bold text-[2em] mt-10 underline max-[700px]:w-[300px] max-[700px]:text-center max-[700px]:text-[1.5em]">Property Purchase Excellence</h1>

             <div className="flex flex-row items-center w-[1000px] mt-15 gap-10 max-[1050px]:w-[800px] max-[850px]:flex-col">
                <p className="slideLeft text-[#1D4ED8] font-bold text-[1.2em] max-[1050px]:text-[1em] max-[1050px]:font-[600] max-[850px]:w-[300px] max-[850px]:text-center">
                    Looking for your dream home or a smart investment? At Homey, we simplify the buying process and guide you every step of the way. Our dedicated experts provide you with exclusive listings, personalized advice, and premium support to ensure you find the property that perfectly matches your needs.
                    With Homey, property acquisition becomes more than just a transaction it becomes a smooth, secure, and rewarding experience.
                </p>

                <img src="/buyHouse.jpg" alt="" className="w-[500px] h-[300px] object-cover slideRight max-[1050px]:w-[300px] max-[1050px]:h-[200px] rounded-lg"/>
             </div>

                <button className="text-white bg-[#1D4ED8] px-3 py-2 font-bold rounded-lg mt-10 cursor-pointer transition-all duration-200 hover:text-[#1D4ED8] hover:bg-white hover:border hover:border-[#1D4ED8] active:scale-90 mb-15" onClick={()=> navigate("/contact")}>Contact Us for Purchasing a property</button>
        </section>
    )
}

export default memo(PropertyPurchase);