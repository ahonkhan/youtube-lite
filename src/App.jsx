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