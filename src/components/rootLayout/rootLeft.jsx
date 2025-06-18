import React, { useEffect, useState } from 'react';
import blocked from '../../assets/blocked.png';
import { Link, useLocation } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { getAuth, updateProfile } from 'firebase/auth';
import { getDatabase, ref, onValue, update, get } from 'firebase/database';
import { FaCloudUploadAlt, FaBars } from "react-icons/fa";
import Modal from 'react-modal';
import { GiCrossMark } from "react-icons/gi";
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref as storageRef, uploadString, getDownloadURL } from "firebase/storage";

const customStyles = {
  content: {
    top: '100px',
    left: '0',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    background: 'linear-gradient(to right, #ebf8ff, #cffafe, #bfdbfe)',
    zIndex: '1000',
    outline: 'none'
  },
  overlay: {
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  }
};

const RootLeft = () => {
  const storage = getStorage();
  const auth = getAuth();
  const db = getDatabase();
  const location = useLocation();
  const uploader = Uploader({
    apiKey: "free"
  });
  const options = { multi: true, mime: "image/jpeg" };
  const [user, setUser] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  /*
  todo: all modal functions implement
  ?params()
  */
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
    console.log(modalIsOpen);

  }

  /*
  todo: username change function handler
  ?params()
  */
  const changeNameHandler = () => {
    updateProfile(auth.currentUser, {
      displayName: newName,
    }).then(() => {
      const userRef = ref(db, `users/${user.userKey}`);
      update(userRef, {
        userName: newName,
      });
    }).then(() => {
      setUser((prev) => ({
        ...prev,
        userName: newName,
      }));
    })
  }

  /*
  todo: fetch data of users from firebase
  */
  useEffect(() => {
    const getUserdata = () => {
      const userRef = ref(db, 'users/');
      onValue(userRef, (snapshot) => {
        snapshot.forEach((item) => {
          if (auth.currentUser.uid === item.val().userUid) {
            setUser({ ...item.val(), userKey: item.key });
          }
        });
      });
    };
    getUserdata();
  }, [])

  const updateOldFriendRequests = async (updatedUser) => {
    const allRequestsRef = ref(db, 'friendRequests/');
    const snapshot = await get(allRequestsRef);

    if (snapshot.exists()) {
      snapshot.forEach(childSnap => {
        const requestData = childSnap.val();
        const requestKey = childSnap.key;

        if (requestData.whoSendFriendRequestUid === updatedUser.uid) {
          update(ref(db, `friendRequests/${requestKey}`), {
            whoSendFriendRequestPhotoUrl: updatedUser.photoURL
          });
        }
      });
    }
  };


  return (
    <div className='w-full lg:w-[20%] h-full rounded-md bg-gradient-to-br from-primary1 to-primary2 relative lg:overflow-hidden flex flex-col justify-center items-center'>
      <div className='z-20 w-full p-2 flex lg:flex-col justify-between lg:justify-center items-center'>
        <div>
          <span className='font-mono bg-gradient-to-r from-customRed to-customIndigo bg-clip-text text-transparent text-2xl font-bold -mt-3'>ChatMate</span>
        </div>
        <div className='lg:hidden'>
          <button onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars className="text-white text-2xl" />
        </button>
        </div>
        {
          menuOpen && (
            <div className='absolute w-full top-full left-0 bg-gray-500 z-[9999] lg:hidden py-4'>
          <ul className='flex flex-col gap-y-2 items-center'>
            <li>
              <Link className='flex items-end' to={'/root/home'}><IoHome className='text-[60px] px-1 pt-1 bg-green-300 rounded-t-3xl rounded-bl-md' /><h2 className={`text-xl font-bold uppercase bg-green-300 white pr-2 py-[2px] rounded-r-md border-r-8 ${location.pathname === '/root/home' ? 'border-red-600' : 'border-none'}`}>Home</h2></Link>
            </li>
            <li>
              <Link className='flex items-end' to={'/root/chat'}><IoIosChatbubbles className='text-[60px] px-1 pt-1 bg-green-300 rounded-t-3xl rounded-bl-md' /><h2 className={`text-xl font-bold uppercase bg-green-300 white pr-2 py-[2px] rounded-r-md border-r-8 ${location.pathname === '/root/chat' ? 'border-red-600' : 'border-none'}`}>Chat</h2></Link>
            </li>

            <li>
              <Link className='flex items-end' to={'/root/notification'}><IoMdNotifications className='text-[60px] px-1 pt-1 bg-green-300 rounded-t-3xl rounded-bl-md' /><h2 className={`text-xl font-bold uppercase bg-green-300 white pr-2 py-[2px] rounded-r-md border-r-8 ${location.pathname === '/root/notification' ? 'border-red-600' : 'border-none'}`}>Notification</h2></Link>
            </li>
            <li>
              <Link className='flex items-end' to={'/root/setting'}><IoSettings className='text-[60px] px-1 pt-1 bg-green-300 rounded-t-3xl rounded-bl-md' /><h2 className={`text-xl font-bold uppercase bg-green-300 white pr-2 py-[2px] rounded-r-md border-r-8 ${location.pathname === '/root/setting' ? 'border-red-600' : 'border-none'}`}>Setting</h2></Link>
            </li>
            <li>
              <Link className='flex items-end' to={'/login'}><RiLogoutBoxRFill className='text-[60px] px-1 pt-1 bg-green-300 rounded-t-3xl rounded-bl-md' /><h2 className='text-xl font-bold uppercase bg-green-300 pr-2 py-[2px] rounded-r-md'>Log Out</h2></Link>
            </li>
          </ul>
          <button className='absolute top-2 right-2 bg-red-600 text-white p-2' onClick={()=> setMenuOpen(false)}>Back</button>
        </div>
          )
        }
        <div className='flex flex-col items-center justify-center'>
          <div className='w-20 h-20 lg:w-28 lg:h-28 rounded-md bg-slate-600 shadow-md shadow-black overflow-hidden relative'>
          <picture>
            <img src={user ? user.userPhotoUrl : 'PHOTO NAI'} alt={user ? user.userPhotoUrl : 'PHOTO NAI'} className='h-full w-full' />
          </picture>

          <UploadButton
            uploader={uploader}
            options={options}
            onComplete={async (files) => {
              const fileUrl = files[0].fileUrl;

              try {
                // ✅ Step 1: Fetch the image as a Blob
                const response = await fetch(fileUrl);
                const blob = await response.blob();

                // ✅ Step 2: Convert Blob to Base64
                const reader = new FileReader();
                reader.readAsDataURL(blob);

                reader.onload = async () => {
                  const base64Image = reader.result;

                  // ✅ Step 3: Upload to Firebase Storage
                  const uniquePath = `userProfileImages/images${uuidv4()}`;
                  const imageRef = storageRef(storage, uniquePath);
                  await uploadString(imageRef, base64Image, 'data_url');

                  const downloadURL = await getDownloadURL(imageRef);

                  // ✅ Step 4: Update Firebase Realtime Database and Auth
                  await update(ref(db, `users/${user.userKey}`), {
                    userPhotoUrl: downloadURL,
                  });

                  await updateProfile(auth?.currentUser, {
                    photoURL: downloadURL,
                  });

                  // ✅ Step 3: Fix old friendRequests sent by this user
                  await updateOldFriendRequests(auth.currentUser);
                };

                reader.onerror = (error) => {
                  console.error("Error converting Blob to Base64:", error);
                };
              } catch (err) {
                console.error("Image upload failed:", err);
              }
            }}
          >
            {({ onClick }) => (
              <button onClick={onClick}>
                <FaCloudUploadAlt className='absolute bottom-1 left-1 text-green-300 drop-shadow-md shadow-black' />
              </button>
            )}
          </UploadButton>

        </div>
        <div className='mt-2 flex justify-center items-center gap-x-1'>
          <h1 className='text-xl text-white capitalize'>{user ? user.userName : "name missing"}</h1>
          <FaCloudUploadAlt className='bottom-1 left-1 text-green-300 drop-shadow-md shadow-black cursor-pointer' onClick={openModal} />
        </div>
        </div>
        <div className='mt-6 hidden lg:block'>
          <ul className='flex flex-col gap-y-2 items-center'>
            <li>
              <Link className='flex items-end' to={'/root/home'}><IoHome className='text-[60px] px-1 pt-1 bg-green-300 rounded-t-3xl rounded-bl-md' /><h2 className={`text-xl font-bold uppercase bg-green-300 white pr-2 py-[2px] rounded-r-md border-r-8 ${location.pathname === '/root/home' ? 'border-red-600' : 'border-none'}`}>Home</h2></Link>
            </li>
            <li>
              <Link className='flex items-end' to={'/root/chat'}><IoIosChatbubbles className='text-[60px] px-1 pt-1 bg-green-300 rounded-t-3xl rounded-bl-md' /><h2 className={`text-xl font-bold uppercase bg-green-300 white pr-2 py-[2px] rounded-r-md border-r-8 ${location.pathname === '/root/chat' ? 'border-red-600' : 'border-none'}`}>Chat</h2></Link>
            </li>

            <li>
              <Link className='flex items-end' to={'/root/notification'}><IoMdNotifications className='text-[60px] px-1 pt-1 bg-green-300 rounded-t-3xl rounded-bl-md' /><h2 className={`text-xl font-bold uppercase bg-green-300 white pr-2 py-[2px] rounded-r-md border-r-8 ${location.pathname === '/root/notification' ? 'border-red-600' : 'border-none'}`}>Notification</h2></Link>
            </li>
            <li>
              <Link className='flex items-end' to={'/root/setting'}><IoSettings className='text-[60px] px-1 pt-1 bg-green-300 rounded-t-3xl rounded-bl-md' /><h2 className={`text-xl font-bold uppercase bg-green-300 white pr-2 py-[2px] rounded-r-md border-r-8 ${location.pathname === '/root/setting' ? 'border-red-600' : 'border-none'}`}>Setting</h2></Link>
            </li>
            <li>
              <Link className='flex items-end' to={'/login'}><RiLogoutBoxRFill className='text-[60px] px-1 pt-1 bg-green-300 rounded-t-3xl rounded-bl-md' /><h2 className='text-xl font-bold uppercase bg-green-300 pr-2 py-[2px] rounded-r-md'>Log Out</h2></Link>
            </li>
          </ul>
        </div>
      </div>

      {/* background image */}
      <picture className='absolute w-full h-full top-0 left-0 z-0 opacity-80'>
        <img src={blocked} alt="network background" className='w-full h-full object-cover' />
      </picture>
      <div>
        <Modal
          className={'absolute z-50 w-76 h-50 p-4'}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button className='text-red-700 cursor-pointer text-xl' onClick={closeModal}><GiCrossMark /></button>
          <div><h2 className='font-bold mb-1'>Enter New Name</h2></div>
          <form className='flex gap-x-2' onSubmit={(e) => e.preventDefault()}>
            <input className='border-blue-600 border-l-2' type='text' onChange={(e) => setNewName(e.target.value)} value={newName} />
            <button className='bg-blue-800 text-white px-2 py-[2px] text-sm uppercase' onClick={changeNameHandler}>Change</button>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default RootLeft


{/* <UploadButton uploader={uploader}
                options={options}
                onComplete={(files) => {
                  console.log(files[0])
                    update(ref(db, `users/${user.userKey}`),{
                        userPhotoUrl: files[0].fileUrl,
                    }).then(()=>{
                        updateProfile(auth?.currentUser,{
                            photoURL: files[0].fileUrl,
                        })
                    })
                }
                }>
    {({onClick}) =>
      <button onClick={onClick}>
        <FaCloudUploadAlt className='absolute bottom-1 left-1 text-green-300 drop-shadow-md shadow-black'/>
      </button>
    }
  </UploadButton> */}