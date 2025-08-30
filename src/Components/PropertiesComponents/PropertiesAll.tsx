import  { memo } from "react";
import { usePropertieContext } from "../../Contexts/PropertiesContext"
import PropertieCard from "./PropertieCard";



const PropertiesAll = () => {

    const {properties} = usePropertieContext();

    return(
        <div className="flex flex-wrap justify-center items-center px-5 gap-5  mt-15 mb-15">
            {properties.length === 0 ?
               <div className="font-bold mt-15 text-center">No properties Availabe</div>
             : properties.map((p)=>{
                return(
                    <PropertieCard
                     propertie={p}
                     key={p.id}
                    />
                )
            })}
        </div>
    )
}

export default memo(PropertiesAll);