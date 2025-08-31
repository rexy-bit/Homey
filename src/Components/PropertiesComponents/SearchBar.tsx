import { memo } from "react"
import { useSearchContext } from "../../Contexts/SearchContext";
import type { ReactFormState } from "react-dom/client";
import { useNavigate } from "react-router-dom";



const SearchBar = () => {

    const navigate = useNavigate();

    const {setSearch} = useSearchContext();

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const inputSearch = formData.get("search") as string;

        if(!inputSearch || inputSearch === ""){
            return;
        }

        setSearch(inputSearch);
        navigate("/search");
    }

    return(
        <nav className="fixed top-[55px] w-full flex flex-row justify-center items-center h-[52px] bg-blue-200 z-[20]">
           <form onSubmit={handleSubmit} className="flex flex-row justify-center items-center gap-0">
              <input 
              type="search"
              name="search"
              placeholder="Propertie type, location..."
              className="w-[700px] h-[35px] border border-[#1D4ED8] px-3 rounded-3xl bg-gray-50 max-[800px]:w-[400px] max-[500px]:w-[250px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-[#1D4ED8] text-white font-bold h-[35px] w-[50px] rounded-r-full ml-[-25px] cursor-pointer transition-all duration-200 hover:bg-blue-500 active:bg-blue-400"><i className="fa-solid fa-magnifying-glass"></i></button>
           </form>
        </nav>
    )
}

export default memo(SearchBar);