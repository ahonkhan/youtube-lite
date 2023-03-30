import numeral from 'numeral'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetUIContext } from '../../context/UI/Uicontext'
import { formateDate } from '../utils/FormateDate'
const ResultItem = ({ resultData }) => {
    const context = useContext(GetUIContext)
    const { videoItemLoading, setVideoItemLoading } = context;
    useEffect(() => {
        setTimeout(() => {
            setVideoItemLoading(false)
        }, 2000)
    })
    return (
        resultData.type === 'video' ?
            <>
                <Link to={`/watch/${resultData?.video?.videoId}`} className={`${videoItemLoading ? 'hidden' : ''} group result-item bg-neutral-700 flex-wrap ${context.sidebarStatus ? 'xl:flex-nowrap' : 'md:flex-nowrap'}  p-4 rounded-lg bg-opacity-0 duration-500 hover:bg-opacity-10 cursor-pointer active:bg-opacity-25 flex z-50  gap-4`}>
                    <div className="thumbnail cursor-pointer w-full sm:w-fit relative shrink-0">

                        {
                            resultData?.video?.movingThumbnails !== null ?
                                resultData?.video?.movingThumbnails[0]?.url !== undefined ?
                                    <>
                                        <img className='rounded-xl w-full hidden md:w-[360px] group-hover:block' src={resultData?.video?.movingThumbnails[0]?.url} alt="" />
                                        <img className='rounded-xl w-full block group-hover:hidden md:w-[360px]' src={resultData?.video?.thumbnails[0]?.url} alt="" />
                                    </>

                                    :
                                    <img className='rounded-xl w-full md:w-[360px]' src={resultData?.video?.thumbnails[0]?.url} alt="" />
                                :
                                <img className='rounded-xl w-full md:w-[360px]' src={resultData?.video?.thumbnails[0]?.url} alt="" />

                        }
                        {/* <img className='rounded-xl w-full md:w-[360px]' src={resultData?.video?.thumbnails[0]?.url} alt="" /> */}

                        <span className='absolute tracking-wide right-1 bottom-1 text-white bg-black bg-opacity-80 font-semibold px-2 py-0.5 text-[12px] font-OpenSans rounded'>
                            {formateDate(resultData?.video?.lengthSeconds)}
                        </span>
                    </div>
                    <div className="content-details w-full">
                        <div className="heading">
                            <h1 className='text-lg'>{resultData?.video?.title}
                            </h1>
                            <p className='text-sm text-neutral-400'>{numeral(resultData?.video?.stats?.views).format("0.a")} views <span className=''>.</span> {resultData?.video?.publishedTimeText}</p>

                        </div>
                        {/* profile */}

                        <div className="profile flex items-center mt-4">
                            <img className='w-8 h-8 rounded-full' src={resultData?.video?.author?.avatar[0]?.url} alt="" />
                            <p className='text-[13px] font-Montserrat text-neutral-400 ml-2'>{resultData?.video?.author?.title}</p>
                        </div>

                        <div className="mt-3">
                            <p className='text-[13px] font-OpenSans text-neutral-200'>{resultData?.video?.descriptionSnippet}</p>

                        </div>
                    </div>
                </Link>
                <div className={`${videoItemLoading ? '' : 'hidden'} result-item bg-neutral-700 flex-wrap ${context.sidebarStatus ? 'xl:flex-nowrap' : 'md:flex-nowrap'}  p-4 rounded-lg bg-opacity-0 duration-500 hover:bg-opacity-10 cursor-pointer flex z-50  gap-4`}>
                    <div className="thumbnail cursor-pointer w-[280px] md:w-fit shrink-0">
                        <div className='rounded-xl w-full md:w-[360px] h-[200px] md:h-[188px] skeleton-style'>
                        </div>

                    </div>
                    <div className="content-details w-full">
                        <div className="heading">
                            <h1 className='text-lg skeleton-style py-4'>
                            </h1>
                            <p className='text-sm text-neutral-400 skeleton-style mt-3 py-2.5 w-[200px]'>
                            </p>

                        </div>
                        {/* profile */}

                        <div className="profile flex items-center  mt-4">
                            <div className='w-8 h-8 skeleton-style rounded-full'></div>

                            <p className='text-sm text-neutral-400 ml-4 skeleton-style py-2.5 w-[200px]'>
                            </p>
                        </div>

                        <div className="mt-3">
                            <p className='text-sm text-neutral-400  skeleton-style py-2.5 '>
                            </p>
                        </div>
                    </div>
                </div>
            </>
            : ''
    )
}

export default ResultItem