import React, { useState } from 'react'
import boyChat from "../../../assets/boyChat.gif"
import { BiDotsVertical } from 'react-icons/bi'
import { MdEmojiEmotions } from 'react-icons/md'
import { FaCameraRetro, FaPaperPlane } from 'react-icons/fa'
import EmojiPicker from 'emoji-picker-react';

const ChatRight = () => {

    const [emojiClick, setEmojiClick] = useState(false)
    const [message, setMessage] = useState("")

    // handle emoji click
    const handleEmojiClick = ()=>{
        setEmojiClick(!emojiClick)
    }

        const handleInput=(event)=>{
        const {value} = event.target
            setMessage(value)
    }

    // emojipicker function implement
    const handleEmojiPicker =(event)=>{
        setMessage((prev)=>{
            console.log(prev);
            
            return `${prev}${event?.emoji}`
        })
    }

    return (
        <div className='w-full h-full py-2 px-14'>
            <div className='w-full h-[20%] flex justify-between items-center pb-3'>
                <div className='flex justify-start items-center gap-x-6'>
                    <div className='w-14 h-14 rounded-full overflow-hidden bg-emerald-300'>
                        <picture className='w-full h-full'>
                            <img src={boyChat} alt={boyChat} className='w-full h-full object-cover' />
                        </picture>
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <h3 className='text-xl'>Name</h3>
                        <p className='text-sm'>Online</p>
                    </div>
                </div>
                <div>
                    <span><BiDotsVertical className='text-xl cursor-pointer' /></span>
                </div>
            </div>
            <div className='w-full h-[70%] py-3 px-3 border-b-[1px] border-t-[1px] border-gray-200'>
                <div className='w-full flex flex-col gap-y-4 justify-between'>
                    <div className='w-[30%] self-start'>
                        <div className='flex flex-col items-center'>
                            <div className='flex w-full bg-yellow-500 justify-center items-center text-wrap py-2'>
                                Hello, how are you?
                            </div>
                            <p>Time</p>
                        </div>
                    </div>
                    <div className='w-[30%] self-end'>
                        <div className='flex flex-col items-center'>
                            <div className='flex w-full bg-yellow-500 justify-center items-center text-wrap py-2'>
                                Hi, I am well.
                            </div>
                            <p>Time</p>
                        </div>
                    </div>
                    <div className='w-[30%] self-start'>
                        <div className='flex flex-col items-center'>
                            <div className='flex w-full bg-yellow-500 justify-center items-center text-wrap py-2'>
                                Hello, how are you?
                            </div>
                            <p>Time</p>
                        </div>
                    </div>
                    <div className='w-[30%] self-start'>
                        <div className='flex flex-col items-center'>
                            <div className='flex w-full bg-yellow-500 justify-center items-center text-wrap py-2'>
                                Hello, how are you?
                            </div>
                            <p>Time</p>
                        </div>
                    </div>
                    <div className='w-[30%] self-end'>
                        <div className='flex flex-col items-center'>
                            <div className='flex w-full bg-yellow-500 justify-center items-center text-wrap py-2'>
                                Hi, I am well.
                            </div>
                            <p>Time</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* chat bottom */}
            <div className='w-full h-[10%] relative'>
                <div className='w-full h-full flex justify-center gap-x-1 items-center'>
                    <div className='flex justify-center items-center w-full gap-x-1'>
                        <input type="text" className='flex-grow bg-gray-100 p-2 rounded-md shadow-lg' placeholder='Type a massage' onChange={handleInput} value={message}/>
                        <div className='flex justify-center items-center gap-x-2'>
                            <button className='w-full flex justify-center items-center text-3xl text-yellow-500'><span onClick={handleEmojiClick}><MdEmojiEmotions /></span>
                            {emojiClick && <span className='absolute bottom-full left-1/3'><EmojiPicker onEmojiClick={handleEmojiPicker} /></span>}</button>
                            <button className='w-full flex justify-center items-center text-2xl'><span><FaCameraRetro /></span></button>
                            <button className='flex justify-center items-center text-md text-white bg-emerald-500 p-2 rounded-full'><span><FaPaperPlane /></span></button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ChatRight