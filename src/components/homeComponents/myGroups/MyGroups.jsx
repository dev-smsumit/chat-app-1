import React, { useEffect, useState } from 'react';
import { BiDotsVertical } from 'react-icons/bi';
import boyChat from '../../../../src/assets/boyChat.gif';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';

const MyGroups = () => {
    const db = getDatabase();
    const auth = getAuth();
    const [groupList, setGroupList] = useState([]);

    /*
    todo: data fetch from firebase groups
    */ 
    useEffect(()=>{
        const groupsRef = ref(db, 'groups/')
        onValue(groupsRef, (snapshot)=>{
          const groupListArr = [];
          snapshot.forEach((item)=>{  
            if(auth.currentUser.uid === item.val().whoCreateGroupUid)
              groupListArr.push({
                ...item.val(),
                myGroupKey: item.key,
              })
          })
          setGroupList(groupListArr)
        })
      },[])
      

  return (
    <div className='w-full h-[200px] lg:w-[32.5%] lg:h-[49%] bg-[#ffffff62] z-20 shadow-md shadow-black rounded-md'>
        
        <div className='w-full h-full bg-[#0000ff17] rounded-b-md p-1' >
            <div className='w-full h-[20%] flex justify-between items-center'>
            <h1 className='text-lg font-bold uppercase flex'>my groups
                    <span className="relative flex h-6 w-6 ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                    <span className="relative flex justify-center items-center text-xs rounded-full h-6 w-6 bg-emerald-300 font-semibold">8</span>
                    </span>
                </h1>
                <BiDotsVertical className='text-xl cursor-pointer'/>
            </div>
            
            <div className='h-[80%] w-full scrollbar-thin scrollbar-thumb-[#ef444485] scrollbar-track-[#0000ff62] overflow-y-scroll divide-y divide-solid divide-slate-300'>
            {
                groupList?.map((item)=>(
                    <div className='flex justify-start items-center py-1 ' key={item.myGroupKey}>
                <picture className='w-10 h-10 rounded-full shadow-md shadow-black overflow-hidden'>
                    <img className='w-full h-full' src={item? item.groupPhoto : boyChat} alt={item? item.whoCreateGroupProfilePic : boyChat} />
                </picture>
                <div className='basis-[60%] flex flex-col justify-center items-start ml-1'>
                    <h1 className='text-sm font-semibold'>{item.groupName}</h1>
                    <p className='text-xs'>{item.groupTagName}</p>
                </div>
                <button className='flex mr-2 justify-center items-center bg-customIndigo text-white px-2 py-[2px] rounded-md text-sm'>Add</button>
            </div>
                ))
            }
            </div>
            
        </div>
    </div>
  )
}

export default MyGroups