import React, { useContext } from 'react'
import { GetUIContext } from '../../context/UI/Uicontext'
const TopLoading = () => {
    const context = useContext(GetUIContext)

    return (
        <div className={`fixed top-0 ${context.fullyLoaided ? 'translate-x-full duration-450' : 'translate-x-0'}  ${context.loading ? 'w-0 ' : 'w-full duration-1000'} bg-rose-600 h-0.5 `}></div>
    )
}

export default TopLoading