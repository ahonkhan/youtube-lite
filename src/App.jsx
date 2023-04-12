import axios from 'axios'
import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Header from './components/header/Header'
import HomeScreen from './components/mainScreens/HomeScreen'
import MainWrapper from './components/mainScreens/MainWrapper'
import Watch from './components/Watch/Watch'
import { UiContext } from './context/UI/Uicontext'
import "./App.css"
import Search from './components/searchScreens/SearchScreen'
import Channel from './components/channel/Channel'
import ChannelHome from './components/channel/ChannelHome'
import ChannelVideo from './components/channel/ChannelVideo'
import ChannelPlayList from './components/channel/ChannelPlayList'
import YtChannelAbout from './components/channel/YtChannelAbout'
import YtChannelDiscription from './components/channel/YtChannelDiscription'
import ChannelWrapper from './components/channel/ChannelWrapper'

const App = () => {
    return (


        <UiContext>
            <Routes>
                <Route path='/' element={<>
                    <MainWrapper>
                        <HomeScreen />
                    </MainWrapper>
                </>} />
                <Route path='/watch/:id' element={<>
                    <MainWrapper>
                        <Watch />
                    </MainWrapper>
                </>} />
                <Route path='/search/:query' element={<>
                    <MainWrapper>
                        <Search />
                    </MainWrapper>
                </>} />
                <Route path='/channel/:channelId' element={<>
                    <MainWrapper>
                        <Channel />
                    </MainWrapper>
                </>}>
                    <Route path='' element={<ChannelWrapper><ChannelHome /></ChannelWrapper>} />
                    <Route path='home' element={<ChannelWrapper><ChannelHome /></ChannelWrapper>} />
                    <Route path='video' element={<ChannelWrapper><ChannelVideo /></ChannelWrapper>} />
                    <Route path='playlist' element={<ChannelWrapper><ChannelPlayList /></ChannelWrapper>} />
                    <Route path='about' element={<ChannelWrapper><YtChannelAbout /></ChannelWrapper>} />
                    <Route path='discriptions' element={<ChannelWrapper><YtChannelDiscription /></ChannelWrapper>} />
                </Route>
                <Route path='*' element={<>
                    <MainWrapper>
                        <HomeScreen />
                    </MainWrapper>
                </>} />
            </Routes>
        </UiContext >



    )
}

export default App