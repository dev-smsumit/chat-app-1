import React, { useEffect, useRef, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { BiDotsVertical } from "react-icons/bi";
import boyChat from '../../../../src/assets/boyChat.gif';
import Modal from 'react-modal';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { GiCrossMark } from "react-icons/gi";
import { Watch } from 'react-loader-spinner';
import { errorToast } from '../../../../toastify/toastify';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbref, set, push, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';
import moment from 'moment/moment.js';
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    background: 'linear-gradient(to right, #ebf8ff, #cffafe, #bfdbfe)',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(3px)',
  }
};

const GroupList = () => {
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("");
  const cropperRef = useRef(null)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [groupInput, setGroupInput] = useState({
    groupName: "",
    groupTagName: "",
  });
  const [loader, setLoader] = useState(false);
  const [groupList, setGroupList] = useState([]);

  /*
  todo: modal all functions implement
  ?params()
  */
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  /*
  todo: cropper all functions implement
  */
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      successToast("Crop Done!");

    }
  };

  /*
  todo: create group onChange handler
  ?params(event)
  */
  const createGroupOnchange = (event) => {
    const { id, value } = event.target;
    setGroupInput({
      ...groupInput,
      [id]: value,
    })
  }

  /*
  todo: create group functions implement
  ?params()
  */
  const createGroupHandler = () => {
    const { groupName, groupTagName } = groupInput;

    if (!cropData || !groupName || !groupTagName) {
      return errorToast("Must fill up all Group Name, Group Tag Name and cropping image.")
    }
    setLoader(true);
    const storageRef = ref(storage, `groupImages/images${uuidv4()}`)
    uploadString(storageRef, cropData, 'data_url').then((snapshot) => {
      setCropData("");
    }).then(() => {
      return getDownloadURL(storageRef);
    }).then((imgDownRrl) => {
      const groupRef = dbref(db, 'groups/');
      set(push(groupRef), {
        whoCreateGroupName: auth.currentUser.displayName,
        whoCreateGroupUid: auth.currentUser.uid,
        whoCreateGroupProfilePic: auth.currentUser.photoURL,
        whoCreateEmail: auth.currentUser.email,
        groupName: groupInput.groupName,
        groupTagName: groupInput.groupTagName,
        groupPhoto: imgDownRrl,
        createdAt: moment().format("DD MM YYYY, h:mm:ss a"),
      })
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setGroupInput({
        groupName: "",
        groupTagName: "",
      });
      setCropData("");
      setImage("");
      setLoader(false);
      closeModal();
    })
  }

  /*
  todo: data fetch from firebase groups
  */
  useEffect(() => {
    const groupsRef = dbref(db, 'groups/')
    onValue(groupsRef, (snapshot) => {
      const groupListArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid !== item.val().whoCreateGroupUid)
          groupListArr.push({
            ...item.val(),
            groupKey: item.key,
          })
      })
      setGroupList(groupListArr)
    })
  }, [])

  return (
    <div className='w-[32.5%] h-[49%] bg-[#ffffff62] z-20 shadow-md shadow-black rounded-md'>
      <div className='w-full h-[20%] bg-[#ef444423] flex justify-center items-center gap-x-2 rounded-t-md'>
        <CiSearch className='text-xl cursor-pointer' />
        <input type="text" className='w-[75%] h-10 rounded-md outline-none px-2 text-base font-mono' placeholder='Search here...' />
        <BiDotsVertical className='text-xl cursor-pointer' />
      </div>
      <div className='w-full h-[80%] bg-[#0000ff17] rounded-b-md p-1' >
        <div className='w-full h-[20%] flex justify-between items-center'>
          <h1 className='text-lg font-bold uppercase flex'>Group List
            <span class="relative flex h-6 w-6 ml-1">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span class="relative flex justify-center items-center text-xs rounded-full h-6 w-6 bg-emerald-300 font-semibold">{groupList.length}</span>
            </span>
          </h1>
          <button className='flex justify-center items-center bg-gradient-to-r from-customRed to-customIndigo text-white mt-2 px-2 py-1 rounded-md' onClick={openModal}>Create Group</button>
          {/* modal body */}

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <button onClick={closeModal}><GiCrossMark className='text-2xl text-red-700' /></button>
            <div><h1 className='text-3xl text-blue-600 mb-3 font-bold'>GIVE YOUR INFORMATION HERE</h1></div>
            <form onSubmit={(e) => e.preventDefault()}>
              <fieldset className='flex flex-col'>
                <label className='font-bold' htmlFor="groupName">Group Name<span className='text-red-700'>*</span></label>
                <input type="text" id='groupName' name='groupName' className='bg-green-300 outline-none w-80 px-3 py-1 mb-2 rounded hover:shadow-gray hover:shadow-md' onChange={createGroupOnchange} value={groupInput.groupName} />
                <label className='font-bold' htmlFor="groupTagName">Tag Name<span className='text-red-700'>*</span></label>
                <input type="text" id='groupTagName' name='groupTagName' className='bg-green-300 outline-none w-80 px-3 py-1 mb-2 rounded hover:shadow-gray hover:shadow-md' onChange={createGroupOnchange} value={groupInput.groupTagName} />
                <div className='flex w-[1000px] h-[300px] justify-between gap-x-2 mt-2'>
                  <div className='overflow-hidden' style={{ width: "35%", height: '100%' }}>
                    <input className='font-mono' type="file" onChange={onChange} />
                    <button className='font-mono text-sm text-white bg-blue-600 px-2 rounded mb-1'>Use default img</button>

                    <Cropper
                      ref={cropperRef}
                      style={{ height: '200px', width: "100%", display: 'flex', justifyContent: 'center' }}
                      zoomTo={0.1}
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      guides={true}
                    />
                  </div>
                  <div className='w-[65%] h-[100%] flex '>
                    <div className="box overflow-hidden flex flex-col justify-center items-center" style={{ width: "50%", height: '100%' }}>
                      <h1 className='mb-3 border border-blue-700 uppercase font-mono px-2 py-1 text-blue-600 rounded'>Preview</h1>
                      <div
                        className="img-preview mb-8 overflow-hidden"
                        style={{ width: "100%", float: "left", height: "200px" }}
                      />
                    </div>

                    <div
                      className="box overflow-hidden flex flex-col justify-center items-center"
                      style={{ width: "50%", float: "right", height: "100%" }}
                    >
                      <h1 className='mb-3'>

                        <button className='bg-blue-600 px-2 py-1 text-white uppercase font-mono rounded hover:shadow-gray hover:shadow-md' onClick={getCropData}>
                          Crop Image
                        </button>
                      </h1>
                      <div className='w-[200px] h-[200px] border border-green-500 overflow-hidden flex justify-center items-center mb-8'>
                        <img className='w-[100%] h-[100%]' src={cropData} alt="cropped" />
                      </div>
                    </div>
                  </div>
                  <br style={{ clear: "both" }} />
                </div>
                <div>
                  <button className='w-full h-10 flex justify-center items-center bg-blue-600 font-bold text-white rounded' onClick={createGroupHandler}>
                    {
                      loader ? (
                        <span>
                          <Watch
                            visible={true}
                            height="20"
                            width="20"
                            radius="48"
                            color="#ffffff"
                            ariaLabel="watch-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        </span>
                      ) : (
                        "CREATE YOUR GROUP"
                      )
                    }
                  </button>
                </div>
              </fieldset>
            </form>
          </Modal>

          {/* modal body */}
        </div>

        <div className='h-[80%] w-full scrollbar-thin scrollbar-thumb-[#ef444485] scrollbar-track-[#0000ff62] overflow-y-scroll divide-y divide-solid divide-slate-300'>
          {
            groupList?.map((item) => (
              <div className='flex justify-start items-center py-1' key={item.groupKey}>
                <picture className='w-10 h-10 rounded-full shadow-md shadow-black overflow-hidden'>
                  <img className='w-full h-full' src={item ? item.groupPhoto : boyChat} alt={item ? item.groupPhoto : boyChat} />
                </picture>
                <div className='basis-[60%] flex flex-col justify-center items-start ml-1'>
                  <h1 className='text-sm font-semibold'>{item.groupName}</h1>
                  <p className='text-xs capitalize'><span className='text-blue-600'>by </span>{item.whoCreateGroupName}</p>
                </div>
                <button className='flex mr-2 justify-center items-center bg-gradient-to-r from-customRed to-customIndigo text-white text-sm px-2 py-[1px] rounded-md'>Join</button>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default GroupList