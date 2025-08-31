
import { Route, Routes } from "react-router-dom"
import Header from "./Components/HomeComponents/Header"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import { UserProvider } from "./Contexts/UserContext"
import { PropertieProvider, usePropertieContext } from "./Contexts/PropertiesContext"
import Properties from "./Pages/Properties"
import Details from "./Pages/Details"
import Favorites from "./Pages/Favorites"
import { SearchProvider } from "./Contexts/SearchContext"
import Search from "./Pages/Search"
import { FilterProvider } from "./Contexts/FilterContext"
import Filter from "./Pages/Filter"
import Services from "./Pages/Services"
import Contact from "./Pages/Contact"

function App() {


 
  return (
   
    <UserProvider>
      <PropertieProvider>
        <SearchProvider>
          <FilterProvider>
     <Routes>
       

        <Route path="/" element={
          <>
           <Header/>
           <Home/>
           </>
        }/>

        <Route path="/profile" element={
          <>
            <Header/>
            <Profile/>
          </>
        }/>

        <Route path="/properties" element={
          <>
            <Header/>
            <Properties/>
          </>
        }/>

        <Route path="/details/:id" element={
        <>
           <Header/>
           <Details/>
        </>
        }/>

        <Route path="/favorites" element={
          <>
            <Header/>
            <Favorites/>
          </>
        }/>

          <Route path="/search" element={<>
         <Header/>
         <Search/>
       </>}/>

       <Route path="/filter" element={
          <>
            <Header/>
            <Filter/>
          </>
       }/>

       <Route path="/services" element={
        <>
          <Header/>
          <Services/>
        </>
       }/>

         <Route path="/contact" element={
          <>
             <Header/>
             <Contact/>
          </>
         }/>
     </Routes>

            </FilterProvider>
        </SearchProvider>
     </PropertieProvider>
     </UserProvider>
  )
}

export default App
