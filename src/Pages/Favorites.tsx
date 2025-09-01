import { memo } from "react"
import { useUserContext } from "../Contexts/UserContext";
import { usePropertieContext } from "../Contexts/PropertiesContext";
import { useNavigate } from "react-router-dom";
import PropertieCard from "../Components/PropertiesComponents/PropertieCard";


const Favorites = () => {

    const {user} = useUserContext();
    const navigate = useNavigate();

    const {loadingProperties} = usePropertieContext();
         const {loadingUsers, signInLoading, initializing} = useUserContext();
        
          if(loadingProperties || initializing || loadingUsers || signInLoading){
             return(
                <section className="min-h-screen flex flex-col items-center">
    
                    <div className="flex flex-col mt-20 jusitfy-center items-center gap-5">
                       <i className="fa-solid fa-spinner fa-spin-pulse text-[#1D4ED8] text-[3em]"></i>
                       <p className="text-[1.3em] font-bold text-[#1D4ED8]">Loading...</p>
                    </div>
                </section>
            )
          }

    return(
        <section className="flex flex-col min-h-screen items-center">
            <h1 className=" font-black text-[#1D4ED8] text-[2em] mt-10 underline">Favorites</h1>
          {!user ?
            <div className="flex flex-col justify-center items-center max-[600px]:w-[300px] text-center">
                <p>Sign In to see add favorites, see properties and benefit from our services</p>
                <button className="text-white bg-[#1D4ED8] px-3 py-2 font-bold rounded-lg mt-5 cursor-pointer transition-all duration-200 hover:text-[#1D4ED8] hover:bg-white hover:border hover:border-[#1D4ED8] active:scale-90" onClick={()=>navigate("/profile")}>Sign In</button>
            </div>
            : user.favorites.length === 0 
               ?
                  <div className="flex flex-col justify-center items-center mt-10">
                    <p>No favorites</p>
                    <button className="text-white bg-[#1D4ED8] px-3 py-2 font-bold rounded-lg mt-5 cursor-pointer transition-all duration-200 hover:text-[#1D4ED8] hover:bg-white hover:border hover:border-[#1D4ED8] active:scale-90" onClick={()=>navigate("/properties")}>Add favorites</button>
                  </div>
                   :
                      <div className="flex flex-wrap justify-center items-center px-5 gap-5  mt-15 mb-15">
                        {user.favorites.map((p)=>{
                            return(
                                <PropertieCard
                                propertie={p}
                                key={p.id}
                                />
                            );
                        })}
                      </div>
          } 
        </section>
    )
}

export default memo(Favorites);