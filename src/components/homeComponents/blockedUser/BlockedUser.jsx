import React, { useEffect, useState } from 'react';
import { BiDotsVertical } from 'react-icons/bi';
import boyChat from '../../../../src/assets/boyChat.gif';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';

const BlockedUser = () => {
    const db = getDatabase();
    const auth = getAuth();
    const [blockList, setBlockList] = useState([]);

    /*
    todo: fetch data from Firebase friends
    */ 
    useEffect(()=>{
        const blockRef = ref(db, 'blockedUsers/');
        onValue(blockRef, (snapshot) => {
            const blockBlankArr = [];
            snapshot.forEach((item)=>{
                
                if (auth.currentUser.uid === item.val().whoBlockedUid)
                blockBlankArr.push(
                {
                    ...item.val(),
                    blockedKey: item.key,
                })
            })
            setBlockList(blockBlankArr)
        });
    }, [])

    /*
    todo: unblock function implement
    ?params(item)
    */ 
    const unblockHandler =(item)=>{
        const unblockRef = ref(db, `blockedUsers/${item.blockedKey}`);
        remove(unblockRef)
    }

  return (
    <div className='w-full h-[200px] lg:w-[32.5%] lg:h-[49%] bg-[#ffffff62] z-20 shadow-md shadow-black rounded-md'>
        
        <div className='w-full h-full bg-[#0000ff17] rounded-b-md p-1' >
            <div className='w-full h-[20%] flex justify-between items-center'>
            <h1 className='text-lg font-bold uppercase flex'>blocked user
                    <span class="relative flex h-6 w-6 ml-1">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                    <span class="relative flex justify-center items-center text-xs rounded-full h-6 w-6 bg-emerald-300 font-semibold">{blockList?.length}</span>
                    </span>
                </h1>
                <BiDotsVertical className='text-xl cursor-pointer'/>
            </div>
            
            <div className='h-[80%] w-full scrollbar-thin scrollbar-thumb-[#ef444485] scrollbar-track-[#0000ff62] overflow-y-scroll divide-y divide-solid divide-slate-300'>
            {
                blockList?.map((item)=>(
                    <div className='flex justify-start items-center py-1 ' key={item.blockedKey}>
                <picture className='w-10 h-10 rounded-full shadow-md shadow-black overflow-hidden'>
                    <img src={auth.currentUser.uid === item.whoSendFriendRequestUid? item.whoReceivedFriendRequestPhotoUrl : item.whoSendFriendRequestPhotoUrl} alt={boyChat} className='w-full h-full'/>
                </picture>
                <div className='basis-[53%] flex flex-col justify-center items-start ml-1'>
                    <h1 className='text-sm font-semibold'>{auth.currentUser.uid === item.whoSendFriendRequestUid? item.whoReceivedFriendRequestName : item.whoSendFriendRequestName}</h1>
                    <p className='text-xs'>{auth.currentUser.uid === item.whoSendFriendRequestUid? item.whoReceivedFriendRequestEmail : item.whoSendFriendRequestEmail}</p>
                </div>
                <button className='flex mr-2 justify-center items-center bg-green-900 text-white px-2 py-[2px] rounded-md text-sm' onClick={()=>unblockHandler(item)}>Unblock</button>
            </div>
                ))
            }
            </div>
            
        </div>
    </div>
  )
}

export default BlockedUser