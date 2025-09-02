import { memo } from "react"
import { useSearchAdminProperty } from "../../AdminContext/SearchAdminPropertie"
import { useNavigate } from "react-router-dom";


const SearchModify = () => {

    const {setSearchP} = useSearchAdminProperty();

    const navigate = useNavigate();

    const handleSubmit = (e  : React.ChangeEvent<HTMLFormElement>) => {

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const inputSearch = formData.get("search") as string;

        if(!inputSearch || inputSearch === ""){
            return null;
        }

        setSearchP(inputSearch);
    }

    return(
        <div className="flex flex-row justify-center items-center gap-5 mt-10 max-[600px]:gap-2">
            <button className="px-2 py-1 bg-[#1D4ED8] text-white font-bold rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50"
            onClick={()=>navigate("/admin/add")}
            >+ add a property</button>

           <form onSubmit={handleSubmit} className="relative">
            <input 
            type="search"
            placeholder="Id location city ..."
            name="search"
            className="w-[400px] border border-gray-400 px-3 h-[30px] rounded-3xl p-3 pr-17 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 max-[850px]:w-[300px] max-[500px]:w-[200px] "
            />

            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2  cursor-pointer  w-[35px] transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                <i className="fa-solid fa-magnifying-glass text-[#1D4ED8]"></i>
            </button>
            </form>
        </div>
    )
}

export default memo(SearchModify);