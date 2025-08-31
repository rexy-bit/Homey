import { memo, useState } from "react"
import { useFilterContext } from "../Contexts/FilterContext"
import { usePropertieContext } from "../Contexts/PropertiesContext";
import FilterComponents from "../Components/PropertiesComponents/FilterComponents";
import PropertieCard from "../Components/PropertiesComponents/PropertieCard";
import { useUserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";


const Filter = () => {

    const {filter} = useFilterContext();

    const {properties} = usePropertieContext();

    const filteredProperties = properties.filter((p)=> p.type.toLocaleLowerCase() === filter.type.toLocaleLowerCase() && p.location.city.toLocaleLowerCase() === filter.city.toLocaleLowerCase() && p.service.toLocaleLowerCase() === filter.service.toLocaleLowerCase());


         const {loadingProperties} = usePropertieContext();
         const {loadingUsers, signInLoading, initializing} = useUserContext();
         
        const navigate = useNavigate();

          if(loadingProperties || initializing || loadingUsers || signInLoading){
             return(
                <>
                
                <section className="min-h-screen flex flex-col items-center">
                     
                    <div className="flex flex-col mt-20 jusitfy-center items-center gap-5">
                       <i className="fa-solid fa-spinner fa-spin-pulse text-[#1D4ED8] text-[3em]"></i>
                       <p className="text-[1.3em] font-bold text-[#1D4ED8]">Loading...</p>
                    </div>
                </section>
                </>
            )
          }

    return(
        <section className="flex flex-col min-h-screen items-center property-card">
            <h1 className="text-center text-[#1D4ED8] font-bold  underline property-card mt-15 text-[1.5em]">Filter Result</h1>

            <FilterComponents/>

            {filteredProperties.length === 0 
             ?
                <h1 className="text-center text-[#1D4ED8] font-bold text-[1.1em] underline property-card mt-20">No Properties found</h1>

               : 
                          <div className="flex flex-wrap justify-center items-center px-5 gap-5  mt-15 mb-15">
                                                  {filteredProperties.map((p)=>{
                                                     return(
                                                         <PropertieCard
                                                          propertie={p}
                                                          key={p.id}
                                                         />
                                                     )
                                                 })}
                                             </div>
            }

              <button className="px-3 py-1 bg-[#1D4ED8] text-white font-bold rounded-3xl fixed top-2 left-3 cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" onClick={()=>navigate(-1)}>&#8592; Back</button>
              
        </section>
    )

}

export default memo(Filter);