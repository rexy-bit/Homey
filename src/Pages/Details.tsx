import { useNavigate, useParams } from "react-router-dom"
import { usePropertieContext } from "../Contexts/PropertiesContext";
import { memo, useState, useEffect } from "react";
import { useUserContext } from "../Contexts/UserContext";
import PopUp from "../Components/PropertiesComponents/PopUp";


const Details = () => {

    const {id} = useParams();
    const {properties} = usePropertieContext();

    const navigate = useNavigate();

    const propertie = properties.find((p)=> p.id === id);
        const [showPop, setShowPop] = useState(()=>{
            const saved = localStorage.getItem("showPop");
    
            return saved ? JSON.parse(saved) : false;
        });
    
        useEffect(()=>{
            localStorage.setItem("showPop", JSON.stringify(showPop));
        }, [showPop]);

            const [index, setIndex] = useState<number>(0);
    const {user, addToFavorites, isFavorite} = useUserContext();

    if(!propertie){
        return <div className="text-center font-bold mt-15">Propertie not found</div>
    }




    const nextImage = () => {
        if(index < propertie?.images.length - 1){
            setIndex(prev => prev + 1);
        }else{
            setIndex(0);
        }
    }

    const previousImage = () => {
        if(index > 0){
          setIndex(prev => prev - 1);
        }else{
            setIndex(propertie.images.length - 1);
        }
    }
    return(
        <section className="min-h-screen flex flex-col items-center">

            {!propertie ?
              <h1>Propertie not found</h1>
              :
                <>
                  <h1 className="mt-15 text-[1.5em] font-black underline">Propertie Details</h1>

                  
                  <div className="flex flex-col mt-10 mb-10 max-[750px]:w-[400px] max-[750px]:items-center max-[450px]:w-[300px]">

                    <h1 className="text-[1.2em] font-bold text-center">{propertie.title}</h1>
                    <div className="flex flex-row items-center justify-center gap-5 mt-5">
                       <div onClick={previousImage} className="text-[2em] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50">&#10094;</div>
                       <img src={propertie.images[index]} alt={propertie.title} className="w-[400px] h-[400px] object-cover rounded-lg max-[750px]:w-[300px] max-[750px]:h-[300px] max-[450px]:w-[200px] max-[450px]:h-[200px]"/>
                       <div onClick={nextImage} className="text-[2em] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50">&#10095;</div>
                    </div>
                    <p className="mt-1 text-center">{index + 1}/{propertie.images.length}</p>

                    <div className="flex flex-col p-3 mt-2 w-[600px] max-[750px]:w-[400px] max-[450px]:w-[300px]">
                        <div className="flex flex-row items-center gap-2 text-[1.1em]"><div className="w-3 h-3 bg-green-700 rounded-full"></div> {propertie.type} for {propertie.service}</div>
                        <div className="flex flex-row w-full justify-between items-center">
                        <p className="font-black text-[1.56em] mt-1">{propertie.price} Dzd</p>
                        <button className="transition-all duration-300 shadow-md rounded-full p-2 px-3 right-2 top-2 bg-black/50 cursor-pointer max-[650px]:top-30 active:scale-90" onClick={()=>{
                            if(!user){
                                setShowPop(true);
                            }else{
                                addToFavorites(propertie);
                            }
                        }}>
                            <i style={{color : isFavorite(propertie) ? "red" : "white"}} className="fa-solid fa-heart  text-[0.9em]"></i>
                        </button>
                        </div>
                        <div className="flex flex-row items-center gap-5">
                            <p><strong>{propertie.rooms}</strong> rooms</p>
                            <p><strong>{propertie.surface}</strong> sqm</p>
                        </div>
                        <p>{propertie.location.address}, {propertie.location.city}</p>
 
                          <p className="mt-1">{propertie.description}</p>

                          <div className="mt-1 text-gray-800 flex flex-col leading-5"><p >For more information or to schedule a free visit with one of our professional agents, please contact us at:</p><p><i className="fa-solid fa-phone"></i> <i className="fa-brands fa-whatsapp text-[1.3em] ml-1"></i> +213 {propertie.agentNumber}</p></div>
                    </div> 
  
                    
                  </div>

                  {showPop && <PopUp setShowPop={setShowPop}/>}
                </>
             }

             <button className="px-3 py-1 bg-[#1D4ED8] text-white font-bold rounded-3xl fixed top-16 left-3 cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" onClick={()=>navigate(-1)}>&#8592; Back</button>

        </section>
    )
}

export default memo(Details);