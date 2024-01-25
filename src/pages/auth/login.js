import Link from "next/link";
import React,{useState} from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function Login(req,res){

const [cookies, setCookie, removeCookie] = useCookies(['user']);
// setCookie('user', true, {
//     path: '/',
//   })
// console.log(cookies.user);
    const router = useRouter();
    const[formData, setFormData] = useState({
        email:'',
        password: ''
    });
    const[formError, setFormError] = useState({
        email: '',
        password: ''
    });
    const [redirectResponse, setredirectResponse] = useState({
        error: '',
        success: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setFormError((prevErrors) => ({
          ...prevErrors,
          [name]: '', // Clear the error when the user starts typing
        }));
      };


    const addTodoHandler = async (formData) => {
        const response = await fetch("/api/auth/login", {
            method: "POST", 
            body: JSON.stringify(formData),
            headers: {
                "content-Type" : "application/json"
            }
        }) 
         const responsedata = await response.json();
        if(response.ok){
            setredirectResponse({success:'Successfully loggedin'});
            formData.username = '';
            formData.email = '';
            formData.password = '';
            setCookie('user', JSON.stringify(responsedata.success), {
                path: '/',
              })
            router.push('/home');
            
        }else{
            setredirectResponse({error:'Failed to register email already exist'});
            return false;
        }
    }

    const validateForm =() =>{
        let valid = true;
        const errors = {};

        if(!formData.email.trim()){
            valid = false;
            errors.email = 'Email is required';
        }

        if(!formData.password.trim()){
            valid = false;
            errors.password = 'Password is required';
        }
        setFormError(errors);
        return valid;
    }

   
    const formSubmitHandler =(e) =>{
        e.preventDefault();
       if(validateForm()){
        const response = addTodoHandler(formData);
       }
        
    }

    return (
        <>
         {/* <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" /> */}
         {/* <link href="../public/admin-theme/assets/css/dashlite.css" rel="stylesheet" /> */}
         {/* <Dashlite/> */}
           <div className="nk-app-root">
       <div className="nk-main ">
         
           <div className="nk-wrap nk-wrap-nosidebar">
               <div className="nk-content ">
                    <div className="text-danger text-center">{redirectResponse.error}</div>
                    <div className="text-center text-success">{redirectResponse.success}</div>
                   <div className="nk-split nk-split-page nk-split-lg d-flex justify-content-center">
                       <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white w-lg-45">
                           <div className="absolute-top-right d-lg-none p-3 p-sm-5">
                               <a href="#" className="toggle btn btn-white btn-icon btn-light" data-target="athPromo"><em className="icon ni ni-info"></em></a>
                           </div>
                           <div className="nk-block nk-block-middle nk-auth-body ">
                               <div className="nk-block-head">
                                   <div className="nk-block-head-content">
                                       <h5 className="nk-block-title">Login</h5>
                                   </div>
                               </div>
                               <form onSubmit={formSubmitHandler}>
                                 
                                   <div className="form-group">
                                       <label className="form-label" htmlFor="email">Email or Username</label>
                                       <div className="form-control-wrap">
                                           <input type="email" className="form-control form-control-lg" id="email" name="email" placeholder="Enter your email address or username" value={formData.email} onChange={handleChange}/>
                                       </div>
                                       <div className="text-danger">{formError.email}</div>
                                   </div>
                                   <div className="form-group">
                                       <label className="form-label" htmlFor="password">Passcode</label>
                                       <div className="form-control-wrap">
                                           <a tabIndex="-1" href="#" className="form-icon form-icon-right passcode-switch lg" data-target="password" >
                                               <em className="passcode-icon icon-show icon ni ni-eye"></em>
                                               <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                           </a>
                                           <input type="password" className="form-control form-control-lg" id="password" name="password" placeholder="Enter your passcode" value={formData.password} onChange={handleChange}/>
                                       </div>
                                       <div className="text-danger">{formError.password}</div>
                                   </div>
                                   <div className="form-group">
                                       <button className="btn btn-lg btn-primary btn-block">Login</button>
                                   </div>
                                   </form>
                               <div className="form-note-s2 pt-4"> Don't have an account ? <Link href="/auth/register"><strong>Register instead</strong></Link>
                               </div>
                           </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
   
  </div>
        </>
    );
}

