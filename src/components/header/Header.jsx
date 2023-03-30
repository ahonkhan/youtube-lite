import React, { useContext, useEffect, useState } from 'react'
// importing router
import { Link, useNavigate } from 'react-router-dom'

// importing iccons
import { FaMicrophone } from 'react-icons/fa'
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'
import { MdStream, MdOutlineNotifications } from 'react-icons/md'
import { BiMenu } from 'react-icons/bi'
import ButtonRounded from '../buttons/ButtonRounded'
import { GetUIContext } from '../../context/UI/Uicontext'
import TopLoading from '../Loading/TopLoading'
import logo from "./site-logo.png"
import { fetchDataFromApi } from '../../context/UI/Api'
const Header = () => {
    const context = useContext(GetUIContext)
    const { inputBoxData, setInputBoxData } = context
    const [searchSuggestions, setSearchSuggestions] = useState([])
    const [inputFocused, setInputFocused] = useState(false)

    const navigate = useNavigate()
    const searchData = (e) => {
        e.preventDefault();
        if (inputBoxData !== "") {
            navigate(`/search/${inputBoxData}`)
            context.setLoading(true)
            context.setFullyLoaded(false)
            context.setVideoItemLoading(true)
        }


    }
    const LoadSearchData = (e) => {
        // e.target.value.length > 2 ? setInputFocused(true) : setInputFocused(false)



    }
    useEffect(() => {
        if (inputBoxData.length > 0) {
            fetchDataFromApi(`search/?q=${inputBoxData}}`).then(res => {
                setSearchSuggestions(res.refinements)
                setInputFocused(true)

            })
        }

    }, [inputBoxData])
    const goToSearchPage = (item) => {
        context.setVideoItemLoading(true)
        context.setLoading(true)
        context.setFullyLoaded(false)
        setInputBoxData(item)
        navigate(`/search/${item}`)
        setInputBoxData("")
        setInputFocused(false)
        setSearchSuggestions([])

    }
    return (
        <header className={`bg-neutral-900 fixed px-2 top-0 left-0 w-full z-[9999999]`}>
            <TopLoading />
            <div className="yt__container py-2.5 flex flex-col lg:flex-row justify-between lg:items-start">
                <div className="header__left shrink-0 w-full lg:w-[25%] flex items-center justify-between gap-2 md:gap-6">
                    <div className="flex items-center gap-2 ">
                        <button onClick={() => context.setSidebarStatus(!context.sidebarStatus)} className={`header__left-bar flex items-center shrink-0 active:scale-95 duration-500 justify-center w-10 h-10 ${context.sidebarStatus ? '' : 'bg-[#393939] bg-opacity-70'} hover:bg-[#393939] bg-opacity-40 rounded-full`}>
                            <BiMenu className='text-3xl text-slate-200' />
                        </button>
                        <Link to="/" className="header__left-logo flex items-center gap-1">
                            <img className='h-6' src={logo} alt="" />
                            <p className='text-2xl text-rose-500 font-Montserrat tracking-tighter font-semibold'>Tube</p>
                        </Link>
                    </div>

                    <div className="header__right flex w-fit lg:hidden shrink-0 justify-end  md:w-fit items-center gap-2 md:gap-4">
                        <ButtonRounded addBg={false}>
                            <MdStream className='text-xl' />
                        </ButtonRounded>
                        <ButtonRounded addBg={false}>
                            <div className="relative">
                                <MdOutlineNotifications className='text-xl' />
                                <span className='absolute text-[11px] bg-red-600 text-white rounded-full w-5 outline outline-1 outline-red-500 h-5 flex items-center justify-center  -right-1/2 -top-1/2'>9</span>
                            </div>
                        </ButtonRounded>
                        <ButtonRounded addBg={true}>

                            <AiOutlineUser className='text-xl' />

                        </ButtonRounded>
                    </div>
                </div>
                <div className="lg:gap-3 flex justify-end  lg:justify-between mt-4 lg:mt-0 w-full flex-wrap-reverse items-center">
                    <div className="header__mid  flex relative sm:static items-center gap-4 w-full justify-between md:w-fit">

                        <form className="search__box  mt-1 sm:relative w-full md:w-[500px] lg:w-[450px] xl:w-[600px] flex items-center rounded-3xl h-10 border-neutral-800 border">
                            <input onKeyPress={(e) => LoadSearchData(e)} value={inputBoxData} onChange={(e) => { setInputBoxData(e.target.value) }} placeholder='Search your happiness here...' type="text" className='h-full  block placeholder:text-neutral-600 w-full px-4 bg-transparent text-sm text-neutral-400 font-OpenSans outline-none' />
                            <button onClick={(e) => searchData(e)} className='shrink-0 rounded-r-3xl bg-neutral-800 px-5 h-full flex items-center justify-center'><AiOutlineSearch className='text-white text-xl' /></button>
                            {/* search suggestions */}
                            <div className={`${inputFocused ? 'block' : 'hidden'} ${searchSuggestions.length !== 0 ? 'py-2' : ''} translate-y-2 scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-700 rounded-lg absolute  w-full bg-neutral-800 shadow-lg top-full right-0 max-h-[380px] overflow-y-auto`}>
                                <ul>
                                    {
                                        searchSuggestions.map(item =>
                                            <li onClick={() => goToSearchPage(item)} className='w-full flex mb-2 items-center gap-8 py-1.5 select-none cursor-pointer duration-500 hover:bg-neutral-600  hover:bg-opacity-40 px-4 font-Montserrat text-sm  rounded-sm text-gray-50'>
                                                <AiOutlineSearch className='text-lg' />
                                                <p>{item}</p>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>

                        </form>


                        <ButtonRounded addBg={true}>
                            <FaMicrophone className='text-md' />
                        </ButtonRounded>
                    </div>
                    <div className="header__right hidden lg:flex shrink-0 justify-end w-full md:w-fit items-center gap-2 md:gap-4">
                        <ButtonRounded addBg={false}>
                            <MdStream className='text-xl' />
                        </ButtonRounded>
                        <ButtonRounded addBg={false}>
                            <div className="relative">
                                <MdOutlineNotifications className='text-xl' />
                                <span className='absolute text-[11px] bg-red-600 text-white rounded-full w-5 outline outline-1 outline-red-500 h-5 flex items-center justify-center  -right-1/2 -top-1/2'>9</span>
                            </div>
                        </ButtonRounded>
                        <ButtonRounded addBg={true}>

                            <AiOutlineUser className='text-xl' />

                        </ButtonRounded>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header