import React from 'react'

const ButtonRounded = ({ children, addBg }) => {
    return (
        <button className={`w-10 ${addBg?'bg-neutral-800':''} bg-opacity-50 hover:bg-opacity-100 h-10 flex items-center justify-center duration-300 hover:bg-neutral-800 rounded-full active:scale-95`}>
            {children}
        </button >)
}

export default ButtonRounded