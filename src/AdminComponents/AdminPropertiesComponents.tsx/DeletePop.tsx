

import { memo } from "react"
import { useNavigate } from "react-router-dom";
import type { Propertie } from "../../Contexts/Types";
import { deleteDoc, doc } from "firebase/firestore";
import {db} from "../../Config/fireBase"
import { usePropertieContext } from "../../Contexts/PropertiesContext";


const DeletePop = ({setShowPop, property} : {setShowPop : (b : boolean)=> void, property : Propertie}) => {

    const navigate = useNavigate();
    const {properties, setProperties} = usePropertieContext();

    const deleteProperty = async() => {

        try{
            const propertyRef = doc(db, "properties", property.id);
            await deleteDoc(propertyRef);

            const filteredDocs = properties.filter((pr)=> pr.id !== pr.id);
            setProperties(filteredDocs);

        }catch(err){
            console.error("Error in deleting a property : ", err);
        }
    }

  return(
            <section onClick={()=> setShowPop(false)} className="fixed inset-0 bg-black/40  flex justify-center items-center z-50">
            <div onClick={(e) => e.stopPropagation()}  className="flex flex-col justify-center items-center fixed top-30 bg-white w-[600px] rounded-xl max-[650px]:w-[300px]">
                <p className="mt-7 w-[400px] text-center font-bold max-[600px]:w-[200px]">Are you sure you want to delete property : {property.title}</p>

                <div className="flex flex-row justify-center items-center mt-7 mb-10 gap-2">
                    <button onClick={()=>{
                        setShowPop(false);
                        deleteProperty();
                    }} className="bg-blue-500 text-white font-bold px-2 h-[35px] rounded-lg cursor-pointer transition-colors border border-blue-500 duration-200 hover:bg-white hover:text-blue-500">
                        Yes, Delete
                    </button>

                    <button onClick={()=> setShowPop(false)} className="bg-red-500 text-white font-bold h-[35px] px-2 rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                        Cancel
                    </button>
                </div>

                <div className="flex justify-center items-center absolute top-0 text-[1.5em] h-[30px] w-[30px] bg-blue-500 rounded-full cursor-pointer text-white right-0 mt-[-10px] mr-[-10px] transition-colors duration-200 hover:bg-blue-400 active:bg-blue-300 z-100" onClick={()=>setShowPop(false)}>&times;</div>
            </div>
        </section>
  )
}

export default memo(DeletePop);