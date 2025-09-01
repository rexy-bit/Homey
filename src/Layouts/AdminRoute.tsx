import { Navigate } from "react-router-dom";
import { useUserContext } from "../Contexts/UserContext"


const AdminRoute = ({children} : {children : React.ReactNode}) => {

    const {user, initializing} = useUserContext();

        if(initializing) return <div className="flex justify-center mt-20">
                      <i className="fa-solid fa-spinner fa-spin-pulse text-[3em] text-[#1D4ED8]"></i>
                    </div>;

        if(!user || user.role !== "admin"){
            return <Navigate to="/" replace/>
        }

        return <>{children}</>
}

export default AdminRoute;