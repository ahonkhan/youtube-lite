import numeral from 'numeral'
import React, { useContext, useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { fetchDataFromApi } from '../../context/UI/Api'
import { GetUIContext } from '../../context/UI/Uicontext'
import { formateDate } from '../utils/FormateDate'
const Video = ({ videoData }) => {
    const navigate = useNavigate()
    const context = useContext(GetUIContext)

    const id = videoData?.videoId;
    const goTo = (url) => {
        context.setLoading(false)
        setTimeout(() => {
            navigate(url)
        }, 1000)
    }
    const [videoLoading, setVideoLoading] = useState(true)
    const [thumbnail, setThumbnail] = useState('')
    const [title, setTitle] = useState('')
    const [profile, setProfile] = useState('')
    const [seconds, setSeconds] = useState(0)
    const [viewNumber, setViewNumber] = useState(0)
    const [publishedDate, setPublishedDate] = useState('')
    const [movingThumbnail, setMovingThumbnail] = useState('')
    useEffect(() => {
        setVideoLoading(true)
        if (videoData !== undefined && videoData !== null && videoData !== "") {
            setThumbnail(videoData.thumbnails[0].url)
            setTitle(videoData.title)
            setProfile(videoData.author.avatar[0].url)
            setViewNumber(videoData?.stats?.views)
            setPublishedDate(videoData.publishedTimeText);
            if (videoData.movingThumbnails !== undefined && videoData.movingThumbnails !== null) {
                setMovingThumbnail(videoData.movingThumbnails[0].url)
            } else {
                setMovingThumbnail(null)
            }

            if (videoData.lengthSeconds !== undefined && videoData.lengthSeconds !== null) {
                setSeconds(videoData?.lengthSeconds)
            } else {
                setSeconds(null)
            }
            setTimeout(() => {
                setVideoLoading(false)
            }, 1500)
        }
    }, [videoData, context.activeCategory, id])


    return (
        <div className="cursor-pointer group">

            <div className={`p-2 cursor-pointer ${videoLoading ? '' : 'hidden'}`}>

                <div className="video__thambnail_duration relative">
                    <div className='w-full rounded-lg h-[180px] skeleton-style' ></div>
                    {/* <div className="ovarlay absolute top-0 left-0 h-full w-full duration-500 skeleton-style hover:bg-black hover:bg-opacity-30"></div> */}
                </div>
                <div className="video__footer pt-4 flex gap-3">
                    <div className="profile shrink-0">
                        <div className='w-10 h-10 rounded-full skeleton-style'></div>
                    </div>
                    <div className="w-full">
                        <p className='w-full h-8 rounded-md skeleton-style'></p>
                        <p className='flex items-center text-neutral-400 text-sm mt-2 skeleton-style h-4 w-full rounded-lg'></p>
                    </div>

                </div>
            </div>

            <div className={`p-2 cursor-pointer ${videoLoading ? 'hidden' : ''}`}>

                <div onClick={() => goTo(`/watch/${videoData.videoId}`)} className="video__thambnail_duration relative duration-500 group-hover:scale-105">
                    {
                        (movingThumbnail === undefined || movingThumbnail === null || movingThumbnail == "") ?
                            <img className='w-full rounded-lg' src={thumbnail} alt="" />
                            :
                            <>
                                <img className='w-full rounded-lg group-hover:hidden' src={thumbnail} alt="" />
                                <img className='w-full max-h-[205px] rounded-lg hidden group-hover:block' src={movingThumbnail} alt="" />
                            </>
                    }

                    <span className='text-white absolute bottom-1 right-1 px-1.5 py-0.5 text-sm bg-opacity-70 bg-black rounded'>
                        {
                            seconds !== null ? formateDate(seconds) : ''
                        }
                    </span>
                    <div className="ovarlay absolute pointer-events-none top-0 left-0 h-full w-full duration-500 hover:bg-black hover:bg-opacity-30"></div>
                </div>
                <div className="video__footer pt-4 flex gap-3">
                    <Link to={`/channel/${videoData?.author?.channelId}/video`} className="profile shrink-0">
                        <img title='' className='w-10 h-10 rounded-full' src={profile} alt="" />
                    </Link>
                    <div onClick={() => goTo(`/watch/${videoData.videoId}`)} className="w-full">
                        <p className=''>{title}</p>
                        <p className='flex items-center text-neutral-400 text-sm pt-2'>


                            {
                                (viewNumber === 0 || viewNumber === '0' || viewNumber === '' || viewNumber === undefined || viewNumber === null) ?
                                    '' : <><FaEye /> <span className='pl-2'>{numeral(viewNumber).format("0.a") === null ? '' : numeral(viewNumber).format("0.a")} Views . </span> </>
                            }



                            <span>{" " + publishedDate === null ? '' : publishedDate}</span></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Video