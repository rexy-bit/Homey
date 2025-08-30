
import { Route, Routes } from "react-router-dom"
import Header from "./Components/HomeComponents/Header"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import { UserProvider } from "./Contexts/UserContext"

function App() {


  return (
   
    <UserProvider>
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
     </Routes>
     </UserProvider>
  )
}

export default App
