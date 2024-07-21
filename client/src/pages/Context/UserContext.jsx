
import {createContext,useContext,useState} from 'react'

const userContext= createContext()

export const ContextProvider=({children})=>{

    const [user,setUser]=useState(null)

    return (
        <userContext.Provider value={{user,setUser}}>
            {children}
        </userContext.Provider>
    )
}

export const useUserContext =()=>{
    return useContext(userContext)    //just return the useContext , tf all states are accesible via the function name
}

