import  { memo } from "react";
import PropertieCard from "../Components/PropertiesComponents/PropertieCard";
import SearchBar from "../Components/PropertiesComponents/SearchBar";
import { usePropertieContext } from "../Contexts/PropertiesContext";
import { useSearchContext } from "../Contexts/SearchContext"
import { useNavigate } from "react-router-dom";


const Search = () => {

    const {search} = useSearchContext();
    const {properties} = usePropertieContext();
    const navigate = useNavigate();
    
    let searchResult = properties.filter((p)=> p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || p.features.some((f)=> f.toLocaleLowerCase().includes(search.toLocaleLowerCase())) || p.service.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || p.location.city.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || p.location.address.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

    return(

        <section className="min-h-screen flex flex-col items-center">
            <SearchBar/>

            <h1 className="mt-20 text-[#1D4ED8] text-[1.8em] font-bold underline">Available Properties</h1>

            {searchResult.length === 0 
              ?
                <h1 className="mt-5 text-[1.1em]">Not found</h1>
                : 
                    <div className="flex flex-wrap justify-center items-center px-5 gap-5  mt-15 mb-15">
                                {properties.map((p)=>{
                                   return(
                                       <PropertieCard
                                        propertie={p}
                                        key={p.id}
                                       />
                                   )
                               })}
                           </div>
             }

              <button className="px-3 py-1 bg-[#1D4ED8] text-white font-bold rounded-3xl fixed top-28 left-3 cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" onClick={()=>navigate(-1)}>&#8592; Back</button>
        </section>
    )
}

export default memo(Search);