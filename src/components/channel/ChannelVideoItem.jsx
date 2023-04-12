import React, { useEffect, useState } from 'react'
import { formateDate } from '../utils/FormateDate'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
const ChannelVideoItem = ({ videoItem }) => {

    const [videoItemLoaded, setVideoItemLoaded] = useState(true)

    useEffect(() => {
        if (videoItem) {
            setTimeout(() => {
                setVideoItemLoaded(false)
            }, 700)
        }
    }, [])
    return (
        <>
            <div className={`w-[350px] md:w-[250px] group cursor-pointer ${videoItemLoaded ? 'block' : 'hidden'}`}>
                <div className="h-[160px] skeleton-style"></div>
                <div className='mt-3 py-2.5 skeleton-style'>

                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className='mt-3 py-2.5 skeleton-style'>
                    </div>

                </div>

            </div>
            <Link to={`/watch/${videoItem?.video?.videoId}`} className={`w-[350px] md:w-[260px] mb-2 group cursor-pointer ${videoItemLoaded ? 'hidden' : 'block'}`}>
                <div className="thumbnail relative">
                    <span className='px-2 bg-black bg-opacity-60 font-medium text-white absolute bottom-1 right-1 rounded text-[12px]'>{formateDate(videoItem?.video?.lengthSeconds)}</span>
                    {
                        videoItem?.video?.movingThumbnails !== null ?
                            <>
                                <img className='w-full h-[160px] md:h-[140px] rounded-lg group-hover:hidden' src={videoItem?.video?.thumbnails[2]?.url} alt="" />
                                <img className='w-full h-[160px] md:h-[140px] rounded-lg hidden group-hover:block' src={videoItem?.video?.movingThumbnails[0]?.url} alt="" />

                            </> :
                            <img className='w-full h-[160px] md:h-[140px] rounded-lg ' src={videoItem?.video?.thumbnails[2]?.url} alt="" />

                    }

                    <div className="overlay absolute w-full h-full bg-black group-hover:bg-opacity-40 bg-opacity-5 duration-500 z-10 top-0 left-0"></div>
                </div>
                <div className='pt-3'>
                    <p className='text-sm text-neutral-300 overflow-hidden text-ellipsis'>
                        {
                            videoItem?.video?.title?.substring(0, 70) + "..."
                        }
                    </p>
                </div>
                <div className="flex pt-1 gap-4  text-neutral-400 text-sm">
                    <p>{numeral(videoItem?.video?.stats?.views).format("0.a")} views</p>
                    <p>.</p>
                    <p>{videoItem?.video?.publishedTimeText}</p>
                </div>
            </Link></>
    )
}

export default ChannelVideoItem