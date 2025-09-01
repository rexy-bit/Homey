import { Outlet } from "react-router-dom"
import { memo } from "react"
import AdminHeader from "../AdminComponents/AdminHeader"


const AdminLayout = () => {

    return(
        <>
         <AdminHeader/>

         <main>
            <Outlet/>
         </main>
        </>
    )
}

export default memo(AdminLayout);