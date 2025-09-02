
import { Route, Routes } from "react-router-dom"

import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import { UserProvider } from "./Contexts/UserContext"
import { PropertieProvider } from "./Contexts/PropertiesContext"
import Properties from "./Pages/Properties"
import Details from "./Pages/Details"
import Favorites from "./Pages/Favorites"
import { SearchProvider } from "./Contexts/SearchContext"
import Search from "./Pages/Search"
import { FilterProvider } from "./Contexts/FilterContext"
import Filter from "./Pages/Filter"
import Services from "./Pages/Services"
import Contact from "./Pages/Contact"
import { RequestProvider } from "./Contexts/RequestsContext"
import AdminLayout from "./Layouts/AdminLayout"
import UserRoute from "./Layouts/UserRoute"
import PublicLayout from "./Layouts/PublicLayout"
import AdminRoute from "./Layouts/AdminRoute"
import AdminProfile from "./AdminPages/AdminProfile"
import AdminProperties from "./AdminPages/AdminProperties"
import { SearchAdminPropertyProvider } from "./AdminContext/SearchAdminPropertie"
import Modify from "./AdminPages/Modify"
import Add from "./AdminPages/Add"

function App() {


 
  return (
   
    <UserProvider>
      <PropertieProvider>
        <SearchProvider>
          <FilterProvider>
            <RequestProvider>
              <SearchAdminPropertyProvider>
     <Routes>
       
        <Route element={
          <UserRoute>
             <PublicLayout/>
          </UserRoute>
        }>

        

        <Route path="/" element={
          <>
           
           <Home/>
           </>
        }/>

        <Route path="/profile" element={
          <>
            
            <Profile/>
          </>
        }/>

        <Route path="/properties" element={
          <>
            
            <Properties/>
          </>
        }/>

        <Route path="/details/:id" element={
        <>
        
           <Details/>
        </>
        }/>

        <Route path="/favorites" element={
          <>
         
            <Favorites/>
          </>
        }/>

          <Route path="/search" element={<>
         
         <Search/>
       </>}/>

       <Route path="/filter" element={
          <>
            
            <Filter/>
          </>
       }/>

       <Route path="/services" element={
        <>
       
          <Services/>
        </>
       }/>

         <Route path="/contact" element={
          <>
            
             <Contact/>
          </>
         }/>
         </Route>

         <Route path="/admin/*" element={
          <AdminRoute>
            <AdminLayout/>
          </AdminRoute>
         }>
            <Route path="dashboard" element={
              <>
              <div>Dashboard</div>
              </>
            }/>
            <Route path="properties" element={<>
              <AdminProperties/>
              </>}/>
            <Route path="users" element={
              <>
                 <div>
                  Users
                 </div>
              </>}/>
            <Route path="profile" element={<>
              <AdminProfile/>
                </>}/>

            <Route path="requests" element={<>
              <div>Requests</div>
                </>}/>

                <Route path="modify/:id" element={
          <Modify/>
         }/>

         <Route path="add" element={
          <Add/>
         }/>
         </Route>
         
     </Routes>

                 </SearchAdminPropertyProvider>
              </RequestProvider>
            </FilterProvider>
        </SearchProvider>
     </PropertieProvider>
     </UserProvider>
  )
}

export default App
