
import { Route, Routes } from "react-router-dom"
import Header from "./Components/HomeComponents/Header"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import { UserProvider } from "./Contexts/UserContext"
import { PropertieProvider, usePropertieContext } from "./Contexts/PropertiesContext"
import Properties from "./Pages/Properties"
import Details from "./Pages/Details"

function App() {


 
  return (
   
    <UserProvider>
      <PropertieProvider>
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
     </Routes>
     </PropertieProvider>
     </UserProvider>
  )
}

export default App
