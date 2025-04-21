import React from 'react';
import RegistrationForm from '../../components/registrationCom/RegistrationForm';
import blocked from '../../assets/blocked.png';
import RegistrationLeft from '../../components/registrationCom/RegistrationLeft';
import RegistrationRight from '../../components/registrationCom/RegistrationRight';


const Registration = () => {
  return (
    <div className='w-full h-screen bg-gradient-to-br from-primary1 to-primary2 flex flex-col justify-center md:flex-row md:justify-between items-center relative'>
  <div className='md:w-[25%] lg:w-[33%] hidden md:flex justify-center z-30'>
    <RegistrationLeft/>
  </div>
  <div className='z-30 w-[90%] md:w-[50%] lg:w-[33%]'>
    <RegistrationForm />
  </div>
  <div className='md:w-[25%] lg:w-[33%] hidden md:flex justify-center z-30'>
    <RegistrationRight/>
  </div>
  <picture className='absolute w-full h-full top-0 left-0 z-0 opacity-80'>
    <img src={blocked} alt="network background" className='w-full h-full object-cover' />
  </picture>
</div>

  );
}

export default Registration;
