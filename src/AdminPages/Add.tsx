import { memo, useState, useRef } from "react"
import type { Propertie } from "../Contexts/Types"
import { addDoc, collection, updateDoc } from "firebase/firestore";
import {db} from "../Config/fireBase"
import { usePropertieContext } from "../Contexts/PropertiesContext";
import { useNavigate } from "react-router-dom";



const Add = () => {

      const [property, setProperty] = useState<Propertie>({
    id: "",
    title: "",
    description: "",
    type: "",
    rooms: 0,
    service: "",
    status: "",
    price: 0,
    location: { city: "", address: "" },
    surface: 0,
    features: [],
    images: [],
    agentNumber: ""
  });
     const {properties, setProperties} = usePropertieContext();
     const [image, setImage] = useState<string>("");
     const [feature, setFeatures] = useState<string>("");
     const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
     const timeoutId = useRef<NodeJS.Timeout | null>(null);
     const [msg, setMsg] = useState({text : "", color : "red", show : false});
     const navigate = useNavigate();
    

     const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {

        const {name, value, type} = e.target;

        setProperty({
            ...property!,
            [name] : type === "number" ? Number(value) : value
        });
     }

     const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {

          e.preventDefault();

       if(!property) return null;

       if(!property.title || !property.description || !property.status || !property.service || !property.agentNumber || !property.features || !property.images || !property.location || !property.type || property.price === null || property.rooms === null || property.surface === null ||   property.features.length === 0 ||
  property.images.length === 0){
        
        setMsg({
            text : "Please enter all the necessary ans correct information",
            color : "red",
            show : true
        });
        if(timeoutId.current) clearTimeout(timeoutId.current);

        setTimeout(()=>{
           setMsg(prev => ({
            ...prev,
            show : false
           })) ;

        }, 3000);

       }


       try{
          setLoadingAdd(true);
          const docRef = await addDoc(collection(db, "properties"), property);
          await updateDoc(docRef, {
            ...property,
            id : docRef.id
          });

          const newProperties = [...properties, {
            ...property,
            id : docRef.id
          }];

          setProperties(newProperties);

          setProperty({
    id: "",
    title: "",
    description: "",
    type: "",
    rooms: 0,
    service: "",
    status: "",
    price: 0,
    location: { city: "", address: "" },
    surface: 0,
    features: [],
    images: [],
    agentNumber: ""
  })

          if(timeoutId.current) clearTimeout(timeoutId.current);

           setMsg({
            text : "Property Added with success you will be to the menu to see changes",
            color : "#1D4ED8",
            show : true
        });
        if(timeoutId.current) clearTimeout(timeoutId.current);

        setTimeout(()=>{
           setMsg(prev => ({
            ...prev,
            show : false
           })) ;

        }, 3000);


        }catch(err){
            console.error('Error in Adding : ', err);
        }finally{
            setLoadingAdd(false);
        }

     }

       const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "city" | "address"
  ) => {
    const { value } = e.target;
    setProperty((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value }
    }));
  };

     
    return(
                <section className="min-h-screen flex flex-col items-center">
            <h1 className="mt-10 text-[2em] font-bold text-[#1D4ED8]">Add a Property</h1>

            <form onSubmit={handleSubmit}  className="flex flex-col mt-10 w-[700px] bg-blue-100 p-4 rounded-[10px] gap-5 mb-14 max-[750px]:w-[400px] max-[450px]:w-[300px] max-[450px]:px-2 py-5">
                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Title:</label>
                    <input 
                    type="text"
                    name="title"
                    placeholder="Enter title..."
                    onChange={handleChange}
                    className="inputType"
                    required
                    />
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Description:</label>
                    <input 
                    type="text"
                    name="description"
                    placeholder="Enter description..."
                    onChange={handleChange}
                    className="inputType"
                    required
                    />
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Type:</label>
                    <select name="type" id="type"
                    onChange={handleChange}
                    className="selectType"
                    required
                    >
                        <option value="">Select an option</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Land">Land</option>
                    </select>
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Rooms</label>
                    <input 
                    type="number" 
                    name="rooms"
                    value={property?.rooms}
                    onChange={handleChange}
                    className="inputType"
                    required
                    />
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Service:</label>
                    <select
                    name="service"
                    value={property?.service}
                    onChange={handleChange}
                    className="selectType"
                    required
                    >
                        <option value="">Select a service</option>
                        <option value="Rent">Rent</option>
                        <option value="Sale">Sale</option>
                    </select>
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Status</label>                
                    <select
                    name="status"
                    value={property?.status}
                    onChange={handleChange}
                    className="selectType"
                    required
                    >
                        <option value="">Select a status</option>
                        <option value="Available">Available</option>
                        <option value="Done">Done</option>
                    </select>
                    
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Price :</label>
                    <input 
                    type="text" 
                    name="price"
                    value={property?.price}
                    onChange={handleChange}
                    className="inputType"
                    required
                    />
                </div>

                <div className="flex flex-row justify-between items-center">
                    <p>Features:</p>
                    <input 
                    type="text" 
                    value={feature}
                    onChange={(e)=> setFeatures(e.target.value)}
                    className="border border-gray-400 rounded-[5px] bg-gray-100 px-1 py-1 w-[400px] max-[750px]:w-[200px] max-[450px]:w-[150px]"
                 
                    />

                    <button
                        type="button"
                        className="transtion-opacity duration-200 hover:opacity-70 active:opacity-50 cursor-pointer font-bold bg-[#1D4ED8] text-white px-3 h-[35px] rounded-3xl"
                        onClick={() => {
                        if (feature.trim()) {
                            setProperty({ ...property!, features: [...(property?.features|| []), feature.trim()] });
                            setFeatures("");
                        }
                        }}
                    >
                        Add
                    </button>
                </div>

                 <img src={image} className="h-[100px] w-[200px] object-cover" alt="" />
                <div className="flex flex-row justify-between items-center">
                    <p>Images:</p>

                    <input 
                    type="text" 
                    value={image}
                    onChange={(e)=> setImage(e.target.value)}
                     className="border border-gray-400 rounded-[5px] bg-gray-100 px-1 py-1 w-[400px] max-[750px]:w-[200px] max-[450px]:w-[150px]"
                   
                    />

                    <button
                        type="button"
                        className="transtion-opacity duration-200 hover:opacity-70 active:opacity-50 cursor-pointer font-bold bg-[#1D4ED8] text-white px-3 h-[35px] rounded-3xl"
                        onClick={() => {
                        if (image.trim()) {
                            setProperty({ ...property!, images: [...(property?.images|| []), image.trim()] });
                            setImage("");
                        }
                        }}
                    >
                        Add
                    </button>
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">City</label>
                    <input 
                    type="text" 
                    name="city"
                    value={property?.location.city}
                    onChange={(e) => handleLocationChange(e, "city")}
                    className="inputType"
                    required
                    />
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Address:</label>
                    <input 
                    type="text" 
                    name="address"
                    value={property?.location.address}
                    onChange={(e) => handleLocationChange(e, "address")}
                    className="inputType"
                    required
                    />
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Surface:</label>
                    <input type="number"
                    placeholder="e.g 400 sqm"
                    name="surface"
                    value={property?.surface}
                    onChange={handleChange}
                    className="inputType"
                    required
                    />
                </div>

                    <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Agent Number:</label>
                    <input type="text"
                    placeholder="+ 213 56.."
                    name="agentNumber"
                    value={property?.agentNumber}
                    onChange={handleChange}
                    className="inputType"
                    required
                    />
                </div>

             

                 

                <button type="submit" disabled={loadingAdd} className="px-2 py-1 text-white bg-[#1D4ED8] rounded-lg transition-opacity duration-200 hover:opacity-70 active:opacity-50 cursor-pointer mt-5 font-bold">
                    {loadingAdd?<span className=" font-bold">Updating <i className="fa-solid fa-spinner fa-spin-pulse  "></i> </span>: "Add"}
                </button>
            </form>

            {msg.show && <p style={{color : msg.color}}>{msg.text}</p>}

                         <button className="px-3 py-1 bg-[#1D4ED8] text-white font-bold rounded-3xl fixed top-16 left-3 cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" onClick={()=>navigate(-1)}>&#8592; Back</button>
        </section>
    )
}

export default memo(Add);