import React, { useState } from 'react';
import { Watch } from 'react-loader-spinner';
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [eye, setEye] = useState(false);
    const [loader, setLoader] = useState(false);
    const [loginInput, setLoginInput] = useState({
      email:"",
      password:"",
    })
    const [loginInputError, setLoginInputError] = useState({
      emailError:"",
      passwordError:"",
    })

     /*
    todo: handleEye function implement 
    ?params()
    */ 
    const handleEye=()=>{
        setEye(!eye)
    }

    /*
    todo: input onChange handler
    ?params(event)
    */ 
    const inputHandler=(event)=>{
      const {id,value} = event.target;
      setLoginInput({
        ...loginInput,
        [id] : value,
      })
    }

    /*
    todo: login button function implement
    ?params()
    */ 
    const loginHandler=()=>{
      const {email,password} = loginInput

        if(!email){
          setLoginInputError({
            ...loginInputError,
            emailError: 'Email missing or invalid!',
          })
        } else if (!password){
          setLoginInputError({
            ...loginInputError,
            emailError: '',
            passwordError:'Password missing or invalid!',
          })
        } else{
          setLoader(true)
          signInWithEmailAndPassword(auth,email,password).then((info)=>{
            navigate('/root/home')
            console.log("login done!");
          }).catch((err)=>{
            console.log("error");
            
          }).finally(()=>{
            setLoader(false);
            setLoginInputError({
              ...loginInputError,
              emailError:"",
              passwordError:"",
            });
            setLoginInput({
              ...loginInput,
              email:"",
              password:"",
            });
          })
        }
    }

  return (
    <div className='p-6 bg-[#ffffff1e] backdrop-blur-sm rounded-xl shadow-md shadow-[#00000049]'>
      <div>
      <h1 className='text-center text-3xl font-bold'>LET'S START <span className='font-mono bg-gradient-to-r from-customRed to-customIndigo bg-clip-text text-transparent'>ChatMate</span></h1>
      <p className='text-center text-md font-medium'>It's Free Forever</p>
      <h3 className='text-center text-xl font-bold uppercase mb-4'>have some nice chats!</h3>
      </div>
      <div>
        <form action="#" onSubmit={(e)=> e.preventDefault()}>
          <fieldset className='border border-white p-5'>
            <legend className='text-lg font-semibold px-2 '>Your Information</legend>
            <div className='mb-2'>
            <label htmlFor="email" className='block text-sm font-medium text-gray-800'>Email<span className='text-red-600'>*</span></label>
            <input type="text" id='email' name='email' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' onChange={inputHandler} value={loginInput.email}/>
            <span className='text-red-700 text-sm font-bold'>{loginInputError.emailError}</span>
            </div>

            <div>
            <div className='flex justify-between items-center'>
            <label htmlFor="password" className='block text-sm font-medium text-gray-800'>Password<span className='text-red-600'>*</span></label> 
            <span className='cursor-pointer text-indigo-800 mt-1' onClick={handleEye}>
              {
                eye? <PiEyeClosedDuotone /> : <FaRegEye />
              }
            </span>
            </div>
            <input type={eye? "text" : "password"} id='password' name='password' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' onChange={inputHandler} value={loginInput.password}/>
            <span className='text-red-700 text-sm font-bold'>{loginInputError.passwordError}</span>
            </div>
            <div>
              <button className='w-full flex justify-center items-center bg-gradient-to-r from-customRed to-customIndigo text-white mt-2 h-10 rounded-md' onClick={loginHandler}>
                {
                  loader? (
                    <span>
                      <Watch
                      visible={true}
                      height="20"
                      width="20"
                      radius="48"
                      color="#ffffff"
                      ariaLabel="watch-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      />
                    </span>
                  ) : (
                    "LOGIN"
                  )
                }
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default LoginForm