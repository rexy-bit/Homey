import { memo } from "react";
import { useFilterContext } from "../../Contexts/FilterContext"
import { useNavigate } from "react-router-dom";


const FilterComponent = () => {

    const {filter,setFilter} = useFilterContext();
    const navigate = useNavigate();

    const handleFIlterChange = (e : React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {

        const {name, value} = e.target;
        setFilter({
            ...filter,
            [name] : value
        });

        
    }

    return(
        <div className="flex flex-col justify-center gap-4  mt-8 border-2 p-2 rounded-lg py-5 border-[#1D4ED8] bg-blue-50 w-[300px]">

            <h1 className="text-center font-bold text-[#1D4ED8] text-[1.5em] underline">Filter</h1>
            <div className="flex flex-row items-center justify-between w-full
            ">
                <p className="font-bold text-[#1D4ED8]">Property Type :</p>
                <select id="type" name="type" value={filter.type} onChange={handleFIlterChange}
                className="px-1 border border-[#1D4ED8] py-1 rounded-3xl text-gray-500 w-[150px]"
                >
                    <option value="">Select a property type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Land">Land</option>

                </select>

            </div>
            <div className="flex flex-row  gap-2 items-center justify-between w-full">
                <p className="font-bold text-[#1D4ED8]">City : </p>
                   <input 
                   type="text" 
                   name="city"
                   value={filter.city}
                   placeholder="Enter city name"
                   onChange={handleFIlterChange}
                   className="w-[150px] border border-[#1D4ED8] rounded-lg px-2 py-1 bg-gray-100 "
                   />
            </div>

            <div className="flex flex-row  gap-2 items-center justify-between w-full">
                <p className="font-bold text-[#1D4ED8]">Service : </p>
                   <select id="service" name="service" value={filter.service} onChange={handleFIlterChange}
                    className="px-1 border border-[#1D4ED8] py-1 rounded-3xl text-gray-500 w-[150px]"
                   >
                    <option value="">Select a service</option>
                    <option value="Sale">Sale</option>
                    <option value="Rent">Rent</option>
                    

                    </select>
            </div>

            <button className="text-white bg-[#1D4ED8] px-3 py-2 font-bold rounded-lg mt-2 cursor-pointer transition-all duration-300 hover:text-[#1D4ED8] hover:bg-white hover:border hover:border-[#1D4ED8] active:opacity-70 " onClick={()=> {
                if(filter.city.trim() === "" || filter.service.trim() === "" || filter.type.trim() === ""){
                    return null;
                }else{
                    navigate('/filter');
                }
            }}>Filter</button>
        </div>
    )
}

export default memo(FilterComponent);