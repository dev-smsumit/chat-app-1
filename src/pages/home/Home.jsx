import React from 'react';
import blocked from '../../assets/blocked.png';
import GroupList from '../../components/homeComponents/groupList/GroupList';
import Friends from '../../components/homeComponents/friends/Friends';
import UserList from '../../components/homeComponents/userList/UserList';
import FriendRequest from '../../components/homeComponents/friendRequest/friendRequest';
import MyGroups from '../../components/homeComponents/myGroups/MyGroups';
import BlockedUser from '../../components/homeComponents/blockedUser/BlockedUser';

const Home = () => {
  return (
    <div className='flex flex-wrap h-full w-full lg:w-[80%] bg-white rounded-md relative justify-center items-center gap-y-4 lg:gap-x-2'>
      <GroupList/>
      <Friends/>
      <UserList/>  
      <FriendRequest/>  
      <MyGroups/>  
      <BlockedUser/>  

      {/* this is background picture */}
      <picture className='absolute w-full h-full top-0 left-0 z-0 opacity-20'>
        <img src={blocked} alt="network background" className='w-full h-full object-cover' />
      </picture>
    </div>
  )
}

export default Home