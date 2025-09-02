import { memo } from "react"
import SearchModify from "../AdminComponents/AdminPropertiesComponents.tsx/SearchModify";
import { usePropertieContext } from "../Contexts/PropertiesContext";
import PropertieAdminCard from "../AdminComponents/AdminPropertiesComponents.tsx/PropertieAdminCard";
import { useSearchAdminProperty } from "../AdminContext/SearchAdminPropertie";


const AdminProperties = () => {

    const {properties} = usePropertieContext();

    const {searchP} = useSearchAdminProperty();

    const searchResult = properties.filter((p)=> p.title.toLocaleLowerCase().includes(searchP.toLocaleLowerCase()) || p.location.address.toLocaleLowerCase().includes(searchP.toLocaleLowerCase()) || p.location.address.toLocaleLowerCase().includes(searchP.toLocaleLowerCase()) || p.features.some((f)=> f.toLocaleLowerCase().includes(searchP.toLocaleLowerCase())) || p.type.toLocaleLowerCase().includes(searchP.toLocaleLowerCase()) || p.service.toLocaleLowerCase().includes(searchP.toLocaleLowerCase()));

    return(
        <>
          <section className="flex flex-col min-h-screen items-center">

             <h1 className="mt-10 text-[2em] font-bold text-[#1D4ED8]">Properties</h1>

             <SearchModify/>
           
            {searchResult.length !== 0 
             ? 
                <div className="flex flex-wrap mt-10 justify-center items-center px-10 w-full gap-10 ">
             {searchResult.map((p)=>{
                return(
                    <PropertieAdminCard
                    p={p}
                    key={p.id}
                    />
                )
             })}
             </div>
              : searchResult.length === 0 ?
                 <div className="text-[1.3em] mt-10 text-center">Not found</div>
                 :
                
                 <div className="flex flex-wrap mt-10 justify-center items-center px-10 w-full gap-10 ">
             {properties.map((p)=>{
                return(
                    <PropertieAdminCard
                    p={p}
                    key={p.id}
                    />
                )
             })}
             </div>
            }
        

          </section>
        </>
    )
}

export default memo(AdminProperties);