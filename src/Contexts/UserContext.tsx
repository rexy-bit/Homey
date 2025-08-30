import { createContext, useState, useEffect, useContext } from "react";
import type { User } from "./Types";
import { auth, db, googleProvider } from "../Config/fireBase";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import type {User as FirebaseUser} from "firebase/auth";

interface UserContextType{
    users : User[];
    setUsers : (users : User[]) => void;
    user : User | null;
    setUser : (u : User | null) => void;
    signInLoading : boolean;
    setSignInLoading : (b : boolean)=> void;
    signInwithGoogle : ()=> void;
    initializing  : boolean;
    loadingUsers : boolean;
    logOut : ()=> void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({children} : {children : React.ReactNode}) => {

    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [signInLoading, setSignInLoading] = useState<boolean>(false);
    const [initializing, setInitializing] = useState<boolean>(true);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(false);

     const signInwithGoogle = async () => {
        

        try{
           setSignInLoading(true);
           const result = await signInWithPopup(auth, googleProvider);
           const signedInUser = result.user;

           const userRef = doc(db, "users", signedInUser.uid);
           const docSnap = await getDoc(userRef);

           if(!docSnap.exists()){
              const newUser : User = {
                id : signedInUser.uid,
                name : signedInUser.displayName || "",
                email : signedInUser.email || "",
                favorites : [],
                requests : [],
                role : "user"
              }

              await setDoc(userRef, newUser);
              setUser(newUser);
              
           }else{
              const existingUser = docSnap.data() as User;
              setUser(existingUser);
           }
           
        }catch(err){
            console.error('Error in Authentification : ', err);
        }finally{
            setSignInLoading(false);
        }
     }

     const logOut = async() => {
         
        try{
            setSignInLoading(true);
            await signOut(auth);
            setUser(null);
        }catch(err){
            console.error('Error in logOut : ', err);
        }finally{
            setSignInLoading(false);
        }
     }


       useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const firestoreUser = docSnap.data() as User;
          setUser(firestoreUser);
         
          
        } else {
          setUser(null);
          
        }
      } else {
        setUser(null);
        
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);


  const getUsersFromFireStore = async() => {

    const usersCollectionRef = collection(db, "users");

    try{
        setLoadingUsers(true);
        const data = await getDocs(usersCollectionRef);

        const filteredData : User[] = data.docs.map((doc)=>{
          return{
            ...(doc.data() as User)
          }
        });

        console.log(filteredData);
        setUsers(filteredData);
    }catch(err){
        console.error("Error in fetching users from fireStore : ", err);
    }finally{
        setLoadingUsers(false);
    }
    
  }

  useEffect(()=>{
    getUsersFromFireStore();
  }, []);


    return(
        <UserContext.Provider value={{user, setUser, users, setUsers, signInLoading, initializing, signInwithGoogle, loadingUsers, logOut, setSignInLoading}}>
            {children}
        </UserContext.Provider>
    );

}


export const useUserContext = () => {
      
    const context = useContext(UserContext);

    if(!context) throw new Error("Use the UserContext inside the UserProvider");

    return context;
}
