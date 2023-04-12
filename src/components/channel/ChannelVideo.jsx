import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { GetUIContext } from "../../context/UI/Uicontext"
import ChannelVideoItem from './ChannelVideoItem'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../context/UI/Api'
const ChannelVideo = () => {
  const { channelId } = useParams()
  const context = useContext(GetUIContext)
  useEffect(() => {
    context.setLoading(true)
    context.setFullyLoaded(false)
    context.setSidebarStatus(true)
    setInterval(() => {
      context.setLoading(false)
    }, 500)

  }, []);


  const [videoItems, setVideoItems] = useState([])

  const loadVideoItems = (channelId) => {
    fetchDataFromApi(`channel/videos/?id=${channelId}`).then(res => {
      setVideoItems(res.contents)
      setTimeout(() => {
        context.setFullyLoaded(true)
      }, 1000)
    })
  }

  useEffect(() => {

    loadVideoItems(channelId)

  }, [channelId])
  return (
    <div className='flex gap-2 justify-center xl:justify-between flex-wrap'>

      {videoItems?.map(videoItem => <ChannelVideoItem videoItem={videoItem} />)}


    </div>
  )
}

export default ChannelVideo