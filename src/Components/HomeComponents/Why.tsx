import { memo } from "react";
import whyData from "./whyData"
import { useNavigate } from "react-router-dom";

const Why = () => {

    const navigate = useNavigate();
    return(
        <section className="flex flex-col w-full items-center bg-[#1D4ED8]">
            <h1 className="text-white font-bold text-[2em] mt-10 max-[550px]:text-[1.5em]">Why Choose Homey ?</h1>

            <p className="text-center w-[500px] text-white font-bold mt-7 text-[1.1em] max-[550px]:w-[300px]">At Homey, we believe that property ownership should be rewarding, not overwhelming. That’s why we offer a unique blend of expertise, transparency, and personalized care that sets us apart.</p>

             <div className="flex flex-wrap gap-10 px-10 mt-10 mb-10 justify-center items-center">
                {whyData.map((d)=>{
                    return(
                        <div className="w-[200px] flex flex-col items-center bg-gray-100 shadow-2xl p-2 rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 h-[270px]">
                            <h1 className="text-[#1D4ED8] font-bold text-[1.2em] text-center mt-3">{d.name}</h1>
                            <img src={d.icon} alt={d.name} className="w-[70px] mt-2"/>
                            <p className="text-gray-800 text-center font-bold mt-2">{d.text}</p>

                        </div>
                    )
                })}
             </div>

             <p className="text-white font-bold text-[1.2em] max-[600px]:w-[300px] text-center">Discover how Homey can simplify your property journey.</p>

             <div className="flex flex-row justify-center items-center gap-10 mt-5 mb-15">
                <button className="bg-gray-100 text-black font-bold p-2 rounded-[5px] cursor-pointer transition-all duration-300 hover:bg-gray-50 active:scale-90" onClick={()=>navigate("/properties")}>Get Started</button>
                
                <button className="bg-gray-100 text-[#1D4ED8] font-bold p-2 rounded-[5px] cursor-pointer transition-all duration-300 hover:bg-gray-50 active:scale-90" onClick={()=>navigate("/contact")}>Contact Us</button>
             </div>
        </section>
    );
}

export default memo(Why);