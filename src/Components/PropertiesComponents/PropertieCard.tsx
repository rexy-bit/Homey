import { memo, useEffect, useState } from "react";
import type { Propertie } from "../../Contexts/Types";
import { useUserContext } from "../../Contexts/UserContext";
import PopUp from "./PopUp";
import { useNavigate } from "react-router-dom";



const Propertie = ({propertie} : {propertie : Propertie}) => {

    const {addToFavorites, isFavorite} = useUserContext();
    const {user} = useUserContext();
    const navigate = useNavigate();

    const [showPop, setShowPop] = useState(()=>{
        const saved = localStorage.getItem("showPop");

        return saved ? JSON.parse(saved) : false;
    });

    useEffect(()=>{
        localStorage.setItem("showPop", JSON.stringify(showPop));
    }, [showPop]);
      
    
    return(
        <>
        <div className="relative group flex flex-row items-center w-[580px] p-5 bg-blue-500 h-[290px]  rounded-l-[290px] rounded-r-3xl max-[650px]:flex-col max-[650px]:w-[300px] max-[650px]:rounded-l-xl max-[650px]:h-[500px] max-[650px]:rounded-tl-full max-[650px]:rounded-tr-full property-card">
            <img src={propertie.images[0]} alt={propertie.title} className="w-[300px] h-[300px] object-cover rounded-full absolute left-0 border-5 border-white max-[650px]:top-0 max-[650px]:w-[200px] max-[650px]:h-[200px] max-[650px]:left-11"/>

            <div className="flex flex-col gap-1 text-white absolute right-1 w-[250px] max-[650px]:relative max-[650px]:mt-50 max-[650px]:justify-center max-[650px]:items-center max-[650px]:text-center">
                <p className="font-bold text-center leading-5 text-[1.1em] mb-2">{propertie.title}</p>
                <p className="font-[600]">- City : {propertie.location.city}</p>
                <p className="font-[600] leading-5">- Address : {propertie.location.address}</p>
                <p className="font-[600]">- Rooms : {propertie.rooms}</p>
                <p>- Service : for {propertie.service}</p>
                <p className="font-[600]">- Status : {propertie.status}</p>

                <button className="bg-white text-[#1D4ED8] font-bold w-[120px] h-[35px] rounded-lg mt-3 cursor-pointer transition-all duration-200 hover:opacity-70 active:scale-90" onClick={()=>navigate(`/details/${propertie.id}`)}>View Details</button>
            </div>

            <button className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md rounded-full p-2 px-3 right-2 top-2 bg-black/50 cursor-pointer max-[650px]:top-30 active:scale-90" onClick={()=>{
                if(!user){
                    setShowPop(true);
                }else{
                    addToFavorites(propertie);
                }
            }}>
                <i style={{color : isFavorite(propertie) ? "red" : "white"}} className="fa-solid fa-heart  text-[0.9em]"></i>
            </button>
        </div>

        {showPop && !user && <PopUp setShowPop={setShowPop}/>}
        
        </>

    )
}

export default memo(Propertie);