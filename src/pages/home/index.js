import React,{ useState, useEffect } from "react"
import { Middleware } from "next/dist/lib/load-custom-routes";
import home from "./[slug]";
import index from '../index'
import Link from "next/link";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
// import Authenticated from '../middleware/isAuthenticate'
import Cookies from "cookies";
import { resolve } from "path";
// const authencticate = require('../middleware/isAuthenticate')
const ProtectedPage =() =>{
    //  console.log(authencticate);
    console.log(process.env.MONGODB_PATH);
    const [userValue, setUserValue] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [productsData, setProductsData] = useState({});
    const router = useRouter();
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('api/hello');
            const data = await result.json();
            
            setProductsData(data.responseData);
            // Do something with the data
          };
          fetchData();

      const user = cookies.user;
            setUserValue(user);
      },[cookies]);

    // console.log(Array.isArray(productsData));
     
    return (
        <>
            Home Page userdata : {userValue ? <p>{userValue._id}</p> : <p>Loading...</p>}
            <Link href={'/auth/logout'}>Logout</Link>
            {Array.isArray(productsData) ? (
                    productsData.map((post, index) => (
                        <div key={index}>
                        {/* {console.log(post._id + " here")} */}
                        <h1>{post._id}</h1>
                        </div>
                    ))
                    ) : (
                    <p>Loading...</p>
                    )}

        </>
    )
}
export default ProtectedPage;