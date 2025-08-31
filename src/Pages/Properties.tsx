import { memo } from "react";
import PropertiesAll from "../Components/PropertiesComponents/PropertiesAll";
import { usePropertieContext } from "../Contexts/PropertiesContext";
import { useUserContext } from "../Contexts/UserContext";
import SearchBar from "../Components/PropertiesComponents/SearchBar";
import FilterComponents from "../Components/PropertiesComponents/FilterComponents";


const Properties = () => {

     const {loadingProperties} = usePropertieContext();
     const {loadingUsers, signInLoading, initializing} = useUserContext();
     
    
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
        <section className="min-h-screen flex flex-col items-center">
            <SearchBar/>
            <h1 className="mt-20 text-[#1D4ED8] text-[1.8em] font-bold underline">Available Properties</h1>

            <FilterComponents/>

            <PropertiesAll/>

        </section>
    );
}

export default memo(Properties);