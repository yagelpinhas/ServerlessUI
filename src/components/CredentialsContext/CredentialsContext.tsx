import { createContext,useState, useEffect } from "react";
import React from 'react';
import { ContextStructure } from "./ContextStructure";
const CredentialsContext = createContext<ContextStructure >({} as ContextStructure)

function CredentialsProvider({children}:any){
    let [isLoggedIn,setIsLoggedIn] =useState(false);
    let [nameOfUser,setNameOfUser]=useState("")
    let [token,setToken]=useState("")
    useEffect(()=>{
        setIsLoggedIn(localStorage["isLoggedIn"]=="true"? true: false)
        setNameOfUser(localStorage["nameOfUser"])
        setToken(localStorage["token"])
      })
      const logout = function(): void{
        console.log("loggin out")
        setIsLoggedIn(false)
        setNameOfUser("")
        localStorage["isLoggedIn"]=false
        localStorage["nameOfUser"]=""
      }
      const login = function(nameOfUser: string, newToken: string): void{
        console.log("logging in")
        localStorage["isLoggedIn"]=true
        localStorage["nameOfUser"]=nameOfUser
        localStorage["token"]=newToken
        setIsLoggedIn(true)
        setNameOfUser(nameOfUser)
        setToken(newToken)
      }
      
    return (
        <CredentialsContext.Provider value={{isLoggedIn, nameOfUser,token,logout,login}}>{children} </CredentialsContext.Provider>
    )
}

export {CredentialsContext,CredentialsProvider}