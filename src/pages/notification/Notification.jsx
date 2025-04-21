import React from 'react';
import blocked from '../../assets/blocked.png';

const Notification = () => {
  return (
    <div className='flex flex-wrap h-full w-[80%] bg-white rounded-md relative'>
      <picture className='absolute w-full h-full top-0 left-0 z-0 opacity-20'>
        <img src={blocked} alt="network background" className='w-full h-full object-cover' />
      </picture>
    </div>
  )
}

export default Notification