import { createContext, useContext, useState , useEffect} from "react";
import type { Propertie } from "./Types";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../Config/fireBase";

interface PropertieContextType{
    properties : Propertie[];
    setProperties : (p : Propertie[])=> void;
    loadingProperties : boolean;
}

const PropertieContext = createContext<PropertieContextType | null>(null);

export const PropertieProvider = ({children} : {children : React.ReactNode}) => {

    const [properties, setProperties] = useState<Propertie[]>([]);
    const [loadingProperties, setLoadingProperties] = useState<boolean>(false);

    const getPropertiesFormFirestore = async() => {

        const propertiesCollectionRef = collection(db, "properties");
        try{
            setLoadingProperties(false);
            const data = await getDocs(propertiesCollectionRef);

            const filteredData : Propertie[] = data.docs.map((doc)=>{
                return{
                    id : doc.id,
                    ...doc.data(),
                } as Propertie
                    
                
            });

            setProperties(filteredData);
            console.log(filteredData);
        }catch(err){
            console.error('Error in fetching properties from fireStore : ', err);
        }finally{
            setLoadingProperties(false);
        }
    }

    useEffect(()=>{
        getPropertiesFormFirestore();
    }, []);


    return(
        <PropertieContext.Provider value={{properties, setProperties, loadingProperties}}>
            {children}
        </PropertieContext.Provider>
    )
}

export const usePropertieContext = () => {
    const context = useContext(PropertieContext) ;

    if(!context) throw new Error("Use the usePropertieContext inside a PropertieProvider");

    return context;
}

