import React, { useContext } from 'react'
import { GetUIContext } from '../../context/UI/Uicontext'
import Header from '../header/Header'
import Sidebar from '../Sidebar/Sidebar'
import HomeScreen from './HomeScreen'
const MainWrapper = ({ children }) => {
    const sidebarData = useContext(GetUIContext)
    return (
        <>
            <Header />
            <div className={`pt-32 md:pt-16 min-h-screen bg-neutral-900 px-0  md:px-4 duration-500 ${sidebarData.sidebarStatus ? 'md:pl-[230px]' : ''} `}>
                <Sidebar />

                <main className='w-full'>
                    {children}
                </main>


            </div>
        </>
    )
}

export default MainWrapper