import { memo } from "react"


const Visite = () => {

    return(
        <section className="flex flex-col justify-center items-center w-full" id="visit">
              <h1 className="mt-10 text-[2em] font-bold text-[#1D4ED8]">Visit Us</h1>
        <div className="flex flex-row justify-center items-center w-[1000px] gap-10 mt-10 max-[1050px]:w-[700px] max-[750px]:flex-col ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11251889.275890136!2d-25.248565030803444!3d66.9800193834689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sdz!4v1756741765365!5m2!1sfr!2sdz"
            className="w-[600px] h-[400px] max-[1050px]:w-[400px] max-[1050px]:h-[300px] max-[750px]:w-[300px] max-[750px]:h-[200px] slideLeft"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
            </iframe>

            <p className="w-[300px] text-[1.1em] text-gray-800 font-bold max-[1050px]:text-[1em] text-center max-[750px]:w-[280px] slideRight">
                 Visit us directly to have in-person contact with our professionals.  
                 We’d be happy to welcome you and discuss your needs face-to-face.
            </p>
          </div>

          <div className="flex flex-row justify-center items-center gap-10 w-[1000px] mt-10 max-[1050px]:w-[700px] max-[750px]:flex-col mb-15">
            <p className="text-[1.1em] text-gray-800 text-center w-[300px] slideLeft max-[1050px]:text-[1em] font-[600]">We will be more than happy to welcome you to our office. Our team looks forward to meeting you in person, offering you a warm reception, and discussing how we can best support your needs.</p>
            <img src="/welcoming.jpg" alt="" className="w-[600px] h-[300px] object-cover slideRight max-[1050px]:w-[300px] max-[1050px]:h-[150px]"/>
          </div>
</section>

    )
}

export default memo(Visite);


