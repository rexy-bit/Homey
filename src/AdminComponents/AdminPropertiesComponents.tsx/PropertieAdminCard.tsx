import { memo, useEffect, useState } from "react"
import type { Propertie } from "../../Contexts/Types";
import { useNavigate } from "react-router-dom";
import DeletePop from "./DeletePop";



const PropertieAdminCard = ({p} : {p : Propertie}) => {

    const navigate = useNavigate();

    const [showPop, setShowPop] = useState<boolean>(()=>{
        const saved = localStorage.getItem('showPop');

        return saved ? JSON.parse(saved) : false;
    });

    useEffect(()=>{
        localStorage.setItem('showPop', JSON.stringify(showPop));
    }, [showPop]);

    return(
        <>
        <div className="w-[300px] h-[300px] border border-gray-400 rounded-2xl property-card bg-gray-50">
            <img src={p.images[0]} alt={p.title} className="h-[150px] w-full object-cover rounded-t-2xl"/>
            <div className="p-2 flex flex-col">
            <p className="text-gray-900 text-center leading-5">{p.title}</p>
            <p className="text-gray-500 text-center">{p.price} Dzd</p>
            <div className="flex flex-row gap-5 justify-center items-center mt-5">
                <button className="px-2 py-1 bg-[#1D4ED8] rounded-lg font-bold text-white cursor-pointer transition-opacity duration-300 hover:opacity-70 active:opacity-50" onClick={()=>navigate(`/admin/modify/${p.id}`)}>Modify <i className="fa-solid fa-pen-to-square"></i></button>
                <button className="px-2 py-1 bg-red-600 rounded-lg font-bold text-white cursor-pointer transition-opacity duration-300 hover:opacity-70 active:opacity-50" onClick={()=>setShowPop(true)}>Delete <i className="fa-solid fa-trash"></i></button>
            </div>
            </div>
        </div>

         {showPop && <DeletePop setShowPop={setShowPop} property={p}/>}
        </>
    )
}

export default memo(PropertieAdminCard);