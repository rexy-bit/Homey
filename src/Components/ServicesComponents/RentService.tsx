import { memo } from "react"
import { useNavigate } from "react-router-dom";



const RentService = () => {

    const navigate = useNavigate();
     
    return(
                <section className="bg-[#1D4ED8] flex flex-col items-center w-full ">
            <h1 className="text-white font-black text-[2em] mt-10 max-[700px]:w-[300px] max-[700px]:text-center max-[700px]:text-[1.5em]">Tailored Rental Solutions</h1>

          <div className="flex flex-row items-center w-[1000px] mt-15 gap-10 max-[1050px]:w-[800px] max-[850px]:flex-col">
            <img src="/goodTerms.jpg" alt="" className="w-[500px] h-[300px] object-cover slideLeft max-[1050px]:w-[300px] max-[1050px]:h-[200px] rounded-lg"/>
            <p className="slideRight text-white font-bold text-[1.2em] max-[1050px]:text-[1em] max-[1050px]:font-[600] max-[850px]:w-[300px] max-[850px]:text-center">
Looking for the perfect place to rent? At Homey, we make finding your next home effortless. From modern apartments to spacious houses, our team provides exclusive rental opportunities tailored to your lifestyle and budget.
With personalized guidance and trusted support, we ensure every rental is smooth, secure, and stress-free. Because at Homey, renting is not just about a property, it’s about feeling at home.
            </p>

            </div>

            <button className="bg-white text-[#1D4ED8] px-3 py-2 font-bold rounded-lg mt-10 cursor-pointer transition-all duration-200 hover:opacity-70  active:scale-90 mb-15" onClick={()=> navigate("/contact")}>Contact Us for Rent Services</button>


        </section>
    )
}

export default memo(RentService);