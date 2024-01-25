import { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
const bcrypt = require('bcryptjs');
import React, { useState } from "react";

 function Register(){
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const addTodoHandler = async (formData) => {
        const response = await fetch("/api/auth/register", {
            method: "POST", 
            body: JSON.stringify(formData),
            headers: {
                "content-Type" : "application/json"
            }
        }) 
        if(response.ok){
            const responsedata = await response.json();
            nameRef.current.value = '';
            emailRef.current.value = '';
            passwordRef.current.value = '';
            alert('Successfully registered');
        }
    }
    
         
    const formSubmitHandler =(e) =>{
        e.preventDefault();
        const password = bcrypt.hashSync(formData.password,10);
        const formData = {
            name: nameRef.current.value,
            email :emailRef.current.value,
            password :password
        }
       if(formData.name == ""){
            alert('name is empty');
           return false;
        }else if(formData.email == ""){
            alert('email is empty');
            return false;
        }else if(formData.password == ""){
            alert('password is empty');
           return false;
        }
        addTodoHandler(formData);
    }
    return (
        <>
         <div className="nk-app-root">
       
        <div className="nk-main ">
          
            <div className="nk-wrap nk-wrap-nosidebar">
                <div className="nk-content ">
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
                                            <input type="text" className="form-control form-control-lg" id="name" name="name" placeholder="Enter your name" ref={nameRef}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">Email or Username</label>
                                        <div className="form-control-wrap">
                                            <input type="email" className="form-control form-control-lg" id="email" name="email" placeholder="Enter your email address or username" ref={emailRef}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="password">Passcode</label>
                                        <div className="form-control-wrap">
                                            <a tabIndex="-1" href="#" className="form-icon form-icon-right passcode-switch lg" data-target="password">
                                                <em className="passcode-icon icon-show icon ni ni-eye"></em>
                                                <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                            </a>
                                            <input type="password" className="form-control form-control-lg" id="password" name="password" placeholder="Enter your passcode" ref={passwordRef}/>
                                        </div>
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