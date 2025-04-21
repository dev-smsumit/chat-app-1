import React, { useEffect, useState } from 'react';
import boyChat from '../../../../src/assets/boyChat.gif';
import { BiDotsVertical } from 'react-icons/bi';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';
import moment from 'moment/moment.js';

const Friends = () => {
    const db = getDatabase();
    const auth = getAuth();
    const [friendList, setFriendList] = useState([]);

    /*
    todo: fetch data from Firebase friends
    */ 
    useEffect(()=>{
        const friendsRef = ref(db, 'friends/');
        onValue(friendsRef, (snapshot) => {
            const friendBlankArr = [];
            snapshot.forEach((item)=>{
                if(auth.currentUser.uid === item.val().whoReceivedFriendRequestUid || auth.currentUser.uid === item.val().whoSendFriendRequestUid)
                friendBlankArr.push({
                    ...item.val(),
                    friendKey: item.key,
                })
            })
            setFriendList(friendBlankArr)
        });
    }, [])


    /*
    todo: unfriend function implement
    */ 
    const unfrienHandler =(item)=>{
        const unfriendRef = ref(db, `friends/${item.friendKey}`);
        remove(unfriendRef)
    }

    /*
    todo: block function implement
    */ 
    const blockHandler =(item)=>{
        console.log(item);
        
        set(push(ref(db, 'blockedUsers/')), {
            ...item,
            whoBlockedUid: auth.currentUser.uid,
            whoGotBlockedUid: auth.currentUser.uid === item.whoReceivedFriendRequestUid ? item.whoSendFriendRequestUid : item.whoReceivedFriendRequestUid,
          }).then(()=>{
            remove(ref(db, `friends/${item.friendKey}`))
          })
    }

  return (
    <div className='w-[32.5%] h-[49%] bg-[#ffffff62] z-20 shadow-md shadow-black rounded-md'>
        
        <div className='w-full h-full bg-[#0000ff17] rounded-b-md p-1' >
            <div className='w-full h-[20%] flex justify-between items-center'>
            <h1 className='text-lg font-bold uppercase flex'>friends
                    <span class="relative flex h-6 w-6 ml-1">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                    <span class="relative flex justify-center items-center text-xs rounded-full h-6 w-6 bg-emerald-300 font-semibold">{friendList?.length}</span>
                    </span>
                </h1>
                <BiDotsVertical className='text-xl cursor-pointer'/>
            </div>
            
            <div className='h-[80%] w-full scrollbar-thin scrollbar-thumb-[#ef444485] scrollbar-track-[#0000ff62] overflow-y-scroll divide-y divide-solid divide-slate-300'>
            {
                friendList?.map((item)=>(
                    <div className='flex justify-start items-center py-1 ' key={item.friendKey}>
                <picture className='w-10 h-10 rounded-full shadow-md shadow-black overflow-hidden'>
                    <img src={auth.currentUser.uid === item.whoSendFriendRequestUid? item.whoReceivedFriendRequestPhotoUrl : item.whoSendFriendRequestPhotoUrl} alt={boyChat} className='w-full h-full'/>
                </picture>
                <div className='basis-[53%] flex flex-col justify-center items-start ml-1'>
                    <h1 className='text-sm font-semibold capitalize'>{auth.currentUser.uid === item.whoSendFriendRequestUid? item.whoReceivedFriendRequestName : item.whoSendFriendRequestName}</h1> 
                    <p className='text-xs'>{moment(item.createdAt, "DD MM YYYY, h:mm:ss a").toNow()}</p>
                </div>
                <div className='flex'>
                <button className='flex mr-1 justify-center items-center bg-yellow-600 text-white px-1 py-[2px] rounded-md text-xs drop-shadow-md' onClick={()=>unfrienHandler(item)}>Unfriend</button>
                <button className='flex mr-1 justify-center items-center bg-customRed text-white px-1 py-[2px] rounded-md text-xs drop-shadow-md' onClick={()=>blockHandler(item)}>Block</button> 
                </div>
            </div>
                ))
            }
            </div>
            
        </div>
    </div>
  )
}

export default Friends