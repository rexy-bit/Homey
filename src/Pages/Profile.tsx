import { memo } from "react";
import { useUserContext } from "../Contexts/UserContext"
import { Link } from "react-router-dom";
import Footer from "../Components/HomeComponents/Footer";
import GenralFooter from "../Components/GenralFooter";

const Profile = () => {

    const {user, signInwithGoogle, logOut, initializing, signInLoading} = useUserContext();

    
    if(initializing || signInLoading){
        return(
            <section className="min-h-screen flex flex-col items-center bg-blue-100">

                <div className="flex flex-col mt-20 jusitfy-center items-center gap-5">
                   <i className="fa-solid fa-spinner fa-spin-pulse text-[#1D4ED8] text-[3em]"></i>
                   <p className="text-[1.3em] font-bold text-[#1D4ED8]">Loading...</p>
                </div>
            </section>
        )
    }

    
    return(
        !user || user === null
          ? <section className="min-h-screen flex flex-col items-center bg-blue-100">
              
            <div className="flex flex-col items-center mt-10">
              <h1 className="font-bold text-[1.5em]">Welcome to Homey!</h1>
              <p className="text-[1.1em] w-[500px] mt-5 text-center max-[550px]:w-[290px] max-[550px]:text-[1em]">Create an account or log in to access your personal dashboard and enjoy all our services: explore and save your favorite properties, post and manage your listings, connect with trusted real estate agents, and easily track your inquiries and messages—all in one place.</p>

              <img src="/villahydra1.avif" alt="" className="w-[300px] rounded-full h-[300px] object-cover border-2 border-white mt-5" />
  
              <p className="text-yellow-950 font-bold mt-5 max-[600px]:w-[300px] text-center">Homey — where you find your home everywhere.</p>

              <button onClick={signInwithGoogle} className="text-white bg-[#1D4ED8] px-3 py-2 font-bold rounded-lg mt-5 cursor-pointer transition-all duration-200 hover:text-[#1D4ED8] hover:bg-white hover:border hover:border-[#1D4ED8] active:scale-90 mb-15">Sign In with Google <i className="fa-brands fa-google"></i></button>
            </div>
          </section>
          : 
          <section className="min-h-screen flex flex-col items-center bg-blue-100">
            <div className="flex flex-col justify-center items-center">
            <h1 className="text-[1.5em] font-bold mt-10 w-[300px] text-center leading-7">Welcome to Homey {user.name}!</h1>

            <h2 className="mt-10 text-[1.2em] font-bold underline">User Informations</h2>

            <div className="flex flex-col justify-center border-2 rounded-lg h-[170px] p-2 border-[#1D4ED8] w-[290px] gap-2 mt-5">
                <p className="font-bold">Name : {user.name}</p>
                <p className="font-bold">Email : {user.email}</p>
                <p className="font-bold"><Link to="/favorites">Favorites</Link> : {user.favorites.length}</p>
                <p className="font-bold"><Link to="/requests">Requests</Link> : {user.requests.length}</p>
            </div>

            <button className="text-white bg-[#1D4ED8] px-3 py-2 font-bold rounded-lg mt-5 cursor-pointer transition-all duration-200 hover:text-[#1D4ED8] hover:bg-white hover:border hover:border-[#1D4ED8] active:scale-90" onClick={logOut}>Log Out</button>

            </div>

           
          </section>
           
    )
}


export default memo(Profile);