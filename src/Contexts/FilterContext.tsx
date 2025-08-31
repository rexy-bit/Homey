import { createContext, useContext, useEffect, useState } from "react";
import type { Filter } from "./Types";


interface FilterContextType{
    filter : Filter ;
    setFilter : (f : Filter ) => void;
}

const FilterContext = createContext<FilterContextType | null>(null);

export const FilterProvider = ({children} : {children : React.ReactNode}) => {

    const [filter, setFilter] = useState<Filter>(()=>{
        const saved = localStorage.getItem('filter');

        return saved ? JSON.parse(saved) : {
            type : "",
            city : "",
            service : ""
        };
    });

    useEffect(()=>{
        localStorage.setItem('filter', JSON.stringify(filter));
    }, [filter]);
    return(
        <FilterContext.Provider value={{filter, setFilter}}>
            {children}
        </FilterContext.Provider>
    );
}

export const useFilterContext = () => {
    
    const context = useContext(FilterContext);

    if(!context) throw new Error("use the useFilterContext inside a FilterProvider");

    return context;
}

