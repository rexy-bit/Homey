import { Children, createContext, useContext, useState } from "react";
import type { Propertie } from "../Contexts/Types";


interface SearchAdminPropertieType{
    searchP : string;
    setSearchP : (s : string) => void;
}


const SearchAdminPropertyContext = createContext<SearchAdminPropertieType | null>(null);

export const SearchAdminPropertyProvider = ({children} : {children : React.ReactNode}) => {
    const [searchP, setSearchP] = useState<string>("");

    return(
        <SearchAdminPropertyContext.Provider value={{searchP, setSearchP}}>
            {children}
        </SearchAdminPropertyContext.Provider>
    )
}


export const useSearchAdminProperty = () => {

    const context = useContext(SearchAdminPropertyContext);

    if(!context) throw new Error("use the useSearchAdminProperty inside its big provider");

    return context;
}