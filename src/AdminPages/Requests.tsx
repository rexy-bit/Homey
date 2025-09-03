import { memo, useState } from "react"
import { useRequestsContext } from "../Contexts/RequestsContext"
import type { Request } from "../Contexts/Types"
import {db} from "../Config/fireBase"
import { doc, updateDoc } from "firebase/firestore"

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

  const SearchRequest = ({setSearch} : {setSearch : (s : string)=> void}) => {

    const SubmitForm = (e : React.FormEvent<HTMLFormElement>) => {
      
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const inputSearch = formData.get("search") as string;
        if(!inputSearch || inputSearch === ""){
            return null;
        }

        setSearch(inputSearch);
    }

    return(
          <form onSubmit={SubmitForm}  className="relative mt-10">
            <input 
            type="search"
            placeholder="userId requestId userName name..."
            name="search"
            className="w-[700px] border border-gray-400 px-3 h-[30px] rounded-3xl p-3 pr-17 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 max-[850px]:w-[500px] max-[530px]:w-[310px] "
            />

            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2  cursor-pointer  w-[35px] transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                <i className="fa-solid fa-magnifying-glass text-[#1D4ED8]"></i>
            </button>
            </form>
    )
  }
const Requests = () => {

    const {requests} = useRequestsContext();
    const [search, setSearch] = useState<string | null>(null);

    let searchResult;

    if(search && search !== ""){
            searchResult = requests.filter((r)=>r.id.includes(search) || r.userId.includes(search) || r.userName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || r.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    }

    return(
        <section className="flex flex-col min-h-screen items-center">
            <h1 className="text-[2em] font-bold text-[#1D4ED8] mt-10">Client Requests</h1>

            <SearchRequest setSearch={setSearch}/>
            {requests.length === 0 
               ?
                  <div className="font-bold text-[#1D4ED8] mt-10 text-center">
                      No User Requests for now
                  </div>

                :  (!search || search === "") ? (
  <div className="flex flex-wrap justify-center items-center gap-10 mt-10 mb-15">
    {requests.map((request)=> <RequestCard request={request} key={request.id}/>)}
  </div>
) : searchResult?.length === 0 ? (
  <div>Not found</div>
) : (
  <div className="flex flex-wrap justify-center items-center gap-10 mt-10 mb-15">
    {searchResult?.map((request)=> <RequestCard request={request} key={request.id}/>)}
  </div>
)
                   
            }

        </section>
    )
}


export default memo(Requests);