import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../context/UI/Api'
import { GetUIContext } from '../../context/UI/Uicontext'
import ResultItem from './ResultItem'

import bg from './watch-bg.jpg'
const Search = () => {
    const context = useContext(GetUIContext)
    const { query } = useParams()
    const [searchData, setSearchData] = useState([])
    useEffect(() => {
        context.setLoading(true)
        context.setFullyLoaded(false)
        context.setSidebarStatus(true)
        setInterval(() => {
            context.setLoading(false)
        }, 500)


    }, [])

    const loadSearchData = (q) => {
        fetchDataFromApi(`search/?q=${q}`).then(res => {
            setSearchData(res.contents)
            setTimeout(() => {
                context.setFullyLoaded(true)
            }, 1000)

        })

    }
    useEffect(() => {
        loadSearchData(query)
    }, [query])

    // console.log(searchData[0])
    return (
        <div className="search px-4 md:px-14 py-4 z-[50]">
            <div className="overlay bg-fixed h-screen w-screen top-0 left-0 fixed bg-slate-900 opacity-20 pointer-events-none bg-cover bg-center" style={{ backgroundImage: "url(" + bg + ")" }}>

            </div>

            <div>
                {
                    context.setFullyLoaded ?
                        searchData.map(item => < ResultItem resultData={item} />)
                        : ''
                }

            </div>

        </div>
    )
}

export default Search