import  { memo } from "react";
import { useNavigate } from "react-router-dom";
import About from "../Components/HomeComponents/About";
import Services from "./Services";
import HomeServices from "../Components/HomeComponents/HomeServices";
import Testimonials from "../Components/HomeComponents/Testimonials";
import TestimonialsHome from "../Components/HomeComponents/TestimonialsHome";


const Home = () => {

    const navigate = useNavigate();
    return(
        <section className="min-h-screen">

            <section id="hero">
                <div style={{backgroundImage : "url('/hero3.jpg')"}} className="bg-cover bg-center w-full flex justify-center items-center h-[500px] ">
                   <div className="w-full flex flex-col  items-center bg-black/60 h-full">
                       <h1 className="text-[3em] font-black max-[500px]:w-[300px] text-center text-white max-[500px]:text-[2em] mt-15">Welcome to Homey</h1>
                       <p className="mt-5 text-white text-[1.2em] font-bold w-[500px] text-center max-[550px]:w-[300px] max-[550px]:text-[1em]">Your trusted partner in real estate solutions. Discover, manage, and enjoy stress-free property ownership with us.</p>

                       <div className="flex flex-row justify-center items-center gap-2 mt-10 max-[550px]:flex-col">
                        <button className="px-2 py-2 bg-white text-black font-bold cursor-pointer rounded-[5px] transition-all duration-200 hover:opacity-70 active:scale-90" onClick={()=>navigate("/properties")}>
                            Explore Available Properties
                        </button>

                        <button className="px-2 py-2 bg-[#1D4ED8] text-white font-bold cursor-pointer rounded-[5px] transition-all duration-200 hover:opacity-70 active:scale-90" onClick={()=>navigate("/services")}>
                            Explore Services
                        </button>
                       </div>
                   </div>
                </div>
            </section>

            <About/>
            <HomeServices/>
            <TestimonialsHome/>
        </section>
    );
}

export default memo(Home);