import React, { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { errorToast, infoToast, successToast } from '../../../toastify/toastify';
import { getDatabase, ref, set, push } from "firebase/database";
import moment from 'moment/moment.js';
import { Watch } from 'react-loader-spinner';
import { Link } from "react-router-dom";


const RegistrationForm = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [eye, setEye] = useState(false)
  const [signUpInput, setSignUpInput] = useState({
    fullName: '',
    email: '',
    password: '',
  })
  const [signUpInputError, setSignUpInputError] = useState({
    fullNameError: '',
    emailError: '',
    passwordError: '',
  })
  const [loader, setLoader] = useState(false);

  /*
  todo: handleEye function implement 
  ?params()
  */ 
  const handleEye=()=>{
    setEye(!eye)
  }

  /*
  todo: signUp input onChange handler
  ?params(item)
  */ 
  const inputOnChangeHandler=(event)=>{
    const {id, value} =event.target;

    setSignUpInput({
      ...signUpInput,
      [id] : value,
    })
  }
  /*
  todo:  submit button handler function implement
  ?params()
  */ 
  const handleSignUp=()=>{
    const {fullName,email,password} = signUpInput;

    if(!fullName){
      setSignUpInputError({
        ...signUpInputError,
        fullNameError: 'Fullname missing or invalid'
      })
    } else if(!email){
      setSignUpInputError({
        ...signUpInputError,
        fullNameError: '',
        emailError: 'Email missing or invalid'
      })
    } else if(!password){
      setSignUpInputError({
        ...signUpInputError,
        emailError: '',
        passwordError: 'Password missing or invalid'
      })
    } else{
      setLoader(true);
      createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
     successToast(`Mr. ${fullName}, registration done!`)
  }).then(()=>{
    updateProfile(auth.currentUser,{
      displayName: fullName,
    })
  }).then(()=>{
    sendEmailVerification(auth.currentUser).then(()=>{
      infoToast(`Mr. ${fullName}, pls check your email!`)
    })
  }).then(()=>{
    const dbref = ref(db, "users/");
    set(push(dbref),{
      userUid: auth.currentUser.uid,
      userEmail: auth.currentUser.email,
      userName: fullName,
      userPhotoUrl: "",
      createdAt: moment().format("DD MM YYYY, h:mm:ss a"),
    })
  }).catch((err)=>{
    errorToast(`Mr. ${fullName}, email already used!`)
  }).finally(()=>{
    setLoader(false);
    setSignUpInputError({
        ...signUpInputError,
        fullNameError:"",
        emailError:"",
        passwordError:"",
      });
    setSignUpInput({
      ...signUpInput,
      fullName:"",
      email:"",
      password:"",
    })
  })
      
    }
  }

  return (
    <div className='p-6 bg-[#ffffff1e] backdrop-blur-sm rounded-xl shadow-md shadow-[#00000049]'>
      <div>
      <h1 className='text-center text-xl md:text-3xl font-bold'>WELCOME TO <span className='font-mono bg-gradient-to-r from-customRed to-customIndigo bg-clip-text text-transparent'>ChatMate</span></h1>
      <p className='text-center text-md font-medium'>It's Free Forever</p>
      <h3 className='text-center text-lg md:text-2xl font-bold uppercase mb-4'>Just Sign Up Here</h3>
      </div>
      <div>
        <form action="#" onSubmit={(e)=> e.preventDefault()}>
          <fieldset className='border border-white p-5'>
            <legend className='text-lg font-semibold px-2 '>Your Information</legend>
            <div className='mb-2'>
            <label htmlFor="fullName" className='block text-sm font-medium text-gray-800'>Full Name<span className='text-red-600'>*</span></label>
            <input type="text" id='fullName' name='fullName' className='mt-1 capitalize block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' onChange={inputOnChangeHandler} value={signUpInput.fullName}/>
            <span className='text-red-700 text-sm font-bold'>{signUpInputError.fullNameError}</span>
            </div>
            
            <div className='mb-2'>
            <label htmlFor="email" className='block text-sm font-medium text-gray-800'>Email<span className='text-red-600'>*</span></label>
            <input type="text" id='email' name='email' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' onChange={inputOnChangeHandler} value={signUpInput.email}/>
            <span className='text-red-700 text-sm font-bold'>{signUpInputError.emailError}</span>
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
            <input type={eye? "text" : "password"} id='password' name='password' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' onChange={inputOnChangeHandler} value={signUpInput.password}/>
            <span className='text-red-700 text-sm font-bold'>{signUpInputError.passwordError}</span>
            </div>
            <div>
              <button className='w-full flex justify-center items-center bg-gradient-to-r from-customRed to-customIndigo text-white mt-2 h-10 rounded-md' onClick={()=>handleSignUp()}>
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
                    "SIGN UP"
                  )
                }
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <div>
        <h6 className='mt-1'>Already have an account? <span className='text-blue-900 cursor-pointer'><Link to={"/login"}>Login here.</Link></span></h6>
      </div>
    </div>
  )
}

export default RegistrationForm

// import React from 'react'

// const RegistrationForm = () => {
//   return (
//     <div className='w-[400px] h-[450px] bg-[#ffffff23] backdrop-blur-md rounded-xl shadow-md shadow-[#00000049] p-6'>
//       <div className='mb-6'>
//         <h1 className='text-center text-3xl font-bold'>WELCOME TO <span className='font-mono'>ChatMate</span></h1>
//       </div>
//       <div>
//         <form action="#">
//           <fieldset className='border border-gray-300 p-4 rounded-md'>
//             <legend className='text-lg font-semibold px-2'>Information</legend>
//             <div className='mb-4'>
//               <label htmlFor="fullName" className='block text-sm font-medium text-gray-700'>Full Name</label>
//               <input type="text" id='fullName' name='fullName' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'/>
//             </div>
//             <div>
//               <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
//               <input type="email" id='email' name='email' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'/>
//             </div>
//           </fieldset>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default RegistrationForm
