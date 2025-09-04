
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
import Requests from "./AdminPages/Requests"
import Users from "./AdminPages/Users"
import Dashboard from "./AdminPages/Dashboard"
import GenralFooter from "./Components/GenralFooter"

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
            <GenralFooter/>
          </>
        }/>

        <Route path="/properties" element={
          <>
            
            <Properties/>
            <GenralFooter/>
          </>
        }/>

        <Route path="/details/:id" element={
        <>
        
           <Details/>
           <GenralFooter/>
        </>
        }/>

        <Route path="/favorites" element={
          <>
         
            <Favorites/>
            <GenralFooter/>
          </>
        }/>

          <Route path="/search" element={<>
         
         <Search/>
         <GenralFooter/>
       </>}/>

       <Route path="/filter" element={
          <>
            
            <Filter/>
            <GenralFooter/>
          </>
       }/>

       <Route path="/services" element={
        <>
       
          <Services/>
          <GenralFooter/>
        </>
       }/>

         <Route path="/contact" element={
          <>
            
             <Contact/>
             <GenralFooter/>
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
              <Dashboard/>
              </>
            }/>
            <Route path="properties" element={<>
              <AdminProperties/>
              </>}/>
            <Route path="users" element={
              <>
                 <Users/>
              </>}/>
            <Route path="profile" element={<>
              <AdminProfile/>
                </>}/>

          

                <Route path="modify/:id" element={
          <Modify/>
         }/>

         <Route path="add" element={
          <Add/>
         }/>

          <Route path="requests" element={
          <Requests/>
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
