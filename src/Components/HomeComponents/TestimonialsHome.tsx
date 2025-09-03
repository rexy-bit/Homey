
import { memo } from "react";
import testimonials from "./testimonials"
import Counter from "./Counter";


const TestimonialsHome = () => {

    return(
        <section className="flex flex-col items-center w-full bg-white" id="testimonials">
           <h1 className="text-[#1D4ED8] font-black text-[2em] mt-10">Testimonials</h1>

           <div className="flex flex-col justify-center items-center gap-5 mb-15 mt-15">
            {testimonials.map((t)=>{
                return(
                  <div key={t.name} className="w-[800px] flex flex-col p-2 shadow shadow-2xl rounded-[10px] max-[820px]:w-[500px] max-[530px]:w-[300px] transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="flex flex-row gap-2 items-center">
                        <img src={t.picture} alt={t.name} className="w-[50px] rounded-full"/>
                        <div className="font-bold">{t.name} - {t.service}</div>
                    </div>

                    <div className="text-gray-800">
                        {t.testimonial}
                    </div>
                  </div>
                )
            })}
           </div>

           <div className="flex flex-row justify-center items-center gap-5 mb-15">
                <div className="flex flex-col items-center">
                   <Counter end={500} />

                   <p>Satisfied Clients</p>
                </div>

                <div className="flex flex-col items-center">
                    <Counter end={120} duration={20}/>
                    <p>Homes sold</p>
                </div>

                <div className="flex flex-col items-center">
                    <Counter end={80} duration={20}/>
                    <p>Houses Rented</p>
                </div>
           </div>
        </section>
    )
}

export default memo(TestimonialsHome);