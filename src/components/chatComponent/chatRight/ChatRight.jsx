import React from 'react'
import boyChat from "../../../assets/boyChat.gif"
import { BiDotsVertical } from 'react-icons/bi'

const ChatRight = () => {

    return (
        <div className='w-full h-full py-2 px-14'>
            <div className='w-full h-[20%] flex justify-between items-center pb-3 border-b-[1px] border-gray-400'>
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
            <div className='w-full h-[70%] bg-blue-200'>
                <div className='w-full flex justify-between'>
                    <div className='w-[30%] flex flex-col items-center'>
                    <div className='flex w-full bg-yellow-500 justify-center items-center'>
                        fgdgf
                    </div>
                    <p>Time</p>
                </div>
                <div className='w-[30%] flex flex-col items-center'>
                    <div className='flex w-full bg-yellow-500 justify-center items-center'>
                        fgdgf
                    </div>
                    <p>Time</p>
                </div>
                </div>
            </div>
            <div className='w-full h-[10%] bg-red-200'>
                asda
            </div>
        </div>
    )
}

export default ChatRight