import React, { createContext, useState } from "react";

export const LoginContext = createContext()

 
 export default function LoginContextProvider(props) {
   const [isLoggedin,setIsloggedIn] = useState(false)
   return (
     <div>
         <LoginContext.Provider value={{isLoggedin,setIsloggedIn:setIsloggedIn}}>
            {props.children}
         </LoginContext.Provider>
     </div>
   )
 }
 