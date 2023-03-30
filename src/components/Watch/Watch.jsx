import React, { useContext, useEffect } from 'react'
import { GetUIContext } from '../../context/UI/Uicontext'
import bg from './watch-bg.jpg';
import { FaThumbsUp } from 'react-icons/fa'
import { FiShare2 } from 'react-icons/fi'
import { MdShare } from 'react-icons/md'
import { BiShare } from 'react-icons/bi'
import { AiOutlineDislike } from 'react-icons/ai'
// import Categories from '../Categories/Categories';
import { Link, useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../context/UI/Api';
import { useState } from 'react';

import RelatedVideoItem from './RelatedVideoItem';
import WatchCategory from './WatchCategory';
import numeral from 'numeral';

const Watch = () => {
    const context = useContext(GetUIContext)
    const [watchData, setDatchData] = useState({})
    const [showMore, setShowMore] = useState(false)
    const [watchLoading, setWatchLoading] = useState(true)
    const [categoryData, setCategoryData] = useState(["All", "Jannat", "Allah", "Waz", "I love you", "Tera nasha", "I miss you", "Programming", "Web Development"])

    useEffect(() => {
        context.setLoading(true)
        context.setFullyLoaded(false)
        context.setSidebarStatus(false)
        setInterval(() => {
            context.setLoading(false)
        }, 500)
        setTimeout(() => {
            context.setFullyLoaded(true)
        }, 1000)
    }, []);

    const { id } = useParams()
    const [relatedContents, setRelatedContents] = useState([])
    const [activeWatchCategory, setWatchActiveCategory] = useState('')
    const fetchedDataForWatch = (query) => {
        context.setLoading(true);
        context.setFullyLoaded(false);
        setWatchLoading(true)
        context.setLoadingRelatedContent(true)
        fetchDataFromApi(`video/details/?id=${query}`).then((res) => {
            setDatchData(res)
            if (watchData?.category !== undefined) {
                setCategoryData(p => [watchData?.category, ...p])
                setCategoryData(p => [res?.author?.title, ...p])
                setWatchActiveCategory(res?.author?.title)
                setCategoryData(p => [...new Set(p)])
                context.setLoadingRelatedContent(true)
                setTimeout(() => {
                    context.setLoadingRelatedContent(false)
                }, 750)
            } else {
                setCategoryData(p => [res?.author?.title, ...p])
                setWatchActiveCategory(res?.author?.title)
                context.setLoadingRelatedContent(true)
                setTimeout(() => {
                    context.setLoadingRelatedContent(false)
                }, 750)

            }
            // console.log(watchData?.category)
            setTimeout(() => {
                setWatchLoading(false)
                context.setLoading(false);
                context.setFullyLoaded(true);
            }, 750)
        })
    }

    const fetchDataForRelatedContent = (query) => {
        // context.setLoadingRelatedContent(true)
        // setWatchLoading(true)
        fetchDataFromApi(`search/?q=${query}`).then((res) => {
            if (res.contents.length > 1) {
                setRelatedContents(res.contents)
            } else {
                setWatchActiveCategory('Quran')

            }
            // setWatchLoading(false)
            context.setLoadingRelatedContent(false)


        })
    }

    useEffect(() => {
        fetchDataForRelatedContent(activeWatchCategory)
    }, [activeWatchCategory])

    useEffect(() => {
        fetchedDataForWatch(id)

    }, [id])



    return (
        <>
            <div className="overlay bg-fixed h-screen w-screen top-0 left-0 fixed bg-slate-900 opacity-20 pointer-events-none bg-cover bg-center z-10" style={{ backgroundImage: "url(" + bg + ")" }}>

            </div>
            <section id='watch' className='flex items-start gap-8 yt__container py-4 flex-wrap xl:flex-nowrap' >


                <div className="left__video-screen w-full mt-5 z-30 ">

                    <>

                        <div className={`video__wrapper ${watchLoading ? 'block' : 'hidden'}`}>
                            <div className="w-full h-[300px] md:h-[520px] skeleton-style"></div>
                        </div>

                        <div className={`video__wrapper ${watchLoading ? 'hidden' : 'block'}`}>
                            <iframe className='w-full h-[300px] md:h-[520px]' src={`https://www.youtube.com/embed/${watchData.videoId}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                    </>

                    <div className="video-details py-4">
                        <div className={`${watchLoading ? 'block' : 'hidden'} py-4 skeleton-style`}>  </div>
                        <h1 className={`text-xl text-slate-200 font-semibold ${watchLoading ? 'hidden' : 'block'}`}> {watchData?.title} </h1>
                    </div>
                    <div className={`video__details-footer select-none flex justify-between flex-wrap gap-4`}>
                        <div className="profile flex gap-2 items-center  ">
                            <Link target={"_blank"} to={'/channel/' + watchData?.author?.channelId} className="profile__img">
                                <div className={`rounded-full w-10 h-10 skeleton-style ${watchLoading ? 'block' : 'hidden'}`}></div>
                                <img className={`rounded-full w-10 h-10 ${watchLoading ? 'hidden' : 'block'}`} src={watchData?.author?.avatar[0]?.url} alt="" />
                            </Link>
                            <div className="profile__name">
                                <p className={`skeleton-style ${watchLoading ? 'block' : 'hidden py-3'}`}></p>
                                <p className={`text-base text-slate-300 font-Montserrat ${watchLoading ? 'hidden' : 'block'}`}>{watchData?.author?.title}</p>
                                <p className={`py-2 skeleton-style ${watchLoading ? 'block' : 'hidden'}`}></p>
                                <p className={`text-[13px] text-neutral-500 font-OpenSans ${watchLoading ? 'hidden' : 'block'}`}>{watchData?.author?.stats?.subscribersText}</p>
                            </div>
                        </div>
                        <div className="statistics flex items-center gap-4">

                            <div className=' text-neutral-50  flex items-center h-9 overflow-hidden rounded-3xl  bg-neutral-800 bg-opacity-80'>
                                <button className='px-4 pl-5 flex gap-2 h-full   items-center border-r border-neutral-700 duration-500 active:bg-neutral-900 '><FaThumbsUp /><span>
                                    {numeral(watchData?.stats?.likes).format("0.a")}
                                </span></button>
                                <button className='pr-5 pl-2 h-full duration-500 active:bg-neutral-900 '><AiOutlineDislike className='text-xl rotate-oposite' /></button>
                            </div>
                            <div className=' text-neutral-50  flex items-center h-9 overflow-hidden rounded-3xl  bg-neutral-800 bg-opacity-80'>
                                <button className='px-6 flex gap-2 h-full items-center  duration-500 active:bg-neutral-900 '><BiShare className='rotate-180 rotate-oposite text-xl' /><span></span></button>
                            </div>

                        </div>

                    </div>

                    <div className={`discription py-5 px-4 hover:bg-opacity-50 bg-opacity-30 bg-neutral-800 rounded-lg select-none cursor-pointer ${watchLoading ? 'hidden' : 'block'} duration-300 mt-4`}>
                        <p className='font-semibold'> {(watchData?.stats?.views)?.toLocaleString()} views  {watchData?.publishedDate}</p>

                        <p className='duration-300' style={{ whiteSpace: "pre-line" }}>
                            {showMore ? (watchData?.description) : (watchData?.description)?.substr(1, 100)}
                        </p>
                        <div className={`flex pt-4 items-center flex-wrap gap-2 ${showMore ? 'block' : 'hidden'}`}>

                            {
                                watchData?.keywords?.map(item =>

                                    <div className={`key-item w-full`}>
                                        <p className='text-neutral-500 hover:underline'><span className='text-neutral-600'>#</span>{item}</p>

                                    </div>


                                )
                            }

                        </div>
                        <button onClick={() => setShowMore(!showMore)} className='px-4 mt-4 py-2.5 font-semibold text-base hover:underline text-white rounded'>{showMore ? 'Show less' : 'Show more'}</button>
                    </div>
                    <div className={`discription py-5 px-4 hover:bg-opacity-50 bg-opacity-30 bg-neutral-800 rounded-lg select-none cursor-pointer duration-300 mt-4 ${watchLoading ? 'block' : 'hidden'}`}>
                        <p className='font-semibold mt-2 py-2 w-[250px] skeleton-style'></p>

                        <p className='duration-300 mt-4 py-8 skeleton-style'>

                        </p>

                    </div>
                </div>
                <div className="right__suggestions-screen w-full xl:w-[420px] shrink-0">
                    <div className="py-2">
                        <WatchCategory activeWatchCategory={activeWatchCategory} setWatchActiveCategory={setWatchActiveCategory} setWatchLoading={setWatchLoading} watchLoading={watchLoading} categoryData={categoryData} setRelatedContents={setRelatedContents} />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1 w-full">

                        {
                            context.loadingRelatedContent ? ''
                                :
                                relatedContents?.map(item => <RelatedVideoItem contentItem={item} />)

                        }

                    </div>
                </div>

            </section></>
    )
}

export default Watch