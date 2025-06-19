import React, { useEffect, useState } from 'react';
import { BiDotsVertical } from 'react-icons/bi';
import boyChat from '../../../../src/assets/boyChat.gif';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { MdNoCell } from 'react-icons/md';
import moment from 'moment/moment.js';

const FriendRequest = () => {
    const db = getDatabase();
    const auth = getAuth();
    const [friendRequList, setFriendRequList] = useState([]);

    /*
    todo: fetch data from Firebase friendRequest
    */
    useEffect(() => {
        const friendRequListRef = ref(db, 'friendRequests/');

        onValue(friendRequListRef, (snapshot) => {
            const friendRequListBlankArr = [];
            snapshot.forEach((item) => {
                if (auth.currentUser.uid === item.val().whoReceivedFriendRequestUid)
                    friendRequListBlankArr.push({
                        ...item.val(),
                        friendRequKey: item.key,
                    })
            })
            setFriendRequList(friendRequListBlankArr)
        });
    }, [])

    /*
    todo: friend request reject function implement
    ?params(item)
    */
    const rejectRequest = (item) => {
        remove(ref(db, `friendRequests/${item.friendRequKey}`))
    }

    /*
    todo: friend request accept function implement
    */
    const acceptRequest = (item) => {
        const friendRef = ref(db, 'friends/');
        set(push(friendRef), {
            ...item,
            friendRequKey: null,
            createdAt: moment().format("DD MM YYYY, h:mm:ss a"),
        }).then(() => {
            const removeRef = ref(db, `friendRequests/${item.friendRequKey}`);
            remove(removeRef);
        })
    }

    return (
        <div className='w-full h-[200px] md:w-[49%] lg:w-[32.5%] lg:h-[49%] bg-[#ffffff62] z-20 shadow-md shadow-black rounded-md'>

            <div className='w-full h-full bg-[#0000ff17] rounded-b-md p-1' >
                <div className='w-full h-[20%] flex justify-between items-center'>
                    <h1 className='text-lg font-bold uppercase flex'>friend requests
                        <span className="relative flex h-6 w-6 ml-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                            <span className="relative flex justify-center items-center text-xs rounded-full h-6 w-6 bg-emerald-300 font-semibold">{friendRequList?.length}</span>
                        </span>
                    </h1>
                    <BiDotsVertical className='text-xl cursor-pointer' />
                </div>

                <div className='h-[80%] w-full scrollbar-thin scrollbar-thumb-[#ef444485] scrollbar-track-[#0000ff62] overflow-y-scroll divide-y divide-solid divide-slate-300'>
                    {
                        friendRequList?.map((item) => (
                            <div className='flex justify-start items-center py-1 ' key={item.friendRequKey}>
                                <picture className='w-10 h-10 rounded-full shadow-md shadow-black overflow-hidden'>
                                    <img src={item ? item.whoSendFriendRequestPhotoUrl : boyChat} alt={boyChat} className='w-full h-full' />
                                </picture>
                                <div className='basis-[50%] flex flex-col justify-center items-start ml-1'>
                                    <h1 className='text-sm font-semibold capitalize'>{item.whoSendFriendRequestName}</h1>
                                    <p className='text-xs'>{item.whoSendFriendRequestEmail}</p>
                                </div>
                                <div className='flex justify-center items-center gap-x-[2px]'>
                                    <button className='flex justify-center items-center bg-customIndigo text-white px-1 py-[2px] rounded-md text-sm' onClick={() => { acceptRequest(item) }}>Accept</button>
                                    <button className='flex mr-1 justify-center items-center bg-customRed text-white px-1 py-[2px] rounded-md text-sm' onClick={() => rejectRequest(item)}>Reject</button>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default FriendRequest