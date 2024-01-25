import axios from "axios";
import React, {useState, useEffect} from "react";
const MyComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      // Fetch data from the API
      fetchData();
    }, []);
    const fetchData = async () => {
        try {
          // Using Axios
        //   const response = await axios.get('http://localhost:3001/api/hello');
        const response = await fetch('http://localhost:3001/api/hello', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Specify the content type
              // Add any additional headers if needed
            },
            body: JSON.stringify({
              key1: '643d44dd247b0bed5e02ea59',
              key2: 'prod_NjKStsXc1Ig2sM',
              // Add any data you want to send in the request body
            }),
          });
        // console.log(response);
        // setData(response.data);
          if(response.ok){
            const getdata = await response.json();
            // console.log(getdata);
            setData(getdata);
          }else{
            console.log('failed');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    return (
    <>Home Page { JSON.stringify(data,null,2) } </>
    );
}
export default MyComponent;