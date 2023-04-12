import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { GetUIContext } from "../../context/UI/Uicontext"
const ChannelWrapper = ({children}) => {
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
  }, []);

  return (
    <div className='py-8 yt__container'>{children}</div>
  )
}

export default ChannelWrapper