import React, { createContext, useState } from 'react'
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext({
    user: null,
    handleLogin : (token) =>{},
    handleLogout : () =>{}
})

const AuthProvider = ({chidlren}) => {
    const[user, setUser] = useState(null)
    const handleLogin = (token) =>{
        const decodedToken = jwtDecode(token) 
        localStorage.setItem("userId", decodedToken.sub)
        localStorage.setItem("userRole", decodedToken.roles)
        localStorage.setItem("token", token)
        setUser(decodedToken)
    }

    const handleLogout = (token) =>{
        localStorage.removeItem("userId")
        localStorage.removeItem("userRole")
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, handleLogin, handleLogout}}>
            {chidlren}
        </AuthContext.Provider>
    )
}

export default AuthProvider
