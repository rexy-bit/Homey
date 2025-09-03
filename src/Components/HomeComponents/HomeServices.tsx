import { memo } from "react";
import ServiceComponent, { type Service } from "./ServiceComponent"
import services from "./services"
import { useNavigate } from "react-router-dom";



const HomeServices = () => {

    const navigate = useNavigate();

    return(
        <section className="flex flex-col w-full bg-[#1D4ED8] items-center">

            <h1 className="text-white text-[2.5em] text-center font-black mt-10">Services</h1>

            <div className="px-10 flex flex-wrap gap-10 justify-center items-center mb-10 mt-10">
                {services.map((s : Service)=>{
                    return(
                        <ServiceComponent service={s} key={s.name}/>
                    );
                })}
            </div>

            <button className="px-3 py-2 bg-white text-[#1D4ED8] font-bold rounded-lg cursor-pointer mb-15 transition-opacity duration-200 hover:opacity-70 active:opacity-50" onClick={()=> navigate("/services")}>Learn More About Our Services</button>
        </section>
    )
}

export default memo(HomeServices);