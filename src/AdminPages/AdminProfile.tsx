import { memo } from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../Contexts/UserContext";
const AdminProfile = () => {

    const {user, logOut} = useUserContext();

    if(!user) return <div>No user detected</div>;
    return(
                  <section className="min-h-screen flex flex-col items-center bg-blue-100">
            <div className="flex flex-col justify-center items-center">
            <h1 className="text-[1.5em] font-bold mt-10 w-[300px] text-center leading-7">Welcome Back {user.name}!</h1>

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

export default memo(AdminProfile);