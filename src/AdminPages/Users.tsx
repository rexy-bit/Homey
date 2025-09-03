import  { memo, useEffect, useState } from "react"
import { useUserContext } from "../Contexts/UserContext";
import type { User } from "../Contexts/Types";
import DeleteUserPop from "../AdminComponents/DeleteUserPop";


const UserCard = ({user, showPop, setShowPop} : {user : User, showPop : boolean, setShowPop : (b : boolean)=> void}) => {

    
    return(
        <>
        <div className="w-[250px] flex flex-col gap-1 border border-gray-400 rounded-lg p-2 h-[250px] justify-center">
            <p className="leading-4"><strong>UserId</strong> : <span className="w-[100px] text-center break-words">{user.id}</span></p>
            <p><strong>Name</strong> : {user.name}</p>
            <p><strong>Email</strong> : {user.email}</p>
            <p><strong>role</strong> : {user.role}</p>
            <button onClick={()=>setShowPop(true)} className="bg-red-600 text-white font-bold cursor-pointer transtion-opacity duration-200 hover:opacity-70 active:opacity-50 py-1 rounded-lg mt-2">Delete User</button>
        </div>

        {showPop && <DeleteUserPop setShowPop={setShowPop} user={user}/>}

        </>

    )
}


  const SearchUser = ({setSearch} : {setSearch : (s : string)=> void}) => {

    const SubmitForm = (e : React.FormEvent<HTMLFormElement>) => {
      
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const inputSearch = formData.get("search") as string;
        if(!inputSearch || inputSearch === ""){
            return null;
        }

        setSearch(inputSearch);
    }

    return(
          <form onSubmit={SubmitForm}  className="relative mt-10">
            <input 
            type="search"
            placeholder="userId userName, userEmail"
            name="search"
            className="w-[700px] border border-gray-400 px-3 h-[30px] rounded-3xl p-3 pr-17 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 max-[850px]:w-[500px] max-[530px]:w-[310px] "
            />

            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2  cursor-pointer  w-[35px] transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                <i className="fa-solid fa-magnifying-glass text-[#1D4ED8]"></i>
            </button>
            </form>
    )
  }
const Users = () => {

    const {users} = useUserContext();
    const [search, setSearch] = useState<string | null>(null);
    const [showPop, setShowPop] = useState<boolean>(()=>{
        const saved = localStorage.getItem("showPop");

        return saved ? JSON.parse(saved) : false;
    })

    useEffect(()=>{
        localStorage.setItem('showPop', JSON.stringify(showPop));
    }, [showPop]);


    let searchResult;

    if(search && search !== ""){
        searchResult = users.filter((u)=> u.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || u.email.includes(search) || u.id.includes(search));
    }

    return(

        <section className="flex flex-col min-h-screen items-center">
            <h1 className="text-[2em] font-bold text-[#1D4ED8] mt-10">Users</h1>

            <SearchUser setSearch={setSearch}/>

            {users.length === 0 
              ? <div>No Users</div>
              : (!search || search === "") ?
                 
                <div className="flex flex-wrap justify-center items-center gap-10 mt-10 mb-15">
                    {users.map((u)=>{
                        return(
                            <UserCard user={u} showPop={showPop} setShowPop={setShowPop} key={u.id}/>
                        );
                    })}
                </div>
                : searchResult.length === 0 ?
                   <div>Not found</div> : 
                      <div className="flex flex-wrap justify-center items-center gap-10 mt-10 mb-15">
                    {searchResult.map((u)=>{
                        return(
                            <UserCard user={u} showPop={showPop} setShowPop={setShowPop} key={u.id}/>
                        );
                    })}
                </div>
            }

            
        </section>
    )
}

export default memo(Users);