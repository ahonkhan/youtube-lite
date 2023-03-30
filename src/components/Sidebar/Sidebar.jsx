import React, { useContext } from 'react'
import { GetUIContext } from '../../context/UI/Uicontext'
// import { BiHome } from 'react-icons/all'
import { BiHome, BiLibrary, BiTime, BiDesktop, BiBook, BiTrendingUp, BiLike, BiMusic } from 'react-icons/bi'
import { MdSubscriptions, MdHistory, MdArchitecture } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const sidebardata = useContext(GetUIContext)
    const { inputBoxData, setInputBoxData } = sidebardata;

    const sidebarItems = [
        { name: 'Home', icon: <BiHome />, path: '/' },
        { name: 'Subscriptions', icon: <MdSubscriptions />, path: '/subscriptions' },
        { name: 'Liked video', icon: <BiLike />, path: '/liked_video' },
    ]
    const sidebarAdditionalItems = [
        { name: 'Library', icon: <BiLibrary />, path: '/library' },
        { name: 'History', icon: <MdHistory />, path: '/histry' },
        { name: 'Watch later', icon: <BiTime />, path: '/watch_later' },
    ]
    const sidebarCategory = [
        { name: 'Programming', icon: <BiDesktop />, search: 'Programming' },
        { name: 'Music', icon: <BiMusic />, search: 'Music' },
        { name: 'Study', icon: <BiBook />, search: 'Study' },
        { name: 'Creative', icon: <MdArchitecture />, search: 'Creative' },
        { name: 'Trending', icon: <BiTrendingUp />, search: 'Trending' },
    ]

    const navigate = useNavigate()
    const searchData = (q) => {
        navigate(`/search/${q}`)
        setInputBoxData(q)
        sidebardata.setVideoItemLoading(true)
        sidebardata.setLoading(true)
        sidebardata.setFullyLoaded(false)
        sidebardata.setSidebarStatus(true)
        


    }
    return (
        <aside className={`pb-4 overflow-y-auto scrollbar-thin z-[99999] scrollbar-track-neutral-800 scrollbar-thumb-neutral-700 hover:scrollbar-thin ${sidebardata.sidebarStatus ? '' : '-translate-x-full'} duration-500 fixed top-0 pt-32 md:pt-16 bg-neutral-900 left-0 yt__pl  w-[230px] h-full`}>
            <div className="pr-4">
                <ul className='flex flex-col gap-2 border-b border-neutral-700 pb-4'>
                    {
                        sidebarItems.map(item =>
                            <li >
                                <NavLink to={item.path} className={`hover:bg-neutral-800  w-full text-xl flex items-center  gap-6 text-neutral-300 tracking-wide duration-150 cursor-pointer  py-2.5 px-4 rounded-xl`}>
                                    {item.icon}
                                    <span className='text-base'>{item.name}</span>

                                </NavLink>
                            </li>
                        )
                    }



                </ul>
                <ul className='flex flex-col pt-2 gap-2 border-b border-neutral-700 pb-4'>
                    {
                        sidebarAdditionalItems.map(item =>
                            <li >
                                <NavLink to={item.path} className={`hover:bg-neutral-800 w-full text-xl flex items-center  gap-6 text-neutral-300 tracking-wide duration-150 cursor-pointer  py-2.5 px-4 rounded-xl`}>
                                    {item.icon}
                                    <span className='text-base'>{item.name}</span>

                                </NavLink>
                            </li>
                        )
                    }



                </ul>
                <ul className='flex flex-col pt-2 gap-2 pb-4'>
                    <p className='pl-4 text-xl text-neutral-500'>Explore</p>
                    {
                        sidebarCategory.map(item =>
                            <li >
                                <button onClick={() => searchData(item.search)} className={`hover:bg-neutral-800  w-full text-xl flex items-center  gap-6 text-neutral-300 tracking-wide duration-150 cursor-pointer  py-2.5 px-4 rounded-xl`}>
                                    {item.icon}
                                    <span className='text-base'>{item.name}</span>

                                </button>
                            </li>
                        )
                    }

                </ul>
            </div>
        </aside>
    )
}

export default Sidebar