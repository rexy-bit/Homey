import { memo } from "react"


const Footer = () => {

    return(
        <section className="flex flex-col items-center w-full bg-gray-900">
            <h1 className="text-[#1D4ED8] text-[2.5em] font-black mt-10">Homey</h1>
            <p className="text-gray-400 mt-5 w-[400px] text-center leading-5 max-[450px]:w-[300px]">With years of proven expertise, Homey helps you manage, grow, and protect your property with confidence.</p>

            <div className="flex flex-row justify-between w-full mt-15 px-25 mb-15 max-[750px]:px-5 max-[700px]:flex-col max-[700px]:gap-5">
 
                <div className="flex flex-col items-center ">
                    <h1 className="text-[#1D4ED8] text-[1.3em] font-bold">Quick Links</h1>
                    
                    <div className="flex flex-col justify-center items-center gap-1 mt-2">
                    <a href="/" className="footerLink">Home</a>
                    <a href="#about" className="footerLink">About</a>
                    <a href="/services" className="footerLink">Services</a>
                    <a href="#faq" className="footerLink">FAQ</a>
                    <a href="#testimonials" className="footerLink">Testimonials</a>
                    <a href="/contact" className="footerLink">Contact</a>
                    </div>

                </div>
                 <div className="flex flex-col items-center ">
                        <h1 className="text-[#1D4ED8] text-[1.3em] font-bold">Contact</h1>
                        <div className="flex flex-col justify-center items-center gap-2 mt-2">
                            <p className="text-white"><i className="fa-solid fa-envelope"></i> support@homey.com</p>
                            <p className="text-white"><i className="fa-solid fa-phone"></i> + 12345678910</p>
                            <p className="w-[250px] text-center text-white"><i className="fa-solid fa-location-dot"></i> 123 Nuuk Harbor Street, Block C, Nuuk 3900, Greenland</p>
                        </div>
                </div>


                <div className="flex flex-col items-center">
                    <h1 className="text-[#1D4ED8] text-[1.3em] font-bold">Follow Us</h1>
                    <div className="flex flex-col justify-center items-center gap-1">
                        <button className="text-white text-[2.1em] cursor-pointer transition-transform duration-300 hover:scale-90 active:scale-80"><i className="fa-brands fa-instagram"></i></button>
                        <button  className="text-white text-[2.1em] cursor-pointer transition-transform duration-300 hover:scale-90 active:scale-80"><i className="fa-brands fa-facebook"></i></button>
                        <button  className="text-white text-[2.1em] cursor-pointer transition-transform duration-300 hover:scale-90 active:scale-80"><i className="fa-brands fa-linkedin"></i></button>
                    </div>
                </div>
                
            </div>
            <div className="w-full text-white flex justify-center items-center text-center h-[50px] border-t border-t-white gap-1">
            
                &#169; 2025 Homey. All rights reserved. Powered by Homey | Crafted with passion by Yanis.
           </div>
        </section>
    )
}

export default memo(Footer);