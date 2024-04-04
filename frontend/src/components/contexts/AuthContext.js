import React ,{ useContext, useEffect, useState } from "react";

const AuthContext = React.createContext()
export function useAuth(){
    return useContext(AuthContext);
}
export function AuthProvider(props){
    const [authUser, setauthUser] = useState(null);
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const value = {
        authUser,
        setauthUser,
        isLoggedIn,
        setisLoggedIn,
    };
    return(
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}