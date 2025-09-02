import { memo, useState, useRef } from "react"
import type { Request } from "../../Contexts/Types"
import { useRequestsContext } from "../../Contexts/RequestsContext";
import {db} from "../../Config/fireBase"
import { addDoc, collection,  updateDoc } from "firebase/firestore";
import { useUserContext } from "../../Contexts/UserContext";


const FormComponent = () => {

    const [request, setRequest] = useState<Request>({
        id : "",
        userId : "",
        userName : "",
        name : "",
        email : "",
        number : "",
        service : "",
        details : "",
        requestDate : "",
        status : "unCkecked",
    });
    const {user} = useUserContext();

    const {requests,setRequests, loadingRequests, setLoadingRequests} = useRequestsContext();

    const [msg, setMsg] = useState({text : "", color : "#1D4ED8", show : false});
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    const handleOnChangeForm = (e : React.ChangeEvent<HTMLFormElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

    
        setRequest({
            ...request,
            [name] : value
        });

        
    }

    const submitForm = async(e : React.ChangeEvent<HTMLFormElement>) => {

        e.preventDefault();

        if(!request) return null;

        if(!request.name || !request.email || !request.number || !request.service){
            return null;
        }

       try{
        setLoadingRequests(true);
        
        const docRef = await addDoc(collection(db, "requests"), {
            userName: user ? user.name : "No user",
            userId : user? user.id : "No user",
            name : request.name,
            email : request.email,
            number : request.number,
            service : request.service,
            details : request.details,
            requestDate : new Date().toISOString().split("T")[0] ,
            status : "unChecked"
        })

        await updateDoc(docRef, {
            id : docRef.id
        });

        const newRequests  = [...requests, {
                        id : docRef.id,
              userName: user ? user.name : "No user",
            userId : user? user.id : "No user",
            name : request.name,
            email : request.email,
            number : request.number,
            service : request.service,
            details : request.details,
            requestDate : new Date().toISOString().split("T")[0],
            status : "unChecked"
        }]

        setRequests(newRequests);

                setRequest({
                    id: "",
                    userId: "",
                    userName: "",
                    name: "",
                    email: "",
                    number: "",
                    service: "",
                    details: "",
                    requestDate: "",
                    status : "unChecked"
                    });


        setMsg({
            text : "Request sent succesfuly, you will recieve a phone call or an email from one of our experts",
            show : true,
            color : "#1D4ED8"
        });

        if(timeoutId.current) clearTimeout(timeoutId.current);

        timeoutId.current = setTimeout(()=>{
            
            setMsg({
                ...msg,
                show : false
            });

        }, 5000);

       }catch(err){
        console.error('Error : ', err);
       }finally{
        setLoadingRequests(false);
       }
        
    }
    return(
        <section className="flex flex-col w-full items-center" id="form">
           <h1 className="mt-18 text-[2em] font-bold text-[#1D4ED8] max-[800px]:w-[300px] text-center">Contact Us for a Service</h1>
           <div className="w-[1000px] flex flex-row items-center gap-10 mt-10 max-[1050px]:w-[700px] max-[750px]:flex-col">
               <p className="text-[1.1em] text-gray-800 font-bold max-[1050px]:text-[1em] max-[1050px]:w-[300px] justify-center max-[750px]:text-center slideLeft"> 
                Looking for tailored support with your property needs? Fill out the form below and our team will get back to you as soon as possible. Whether it’s property management, rental assistance, or investment guidance, we’re here to provide the right solution for you.
               </p>
               <img src="/contactService.jpg" alt="" className="w-[600px] h-[300px] object-cover rounded-lg max-[1050px]:w-[300px] max-[1050px]:h-[150px] slideRight"/>
           </div>


           <div className="mt-15 flex flex-col justify-center items-center mb-15">
              <h1 className="text-[#1D4ED8] text-[1.5em] font-bold mt-5">Fill the form below</h1>

              <div className="h-[40px] w-[300px] flex justify-center items-center">
                {loadingRequests 
                   ?
                     <div><i className="fa-solid fa-spinner fa-spin-pulse text-[2em] text-[#1D4ED8] "></i></div>
                     : msg.show && <p style={{color : msg.color}} className="text-center  mt-5 leading-4">{msg.text}</p>
                }
              </div>

              <form onSubmit={submitForm} className="flex flex-col gap-5 mt-5 p-4 border-2 border-[#1D4ED8] rounded-xl w-[800px] max-[820px]:w-[500px] max-[820px]:p-2 max-[520px]:w-[300px]">
                <div className="flex flex-row justify-between items-center">
                    <label htmlFor="">Full Name:</label>
                    <input 
                    type="text" 
                    name="name"
                    placeholder="full name"
                    className="text-[0.9em] border border-gray-400 p-1 rounded-[5px] w-[500px] max-[820px]:w-[300px] max-[520px]:w-[150px]"
                    value={request.name}
                    onChange={handleOnChangeForm}
                    required
                    />
                </div>

                <div className="flex flex-row justify-between items-center">
                    <label htmlFor="">Email Address:</label>
                    <input 
                    type="email" 
                    name="email"
                    placeholder="e.g homey@example.com"
                    className="text-[0.9em] border border-gray-400 p-1 rounded-[5px] w-[500px] max-[820px]:w-[300px] max-[520px]:w-[150px]"
                    value={request.email}
                    onChange={handleOnChangeForm}
                    required/>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <label htmlFor="">Phone Number:</label>
                    <input 
                    type="tel" 
                    name="number" 
                    placeholder="Enter your phone number" 
                    className="text-[0.9em] border border-gray-400 p-1 rounded-[5px] w-[500px] max-[820px]:w-[300px] max-[520px]:w-[150px]"
                    value={request.number}
                    onChange={handleOnChangeForm}
                    required/>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <label htmlFor="">Service Requested:</label>
                    <select name="service" id="service"
                    className="text-[0.9em] border border-gray-400 p-1 rounded-[5px] w-[500px] max-[820px]:w-[300px] max-[520px]:w-[150px]"
                    value={request.service}
                    onChange={handleOnChangeForm}
                    required>
                        <option value="">Select a Service</option>
                        <option value="Property Sales">Property Sales</option>
                        <option value="Property Purchase">Property Purchase</option>
                        <option value="Rental Assistance">Rental Assistance</option>
                        <option value="Rental Management">Rental Management</option>
                    </select>
                </div>

                <div className="flex flex-row justify-between">
                    <label htmlFor="">Details:</label>
                    <textarea 
                    name="details" 
                    id="details" 
                    className="text-[0.9em] border border-gray-400 p-1 rounded-[5px] w-[500px] max-[820px]:w-[300px] max-[520px]:w-[150px]"
                    value={request.details}
                    onChange={handleOnChangeForm}
                    ></textarea>
                </div>

                <button type="submit" className="
                   text-white bg-[#1D4ED8] py-2 rounded-xl font-bold cursor-pointer mt-4 transition-all duration-300 border hover:bg-white hover:text-[#1D4ED8] hover:border-[#1D4ED8] active:opacity-70
                ">Submit Form</button>
              </form>
           </div>
        </section>
    )
}

export default memo(FormComponent);