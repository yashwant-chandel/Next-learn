import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function logout(){
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    useState(()=>{
        // localStorage.removeItem('user');
        removeCookie('user',{
            path: '/',
        })
        
    })
   const router = useRouter();
   router.push('/auth/login');

}