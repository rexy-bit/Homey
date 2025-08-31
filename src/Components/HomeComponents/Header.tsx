import  { memo, useEffect, useState } from "react"
import { Link } from "react-router-dom"


const Header = () => {

    const [showNav, setShowNav] = useState<boolean>(()=>{
        const saved = localStorage.getItem("showNav");

        return saved ? JSON.parse(saved) : false;
    });

    useEffect(()=>{
        localStorage.setItem("showNav", JSON.stringify(showNav));
    }, [showNav]);

    return(
        <header className="flex flex-row w-full h-[55px] justify-between fixed top-0  items-center px-2 shadow-xl  max-[500px]:px-8 bg-white z-50">
            <h1 className="text-[#1D4ED8] font-black text-[2em] cursor-pointer max-[600px]:text-[1.7em]"><Link to="/">Homey</Link></h1>

            <nav className="max-[500px]:hidden flex flex-row justify-center items-center gap-4 max-[600px]:gap-2">
                <Link to="/" className="linkNav">Home</Link>
                <Link to="/properties" className="linkNav">Properties</Link>
                <Link to="/favorites" className="linkNav">Favorites</Link>
                <Link to="/services" className="linkNav">Services</Link>
                <Link to="/contact" className="linkNav">Contact Us</Link>
                <Link to="/profile" className="linkNav text-[1.4em] max-[600px]:text-[1.2em]"><i className="fa-solid fa-house-user"></i></Link>
            </nav>

          
            <div className="hidden max-[500px]:block text-[2em] text-[#1D4ED8] font-black cursor-pointer transition-all duration-200 hover:opacity-70 active:opacity-50" onClick={()=> setShowNav(prev => !prev)}>

                &#9776;
            </div>

            {showNav && 
             <section onClick={()=> setShowNav(false)} className="fixed inset-0">
              <nav onClick={(e)=> e.stopPropagation()} className="z-50 flex flex-col justify-center  absolute top-18 right-5 bg-[#1D4ED8] rounded-lg p-2 w-[100px] gap-2">
                <Link to="/" onClick={()=> setShowNav(false)} className="linkNav2">Home</Link>
                <Link to="/properties" onClick={()=> setShowNav(false)} className="linkNav2">Properties</Link>
                <Link to="/favorites" onClick={()=> setShowNav(false)} className="linkNav2">Favorites</Link>
                <Link to="/services" onClick={()=> setShowNav(false)} className="linkNav2">Services</Link>
                <Link to="/contact" className="linkNav2" onClick={()=> setShowNav(false)}>Contact Us</Link>
                <Link to="/profile" onClick={()=> setShowNav(false)} className="linkNav2 text-[1.4em]"><i className="fa-solid fa-house-user"></i></Link>
                
              </nav>
              </section>
            }
            
        </header>
    )
}

export default memo(Header);