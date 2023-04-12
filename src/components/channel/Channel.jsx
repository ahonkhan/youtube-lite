import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../context/UI/Api'
import { GetUIContext } from "../../context/UI/Uicontext"
const Channel = () => {
  const context = useContext(GetUIContext)
  const [videoDetailsLoading, setVideoDetailsLoading] = useState(true)
  useEffect(() => {
    context.setLoading(true)
    context.setFullyLoaded(false)
    context.setSidebarStatus(true)
    setInterval(() => {
      context.setLoading(false)
    }, 500)
  }, []);

  const { channelId } = useParams()
  const [channelDetails, setChannelDetails] = useState([])
  const loadChannelDetails = (channelId) => {
    fetchDataFromApi(`channel/details/?id=${channelId}`).then(res => {
      setChannelDetails(res)
      setTimeout(() => {
        context.setFullyLoaded(true)
        setVideoDetailsLoading(false)
      }, 700)
    })
  }
  useEffect(() => {
    loadChannelDetails(channelId)
  }, [channelId])

  return (
    <section className=''>
      <div className="cover__photo">
        <div className={`${videoDetailsLoading ? 'block' : 'hidden'} w-full h-[300px] skeleton-style`}></div>
        <div className='hidden md:block'>
          <img className={`${videoDetailsLoading ? 'hidden' : 'block'}`} src={channelDetails?.banner?.desktop[2].url} alt="" />
        </div>
        <div className='md:hidden'>
          <img className={`${videoDetailsLoading ? 'hidden' : 'block'}`} src={channelDetails?.banner?.mobile[4].url} alt="" />
        </div>
      </div>
      <div className="channel__profile yt__container">
        <div className="px-4 py-8 flex gap-8 item-center">
          <img className={`${videoDetailsLoading ? 'hidden' : 'block'} rounded-full w-[88px] h-[88px] md:h-[120px] md:w-[120px]`} src={channelDetails?.avatar !== undefined ? channelDetails?.avatar[2]?.url : ''} alt="" />
          <div className={`${videoDetailsLoading ? 'block' : 'hidden'} rounded-full  w-[88px] h-[88px] md:h-[120px] md:w-[120px] skeleton-style`}></div>
          <div className="">
            <h1 className={`${videoDetailsLoading ? 'hidden' : 'block'} text-2xl md:text-3xl text-neutral-50 font-OpenSans font-bold`}>{channelDetails?.title}</h1>
            <div className={`${videoDetailsLoading ? 'block' : 'hidden'} w-[400px] py-2.5 skeleton-style`}></div>
            <div className={`${videoDetailsLoading ? 'hidden' : 'block'}`}>
              <p className="username text-base md:text-xl text-neutral-300 font-Montserrat font-medium">{channelDetails?.username}</p>
              <p className="username text-sm text-neutral-400 font-Montserrat font-normal flex items-center gap-2"><span>{channelDetails?.stats?.subscribersText}</span> <span>{channelDetails?.stats?.videosText}</span></p>
              <p className='whitespace-pre-line text-base  text-neutral-300 font-Montserrat' style={{ whiteSpace: "pre-line" }}>
                {channelDetails?.description?.substring(0, 50) + "..."} </p>
            </div>
            <>
              <div className={`${videoDetailsLoading ? 'block' : 'hidden'} w-[200px] py-2.5 mt-1.5 skeleton-style`}></div>
              <div className={`${videoDetailsLoading ? 'block' : 'hidden'} w-[350px] py-2.5 mt-1.5 skeleton-style`}></div>
              <div className={`${videoDetailsLoading ? 'block' : 'hidden'} w-[250px] py-2.5 mt-1.5 skeleton-style`}></div>

            </>
          </div>
        </div>
      </div>
      <div className="channel__tab yt__container">
        <ul className='flex gap-1'>
          <li className='mx-1.5 cursor-pointer font-normal font-Montserrat text-neutral-300'>
            <NavLink className="px-3 py-1.5 rounded-sm" to={"home"}>Home</NavLink>
          </li>
          <li className='mx-1.5 cursor-pointer font-normal font-Montserrat text-neutral-300'>
            <NavLink className="px-3 py-1.5 rounded-sm" to={"video"}>Video</NavLink>
          </li>
          <li className='mx-1.5 cursor-pointer rounded-sm font-normal font-Montserrat text-neutral-300'>
            <NavLink className="px-3 py-1.5 rounded-sm" to={"about"}>About</NavLink>
          </li>
          <li className='mx-1.5 cursor-pointer font-normal font-Montserrat text-neutral-300'>
            <NavLink className="px-3 py-1.5 rounded-sm" to={"playlist"}>Playlist</NavLink>
          </li>

          <li className='mx-1.5 cursor-pointer font-normal font-Montserrat text-neutral-300'>
            <NavLink className="px-3 py-1.5 rounded-sm" to={"discriptions"}>Discription</NavLink>
          </li>
        </ul>

        <div className="tab__wrapper">
          <Outlet />
        </div>
      </div>

    </section >
  )
}

export default Channel