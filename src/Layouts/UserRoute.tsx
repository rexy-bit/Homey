
import { useUserContext } from "../Contexts/UserContext"
import { Navigate } from "react-router-dom";
import { memo } from "react";


const UserRoute = ({children} : {children : React.ReactNode}) => {

    const {user, initializing} = useUserContext();

    

    if(initializing) return <div className="flex justify-center mt-20">
                      <i className="fa-solid fa-spinner fa-spin-pulse text-[3em] text-[#1D4ED8]"></i>
                    </div>;

      if(user && user.role === "admin"){
          return <Navigate to="/admin/dashboard" replace/>
      }

    return <>{children}</>
}

export default memo(UserRoute);