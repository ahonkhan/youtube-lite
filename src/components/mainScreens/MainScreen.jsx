import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './HomeScreen'
const MainScreen = () => {
    return (
        <main className='w-full bg-neutral-900 min-h-screen'>
            <HomeScreen />

        </main>
    )
}

export default MainScreen