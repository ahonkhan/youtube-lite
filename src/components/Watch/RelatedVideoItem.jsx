import numeral from 'numeral'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GetUIContext } from '../../context/UI/Uicontext'
import { formateDate } from '../utils/FormateDate'
const RelatedVideoItem = ({ contentItem }) => {
    const context = useContext(GetUIContext)
    const [movingThumbnail, setMovingThumbnail] = useState(null)
    const [loadingItem, setLoadingItem] = useState(true)
    useEffect(() => {
        if (contentItem?.video?.movingThumbnails !== null) {
            setMovingThumbnail(contentItem?.video?.movingThumbnails[0].url)
        }
        if (context.loadingRelatedContent === false) {
            setTimeout(() => {
                setLoadingItem(false)
            }, 1000)
        }
    }, [contentItem])

    return (
        <>
            <Link to={`/watch/${contentItem?.video?.videoId}`} className={`video-item ${loadingItem ? 'hidden' : 'block'} ${contentItem?.video?.videoId === undefined ? 'hidden' : ''} group cursor-pointer group`}>
                <div className="flex gap-1.5 items-start flex-wrap md:flex-nowrap ">
                    <div className="thumbnail shrink-0 select-none relative w-full sm:w-fit rounded-md overflow-hidden">
                        {
                            movingThumbnail !== null ?
                                <>
                                    <img className='h-[180px] sm:h-[110px] group-hover:hidden w-full pointer-events-none'
                                        src={contentItem?.video?.thumbnails[0].url} alt="" />
                                    <img className='h-[180px] sm:h-[110px] hidden group-hover:block w-full pointer-events-none'
                                        src={movingThumbnail} alt="" />
                                </> :
                                <img className='h-[180px] sm:h-[110px] w-full pointer-events-none'
                                    src={contentItem?.video?.thumbnails[0].url} alt="" />

                        }

                        <div className="absolute pointer-events-none h-full w-full bg-black bg-opacity-5 group-hover:bg-opacity-30 duration-300 top-0 left-0"></div>
                        <span className='absolute right-1 rounded bottom-1 bg-black bg-opacity-80 px-2 text-[12px]'>{formateDate(contentItem?.video?.lengthSeconds)}</span>
                    </div>
                    <div className="w-full">
                        <p className='leading-5 text-white'>{contentItem?.video?.title}</p>
                        <Link to={"/channel/" + contentItem?.video?.author?.channelId + "/home"}>
                            <p className='text-sm text-neutral-300 tracking-wide mt-2'>{contentItem?.video?.author?.title}</p>
                        </Link>
                        <div className="statistics text-sm text-neutral-400 tracking-tight flex items-center gap-1">
                            <p>{numeral(contentItem?.video?.stats?.views).format("0.a")} Views</p>
                            <p className='-translate-y-0.5'>.</p>
                            <p>{contentItem?.video?.publishedTimeText}</p>
                        </div>
                    </div>
                </div>
            </Link>
            <div className={`video-item  cursor-pointer  ${loadingItem ? 'block' : 'hidden'}`}>
                <div className="flex gap-1.5 items-start flex-wrap md:flex-nowrap ">
                    <div className="h-[180px] shrink-0 sm:h-[110px]  md:w-[180px] w-full skeleton-style sm:w-fit  rounded-md">

                        <div className='h-[180px] sm:h-[110px] w-full pointer-events-none'></div>
                    </div>
                    <div className="w-full">

                        <div className='skeleton-style py-2.5 w-full'></div>
                        <div className='skeleton-style py-4 mt-5 w-full'></div>

                        <div className="statistics text-sm mt-4 text-neutral-400 tracking-tight flex items-center gap-1">
                            <div className='skeleton-style py-2 w-[30%]'></div>
                            <div className='skeleton-style py-2 w-[30%]'></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RelatedVideoItem