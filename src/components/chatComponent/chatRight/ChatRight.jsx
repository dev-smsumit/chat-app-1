import React from 'react'
import boyChat from "../../../assets/boyChat.gif"

const ChatRight = () => {
    
    return (
        <div className='w-full p-2'>
            <div className='w-full'>
                <div className='w-14 h-14 rounded-full overflow-hidden bg-emerald-300'>
                    <picture className='w-full h-full p-3'>
                        <img src={boyChat} alt={boyChat} className='w-full h-full object-cover'/>
                    </picture>
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default ChatRight