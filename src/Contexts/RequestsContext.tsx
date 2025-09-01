import { createContext, useContext, useEffect, useState } from "react";
import type { Request } from "./Types";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../Config/fireBase";


interface RequestContextType{
    requests : Request[];
    setRequests : (r : Request[]) => void;
    loadingRequests : boolean;
    setLoadingRequests : (b : boolean) => void;
}


const RequestContext = createContext<RequestContextType | null>(null);

export const RequestProvider = ({children} : {children : React.ReactNode}) => {

    const [requests, setRequests] = useState<Request[]>([]);
    const [loadingRequests, setLoadingRequests] = useState<boolean>(false);

    const getRequestsFromFireStore = async() => {

       setLoadingRequests(true);

        const requestsCollection = collection(db, "requests");
       try{
          const data = await getDocs(requestsCollection);

          const filteredData : Request[] = data.docs.map((doc)=>{
               return{
                 id : doc.id,
                 ...doc.data()
               } as Request
          });

          setRequests(filteredData);
       }catch(err){
        console.error('Error in fetching requests : ', err);
       }finally{
        setLoadingRequests(false);
       }

    }

    useEffect(()=>{
        getRequestsFromFireStore();
    }, []);

    return(

        <RequestContext.Provider value={{requests, setRequests, loadingRequests, setLoadingRequests}}>
            {children}
        </RequestContext.Provider>
    );
}


export const useRequestsContext = () => {
    const context = useContext(RequestContext);

    if(!context) throw new Error("use the useRequestsContext inside the RequestProvider");

    return context;
}