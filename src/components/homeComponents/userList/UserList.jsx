import React, { useEffect, useState } from 'react';
import { BiDotsVertical } from 'react-icons/bi';
import boyChat from '../../../../src/assets/boyChat.gif';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';
import moment from 'moment/moment.js';

const UserList = () => {
    const auth = getAuth();
    const db = getDatabase();
    const [userList, setUserList] = useState([]);
    const [friendRequestList, setFriendRequestList] = useState([]);
    const [removeRequest, setRemoveRequest] = useState([]);
    const [friendStatus, setFriendStatus] = useState([]);
    const [checkStatus, setCheckStatus] = useState([]);
    const [blockStatus, setBlockStatus] = useState([]);
    const [getblockStatus, setGetBlockStatus] = useState([]);

    /*
    todo: fetch data for userList from Firebase
    */ 
    useEffect(()=>{
        const userListRef = ref(db, 'users/');
        const userListBlankArr = [];
        onValue(userListRef, (snapshot) => {
        snapshot.forEach((item)=>{
            if(auth.currentUser.uid !== item.val().userUid)
            userListBlankArr.push({...item.val(), userListKey: item.key})
        })
        setUserList(userListBlankArr)
    });
    }, [])

    /*
    todo: fetch data from Firebase friendRequests to modify add button
    */ 
    useEffect(()=>{
        const forAdd = ()=>{
            const friendRequestListRef = ref(db, 'friendRequests/');
        
        onValue(friendRequestListRef, (snapshot) => {
            const friendRequestListBlankArr = [];
        snapshot.forEach((item)=>{
            friendRequestListBlankArr.push(item.val().whoSendFriendRequestUid + item.val().whoReceivedFriendRequestUid)
        })
        setFriendRequestList(friendRequestListBlankArr)
    });
        }

        /*
        todo: fetch data from Firebase to calcel friend request
        */ 
        const forCancel = ()=>{
            const cancelRequestRef = ref(db, 'friendRequests/');
            
        onValue(cancelRequestRef, (snapshot) => {
            const removeRequests = [];
          snapshot.forEach((item) => {
            removeRequests.push({
              ...item.val(),
              friendRequestkey: item.key,
            });
          });
          setRemoveRequest(removeRequests);
        });
        }
        forAdd();
        forCancel();
    }, [])

    /*
    todo: fetch data from Firebase friendRequests for check status
    */ 
    useEffect(()=>{
        const checkStatusRef = ref(db, 'friendRequests/');
        
        onValue(checkStatusRef, (snapshot) => {
            const checkStatusBlankArr = [];
        snapshot.forEach((item)=>{
            checkStatusBlankArr.push(item.val().whoReceivedFriendRequestUid+item.val().whoSendFriendRequestUid)
        })
        setCheckStatus(checkStatusBlankArr)
    });
    },[])

    /*
    todo: fetch data from Firebase friends for friend status
    */ 
    useEffect(() => {
        const friendStatusRef = ref(db, 'friends/');
            
        onValue(friendStatusRef, (snapshot) => {
            const friendStatusArr = [];
          snapshot.forEach((item) => {
            friendStatusArr.push(item.val().whoReceivedFriendRequestUid + item.val().whoSendFriendRequestUid,item.val().whoSendFriendRequestUid + item.val().whoReceivedFriendRequestUid);
          });
          setFriendStatus(friendStatusArr);
        });
     },[]);

     /*
    todo: fetch data from Firebase blockedUser for block status who blocks someone
    */ 
    useEffect(() => {
        const blockStatusRef = ref(db, 'blockedUsers/');
            
        onValue(blockStatusRef, (snapshot) => {
            const blockStatusArr = [];
          snapshot.forEach((item) => {
            blockStatusArr.push(item.val().whoBlockedUid + item.val().whoGotBlockedUid);
          });
          setBlockStatus(blockStatusArr);
        });
     },[]);

     /*
    todo: fetch data from Firebase blockedUser for block status who got block
    */ 
    useEffect(() => {
        const getblockStatusRef = ref(db, 'blockedUsers/');
            
        onValue(getblockStatusRef, (snapshot) => {
            const getblockStatusArr = [];
          snapshot.forEach((item) => {
            getblockStatusArr.push(item.val().whoGotBlockedUid + item.val().whoBlockedUid);
          });
          setGetBlockStatus(getblockStatusArr);
        });
     },[]);

     /*
    todo: calcel friend request function implement
    ?params(item)
    */ 
    const handleCancelRequest = (item)=>{
        const rk = removeRequest.find((i)=>i.whoReceivedFriendRequestUid === item)
            const removeRef = ref(db, `friendRequests/${rk.friendRequestkey}`)
            remove(removeRef).then(()=>{
                console.log('removed');
            }).catch((error) => {
                console.log(error);
              });
    }

    /*
    todo: send friend request function implement
    ?params(item)
    */ 
    const handleSendRequest = (item)=>{
        const requestRef = ref(db, 'friendRequests/');
        set(push(requestRef), {
            whoSendFriendRequestName: auth.currentUser.displayName,
            whoSendFriendRequestUid: auth.currentUser.uid,
            whoSendFriendRequestEmail: auth.currentUser.email,
            whoSendFriendRequestPhotoUrl: auth.currentUser.photoURL ? auth.currentUser.photoURL : null,
            whoReceivedFriendRequestName: item.userName,
            whoReceivedFriendRequestUid: item.userUid,
            whoReceivedFriendRequestEmail: item.userEmail,
            whoReceivedFriendRequestPhotoUrl: item.userPhotoUrl,
            whoReceivedFriendRequestKey: item.userListKey,
            createdAt:moment().format("DD MM YYYY, h:mm:ss a"), 
          });
    }


  return (
    <div className='w-full h-[200px] lg:w-[32.5%] lg:h-[49%] bg-[#ffffff62] z-20 shadow-md shadow-black rounded-md'>
        
        <div className='w-full h-full bg-[#0000ff17] rounded-b-md p-1' >
            <div className='w-full h-[20%] flex justify-between items-center'>
            <h1 className='text-lg font-bold uppercase flex'>user list
                    <span className="relative flex h-6 w-6 ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                    <span className="relative flex justify-center items-center text-xs rounded-full h-6 w-6 bg-emerald-300 font-semibold">{userList?.length}</span>
                    </span>
                </h1>
                <BiDotsVertical className='text-xl cursor-pointer'/>
            </div>
            
            <div className='h-[80%] w-full scrollbar-thin scrollbar-thumb-[#ef444485] scrollbar-track-[#0000ff62] overflow-y-scroll divide-y divide-solid divide-slate-300'>
            {
                userList?.map((item)=>(
                    <div className='flex justify-start items-center py-1 ' key={item.userListKey}>
                <picture className='w-10 h-10 rounded-full shadow-md shadow-black overflow-hidden'>
                    <img src={item.userPhotoUrl} alt={boyChat} className='w-ful h-full'/>
                </picture>
                <div className='basis-[53%] flex flex-col justify-center items-start ml-1'>
                    <h1 className='text-sm font-semibold capitalize'>{item.userName}</h1>
                    <p className='text-xs'>{item.userEmail}</p>
                </div>
                <div>
                    {
                        friendRequestList.includes(auth.currentUser.uid + item.userUid || item.userUid + auth.currentUser.uid,) ? (
                            <div className='flex'>
                                <button className='flex mr-1 justify-center items-center bg-[#0324088e] text-white px-1 py-[2px] rounded-md text-sm'>Sent</button>
                                <button className='flex mr-1 justify-center items-center bg-customRed text-white px-1 py-[2px] rounded-md text-sm' onClick={()=>handleCancelRequest(item.userUid)}>Cencel</button>
                            </div>
                            
                        ):
                        checkStatus.includes(auth.currentUser.uid + item.userUid) ? (
                            <div className='flex'>
                                <button className='flex mr-1 justify-center items-center bg-[#0000ff4b] text-white px-1 py-[2px] rounded-md text-xs'>Check Request</button>
                                
                            </div>
                            
                        )
                        :
                        friendStatus.includes(auth.currentUser.uid + item.userUid || item.userUid + auth.currentUser.uid,) ? (
                            <button className='flex mr-2 justify-center items-center bg-green-300 text-white px-2 py-[2px] rounded-md text-sm drop-shadow-md '>Friend</button>
                        )
                        :
                        blockStatus.includes(auth.currentUser.uid + item.userUid || item.userUid + auth.currentUser.uid,) ? (
                            <button className='flex mr-2 justify-center items-center bg-red-300 text-white px-1 py-[2px] rounded-md text-xs drop-shadow-md '>Blocked By You</button>
                        )
                        :
                        getblockStatus.includes(auth.currentUser.uid + item.userUid) ? (
                            <button className='flex mr-2 justify-center items-center bg-red-300 text-white px-1 py-[2px] rounded-md text-xs drop-shadow-md '>You Got Block</button>
                        )
                        :
                        (
                            <div>
                                <button className='flex mr-2 justify-center items-center bg-customIndigo text-white px-2 py-[2px] rounded-md text-sm' onClick={()=>handleSendRequest(item)}>Add</button> 
                            </div>
                        )
                    }
                </div>
            </div>
                ))
            }
            </div>
            
        </div>
    </div>
  )
}



export default UserList