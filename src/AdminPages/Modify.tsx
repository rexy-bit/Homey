import { useNavigate, useParams } from "react-router-dom"
import { usePropertieContext } from "../Contexts/PropertiesContext";
import type { Propertie } from "../Contexts/Types";
import { memo, useEffect, useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {db} from "../Config/fireBase"

const Modify = () => {

    const {id} = useParams();

    const {properties, setProperties} = usePropertieContext();
    const [property, setProperty] = useState<Propertie | null>(null);
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(()=>{
       const p  = properties.find((p)=> p.id === id);

       setProperty(p || null);
    }, [id]);
    

    const handleFormChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>{
        const {name, value, type} = e.target;

        setProperty({
            ...property!,
            [name] : type === "number" ? Number(value) : value
        });

        
    }

      const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "city" | "address"
  ) => {
    const { value } = e.target;
    setProperty((prev) =>
      prev
        ? {
            ...prev,
            location: {
              ...prev.location,
              [field]: value,
            },
          }
        : null
    );
  };

  // --- GESTION DES TABLEAUX (images, features) ---
  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "images" | "features"
  ) => {
    const { value } = e.target;
    setProperty((prev) => {
      if (!prev) return null;
      const updatedArray = [...(prev[field] as string[])];
      updatedArray[index] = value;
      return {
        ...prev,
        [field]: updatedArray,
      };
    });
  };


    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

       if(!property) return null;

       if(!property.title || !property.description || !property.status || !property.service || !property.agentNumber || !property.features || !property.images || !property.location || !property.type || property.price === null || property.rooms === null || property.surface === null ){
        return null;
       }

       try{
        setLoadingUpdate(true);

        const propertyRef = doc(db, "properties", property.id);
        await updateDoc(propertyRef, {
            ...property
        });

        const newProperties = properties.map((p)=>{
            if(p.id === property.id){
                return{
                    ...property
                }
            }

            return p;
        });
          
        setProperties(newProperties);

         if(property.status === "Done"){
        await deleteIfDone();
       }

        
       }catch(err){
        console.error("Error in Modifying : ", err);
       }finally{
        setLoadingUpdate(false);
       }

      
    }


    const deleteIfDone = async() => {
        
        if(!property) return null;

        try{
            const docRef = doc(db, "properties", property.id);
            await deleteDoc(docRef);

            const newProperties = properties.filter((p)=> p.id !== property.id);
            setProperties(newProperties);

        }catch(err){
            console.error('Error in deleting the done status : ', err);
        }
        


    }
    return(
        <section className="min-h-screen flex flex-col items-center">
            <h1 className="mt-10 text-[2em] font-bold text-[#1D4ED8]">Modify Property</h1>

            <p className="mt-5 text-[1.3em] font-bold text-[#1D4ED8] max-[600px]:w-[300px] text-center">Property : {property?.title}</p>

            <form onSubmit={handleSubmit} className="flex flex-col mt-10 w-[700px] bg-blue-100 p-4 rounded-[10px] gap-5 mb-14 max-[750px]:w-[400px] max-[450px]:w-[300px] max-[450px]:px-2 py-5">
                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Title:</label>
                    <input 
                    type="text"
                    name="title"
                    value={property?.title}
                    onChange={handleFormChange}
                    className="inputType"
                    />
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Description:</label>
                    <input 
                    type="text"
                    name="description"
                    value={property?.description}
                    onChange={handleFormChange}
                    className="inputType"
                    />
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Type:</label>
                    <select name="type" id="type"
                    value={property?.type}
                    onChange={handleFormChange}
                    className="selectType"
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
                    onChange={handleFormChange}
                    className="inputType"
                    />
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Service:</label>
                    <select
                    name="service"
                    value={property?.service}
                    onChange={handleFormChange}
                    className="selectType"
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
                    onChange={handleFormChange}
                    className="selectType"
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
                    onChange={handleFormChange}
                    className="inputType"
                    />
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">City</label>
                    <input 
                    type="text" 
                    name="city"
                    value={property?.location.city}
                    onChange={(e) => handleLocationChange(e, "city")}
                    className="inputType"
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
                    />
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                    <label htmlFor="">Surface:</label>
                    <input type="number"
                    placeholder="e.g 400 sqm"
                    name="surface"
                    value={property?.surface}
                    onChange={handleFormChange}
                    className="inputType"
                    />
                </div>

                <div className="mt-9">
                    <label htmlFor="">Images:</label>
                    <div className="flex flex-col gap-5">
                    {property?.images.map((image, i)=>{
                        return(
                            <div className="flex flex-row w-full justify-between items-center">
                                <label htmlFor="">Image {i+1}:</label>
                                <input 
                                type="text" 
                                name="image"
                                value={image}
                                className="inputType"
                                 onChange={(e) => handleArrayChange(e, i, "images")}
                                />
                            </div>
                        )
                    })}
                    </div>
                </div>

                 <div className="mt-9">
                    <label htmlFor="">Features:</label>
                    <div className="flex flex-col gap-5">
                    {property?.features.map((f, i)=>{
                        return(
                            <div className="flex flex-row w-full justify-between items-center">
                                <label htmlFor="">Feature {i+1}:</label>
                                <input 
                                type="text" 
                                name="feature"
                                value={f}
                                className="inputType"
                               onChange={(e) => handleArrayChange(e, i, "features")}
                                />
                            </div>
                        )
                    })}
                    </div>
                </div>

                <button type="submit" disabled={loadingUpdate} className="px-2 py-1 text-white bg-[#1D4ED8] rounded-lg transition-opacity duration-200 hover:opacity-70 active:opacity-50 cursor-pointer mt-5 font-bold">
                    {loadingUpdate ?<span className=" font-bold">Updating <i className="fa-solid fa-spinner fa-spin-pulse  "></i> </span>: "Modify"}
                </button>
            </form>

                         <button className="px-3 py-1 bg-[#1D4ED8] text-white font-bold rounded-3xl fixed top-16 left-3 cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" onClick={()=>navigate(-1)}>&#8592; Back</button>
        </section>
    )
}

export default memo(Modify);