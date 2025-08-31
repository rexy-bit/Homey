import { Children, createContext, useContext, useState } from "react";


interface SearchContextType{
    search : string;
    setSearch : (s : string)=> void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({children} : {children : React.ReactNode}) => {

    const [search, setSearch] = useState<string>("");

    return(
        <SearchContext.Provider value={{search, setSearch}}>
            {children}
        </SearchContext.Provider>
    );
}


export const useSearchContext = () => {

    const context = useContext(SearchContext);

    if(!context) throw new Error("Use the useSearchContext inside the SearchProvider ");

    return context;
}