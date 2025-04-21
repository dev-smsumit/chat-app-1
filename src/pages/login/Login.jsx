import React from 'react';
import RegistrationLeft from '../../components/registrationCom/RegistrationLeft';
import RegistrationRight from '../../components/registrationCom/RegistrationRight';
import blocked from '../../assets/blocked.png';
import LoginForm from '../../components/loginCom/LoginForm';

const Login = () => {
  return (
    <div className='w-full h-screen bg-gradient-to-br from-primary1 to-primary2 flex justify-between items-center relative'>
      <div className='w-[33%] flex justify-center z-30'>
      <RegistrationLeft/>
      </div>
      <div className=' z-30 w-[33%]'>
      <LoginForm/>
      </div>
      
      <div className='w-[33%] flex justify-center z-30'>
      <RegistrationRight/>
      </div>
      <picture className='absolute w-full h-full top-0 left-0 z-0 opacity-80'>
        <img src={blocked} alt="network background" className='w-full h-full object-cover' />
      </picture>
      
    </div>
  )
}

export default Login