import React from 'react';
import RegistrationLeft from '../../components/registrationCom/RegistrationLeft';
import RegistrationRight from '../../components/registrationCom/RegistrationRight';
import blocked from '../../assets/blocked.png';
import LoginForm from '../../components/loginCom/LoginForm';

const Login = () => {
  return (
    <div className='w-full h-screen bg-gradient-to-br from-primary1 to-primary2 flex flex-col justify-center md:flex-row md:justify-between items-center relative'>
      <div className='w-[33%] justify-center z-30 hidden md:flex'>
      <RegistrationLeft/>
      </div>
      <div className='z-30 w-[90%] md:w-[50%] lg:w-[33%]'>
      <LoginForm/>
      </div>
      
      <div className='w-[33%] md:flex justify-center z-30 hidden'>
      <RegistrationRight/>
      </div>
      <picture className='absolute w-full h-full top-0 left-0 z-0 opacity-80'>
        <img src={blocked} alt="network background" className='w-full h-full object-cover' />
      </picture>
      
    </div>
  )
}

export default Login