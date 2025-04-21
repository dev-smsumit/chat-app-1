import blocked from '../../assets/blocked.png';
import React from 'react';

const Chat = () => {

  return (
    <div className='flex flex-wrap h-full w-[80%] bg-white rounded-md relative'>
      <picture className='absolute w-full h-full top-0 left-0 z-0 opacity-20'>
        <img src={blocked} alt="network background" className='w-full h-full object-cover' />
      </picture>
    </div>
  );
}


export default Chat;
