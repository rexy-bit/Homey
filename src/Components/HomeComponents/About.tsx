import  { memo } from "react";

const About = () => {

    return(
        <section className="w-full bg-white flex flex-col justify-center items-center">
            <h1 className="text-[#1D4ED8] font-black text-[2.5em] mt-5">About Us</h1>

            <div className="flex flex-row justify-center items-center gap-10 mt-10 mb-15 max-[1000px]:flex-col">
              <img src="/happyFamily.jpg" alt="" className="w-[400px] h-[300px] object-cover rounded-[5px] slideLeft max-[1000px]:w-[300px] max-[1000px]:h-[200px]"/>

              <p className="w-[400px] text-center font-bold text-gray-800 slideRight max-[1000px]:w-[300px]">At Homey, we believe that property ownership should be simple and stress-free. Our mission is to provide homeowners, landlords, and tenants with reliable real estate solutions tailored to their needs. From property management to personalized support, we take care of every detail so you can focus on what truly matters — enjoying your home.</p>
            </div>
        </section>
    );
}

export default memo(About);