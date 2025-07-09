import blocked from '../../assets/blocked.png';
import React from 'react';
import GroupList from '../../components/homeComponents/groupList/GroupList';
import Friends from '../../components/homeComponents/friends/Friends';
import ChatRight from '../../components/chatComponent/chatRight/ChatRight';

const Chat = () => {

  return (
    <div className='flex flex-wrap h-full w-[80%] bg-white rounded-md p-2 gap-x-2'>
      {/* <picture className='absolute w-full h-full top-0 left-0 z-0 opacity-100'>
        <img src={blocked} alt="network background" className='w-full h-full object-cover' />
      </picture> */}
      <div className='w-[29.5%] h-full rounded-md flex flex-col gap-y-2 relative'>
        <div className='w-full h-1/2 shadow-lg rounded-md z-10'>
        <GroupList isChat={true}/>
        </div>
        <div className='w-full h-1/2 shadow-lg rounded-md z-20'>
        <Friends isChat={true}/>
        </div>
      </div>
      <div className='w-[69.5%] h-full shadow-lg rounded-md'>
        <ChatRight/>
      </div>
    </div>
  );
}


export default Chat;
