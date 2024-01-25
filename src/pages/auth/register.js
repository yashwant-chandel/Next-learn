import { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
const bcrypt = require('bcryptjs');
import React, { useState } from "react";
import { useRouter } from "next/router";

 function Register(){
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
      });
    
      const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
      });

      const[redirectResponse, setRedirectResponse] = useState({
        error : '',
        success : '',
       });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '', // Clear the error when the user starts typing
        }));
      };

    const addTodoHandler = async (formData) => {
        const response = await fetch("/api/auth/register", {
            method: "POST", 
            body: JSON.stringify(formData),
            headers: {
                "content-Type" : "application/json"
            }
        }) 
         const responsedata = await response.json();
        if(response.ok){
            console.log(responsedata);
            setRedirectResponse({success:'Successfully registered'});
            formData.username = '';
            formData.email = '';
            formData.password = '';
            return responsedata;
        }else{
            setRedirectResponse({error:'Failed to register email already exist'});
        }
    }
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
    
        if (!formData.username.trim()) {
          newErrors.username = 'Username is required';
          valid = false;
        }
    
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
          valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Invalid email address';
          valid = false;
        }
    
        if (!formData.password.trim()) {
          newErrors.password = 'Password is required';
          valid = false;
        }
        setErrors(newErrors);
        return valid;
      };
    
         
    const formSubmitHandler =(e) =>{
        e.preventDefault();
        if(validateForm()){
          const formsubmit =  addTodoHandler(formData);
       
        console.log(formsubmit);
        }
       
    }
    return (
        <>
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
                                        <h5 className="nk-block-title">Register</h5>
                                        
                                    </div>
                                </div>
                                <form onSubmit={formSubmitHandler}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="name">Name</label>
                                        <div className="form-control-wrap">
                                            <input type="text" className="form-control form-control-lg" id="name" name="username" placeholder="Enter your name" value={formData.username} onChange={handleChange} />
                                        </div>
                                        <div className="text-danger">{errors.username}</div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">Email or Username</label>
                                        <div className="form-control-wrap">
                                            <input type="email" className="form-control form-control-lg" id="email" name="email" placeholder="Enter your email address or username" value={formData.email} onChange={handleChange}/>
                                        </div>
                                        <div className="text-danger">{errors.email}</div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="password">Passcode</label>
                                        <div className="form-control-wrap">
                                            <a tabIndex="-1" href="#" className="form-icon form-icon-right passcode-switch lg" data-target="password">
                                                <em className="passcode-icon icon-show icon ni ni-eye"></em>
                                                <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                            </a>
                                            <input type="password" className="form-control form-control-lg" id="password" name="password" placeholder="Enter your passcode" value={formData.password} onChange={handleChange} />
                                        </div>
                                        <div className="text-danger">{errors.password}</div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-lg btn-primary btn-block">Register</button>
                                    </div>
                                    </form>
                                <div className="form-note-s2 pt-4"> Already have an account ? <Link href="/auth/login"><strong>Sign in instead</strong></Link>
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

export default Register;