import { memo, useEffect, useState } from "react";
import { useUserContext } from "../Contexts/UserContext";
import { useRequestsContext } from "../Contexts/RequestsContext";
import { usePropertieContext } from "../Contexts/PropertiesContext";
import type { Request } from "../Contexts/Types"
import {db} from "../Config/fireBase"
import { doc, updateDoc } from "firebase/firestore"
import PropertieAdminCard from "../AdminComponents/AdminPropertiesComponents.tsx/PropertieAdminCard";



const RequestCard = ({request} : {request : Request}) => {

    const [showModify, setShowModify] = useState(false);
    const {requests, setRequests} = useRequestsContext();
    const [loadingModify, setLoadingModify] = useState(false);

    const handleSelectChange = async(e : React.ChangeEvent<HTMLSelectElement>) => {
       
        const value = e.target.value;

        if(!value || value === ""){
            return null;
        }

         try{
            setLoadingModify(true);
            const requestRef = doc(db, "requests", request.id);
            await updateDoc(requestRef, {
                status : value
            });

            const newRequests = requests.map((r)=>{
                if(r.id === request.id){
                    return {
                        ...r,
                        status : value
                    }
                }

                return r;
            });

            setRequests(newRequests);
            setShowModify(false);

         }catch(err){
            console.error("Error in modifying the status : ", err);
         }finally{
            setLoadingModify(false);
         }
    }

    

    return(
        <div className="w-[300px] flex flex-col p-2 border border-gray-400 rounded-lg">
            <div className="flex flex-col border-b border-b-gray-400 gap-1">
                <p className="leading-4 text-[#1D4ED8]">userId : <strong>{request.userId}</strong></p>
                <p className="mb-3 text-[#1D4ED8]">userName : <strong>{request.userName}</strong></p>
            </div>
            <div className="flex flex-col jusitfy-cen
             items-cneter gap-2 pt-2">
                <p><strong>Name</strong> : {request.name}</p>
                <p><strong>request ID</strong> : {request.id}</p>
                <p><strong>request Date</strong> : {request.requestDate}</p>
                <p><strong>Service Requested</strong> : {request.service}</p>
                <p><strong>details</strong> : {request.details}</p>
                <p><strong>Status</strong> : {request.status}</p>

                 {showModify && 
                   <select name="status" id="stauts" value={request.status} onChange={handleSelectChange}>
                    <option value="">Select a status</option>
                    <option value="Checked">Checked</option>
                    <option value="unChecked">unChecked</option>
                   </select>
                 }
                <button onClick={()=>setShowModify(true)} className="bg-[#1D4ED8] text-white font-bold py-1 rounded-[5px] mt-2 cursor-pointer border transition-all duration-300 hover:border-[#1D4ED8] hover:bg-white hover:text-[#1D4ED8] active:opacity-70">{loadingModify ? 
                 <span>Updating <i className="fa-solid fa-spinner fa-spin-pulse text-[#1D4ED8]"></i></span> : "Modify Status" 
            }</button>

            </div>
        </div>
    )
}

function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // met à jour chaque seconde

    return () => clearInterval(timer); // nettoyage quand le composant se démonte
  }, []);

  return (
    <div className="text-xl font-bold text-gray-800">
      {time.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })}
    </div>
  );
}


const mostProperty = () => {

    const {properties} = usePropertieContext();

    let max = properties[0];

    for(let i = 0;i<properties.length;i++){
       if(properties[i].price > max.price){
         max = properties[i];
       }
    }

    return max;
}

const leastProperty = () => {
    const {properties} = usePropertieContext();

    let min = properties[0];

    for(let i = 0;i<properties.length;i++){
        if(properties[i].price < min.price){
            min = properties[i];
        }
    }

    return min;
}

const Dashboard = () => {

    const today = new Date();
    const {user, users} = useUserContext();
    const {requests} = useRequestsContext();
    const {properties} = usePropertieContext();

    const unCheckedRequests = () => {
        let cpt = 0;
        requests.forEach((r)=>{
            if(r.status === "unChecked"){
                cpt++;
            }
        });

        return cpt;
    }

    const unChecked = requests.filter((r)=> r.status === "unChecked");

    return(
        <section className="flex flex-col items-center min-h-screen">

            <div className="flex flex-row justify-center items-center gap-2 mt-5 border border-gray-400 py-1 px-2 rounded-3xl">
                <p>{today.toDateString()}</p>
                <p>{CurrentTime()}</p>
            </div>
            <h1 className="mt-3 text-[2em] font-bold text-[#1D4ED8]">Dashboard</h1>

             <div className="text-[#1D4ED8] font-bold w-[300px] text-center mt-5">
                Welcome Back, {user?.name} scroll to see the state of your plateforme today
             </div>
            
            <div className="bg-[#1D4ED8] w-full flex flex-col justify-center items-center mt-10 text-white">
                <h1 className="font-bold text-[1.6em] mt-5">General statistics</h1>

                <div className="flex flex-col items-center mt-5 mb-5">
                    <p className="font-bold">Total number of users: {users.length}</p>
                    <p className="font-bold">unCkecked requests: {unCheckedRequests()}</p>
                    <p className="font-bold">Total number of properties : {properties.length}</p>
                </div>

            </div>

            <div className="flex flex-col w-full items-center">
                <h1 className="mt-5 text-[1.5em] font-bold text-[#1D4ED8]">Unchecked Requests</h1>

                {unChecked.length === 0
                  ?
                    <div >No unChecked Requests</div>
                    : 
                    <div className="flex flex-wrap justify-center items-center gap-10 mt-10 mb-15">
                       {unChecked.map((request)=>{ 
                          return(
                            <RequestCard request={request} key={request.id}/>
                          )
                        })}
                    </div>
                }
            </div>

            <div className="flex flex-col w-full items-center bg-[#1D4ED8]">
                <h1 className="mt-5 text-[1.5em] font-bold text-white mb-5 max-[500px]:w-[300px] text-center">Most Expensive Property</h1>

                <PropertieAdminCard p={mostProperty()}/>;
            </div>

            <div className="flex flex-col w-full items-center bg-white mb-10">
                <h1 className="mt-5 text-[1.5em] font-bold text-[#1D4ED8] mb-5 max-[500px]:w-[300px] text-center">Most Expensive Property</h1>

                <PropertieAdminCard p={leastProperty()}/>
            </div>
        </section>
    )
}


export default memo(Dashboard)