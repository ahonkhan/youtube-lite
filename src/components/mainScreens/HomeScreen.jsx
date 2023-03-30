import React, { useContext, useEffect, useState } from 'react'
import { GetUIContext } from '../../context/UI/Uicontext'
import Categories from '../Categories/Categories'
import Video from '../video/Video'
const HomeScreen = () => {
    const context = useContext(GetUIContext)
    useEffect(() => {
        context.setLoading(true)
        context.setFullyLoaded(false)
        context.setSidebarStatus(true)
        setInterval(() => {
            context.setLoading(false)
        }, 500)
        setTimeout(() => {
            context.setFullyLoaded(true)
        }, 1000)

    }, [])

    return (

        <div className='px-4'>
            <Categories />
            <div className="video-wrapper grid mt-2 grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 md:grid-cols-2 gap-4">
                {
                    context.feedData.map(item => <Video videoData={item.video} id={item.videoId} />)
                }
            </div>
        </div>

    )
}

export default HomeScreen