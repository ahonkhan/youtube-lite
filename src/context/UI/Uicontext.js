import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "./Api";
export const GetUIContext = createContext()
export const UiContext = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [fullyLoaided, setFullyLoaded] = useState(false)
    const [sidebarStatus, setSidebarStatus] = useState(true)
    const [activeCategory, setActiveCategory] = useState('jehda nasha song')
    const [topCategories, setTopCategories] = useState(['All', 'Jehda nasha song', 'Care', 'Programming', 'ReactJs', 'Angular', 'HindiSongs', 'NewNatok', 'Vulona amay song', 'Islamic Songs', 'Figmadesign', 'New Job', 'Movies', 'Funny', 'Science', 'Drama'])
    const [feedData, setFeedData] = useState([])
    const [loadingRelatedContent, setLoadingRelatedContent] = useState(true)
    const [inputBoxData, setInputBoxData] = useState('')
    const [videoItemLoading, setVideoItemLoading] = useState(true)

    const fetchedCategoryData = (query) => {
        setLoading(true);
        setFullyLoaded(false)
        fetchDataFromApi(`search/?q=${activeCategory}`).then((res) => {
            setFeedData(res.contents);
            setTimeout(() => {
                setLoading(false);
                setFullyLoaded(true)
            }, 750)
            // console.log(res);
        })
    }
    // console.log(feedData)
    useEffect(() => {
        fetchedCategoryData(activeCategory)

    }, [activeCategory])

    return (
        <GetUIContext.Provider value={{
            fullyLoaided, setLoadingRelatedContent, videoItemLoading, setVideoItemLoading, inputBoxData, setInputBoxData, loadingRelatedContent, feedData, setFullyLoaded, fetchedCategoryData, loading, setLoading, sidebarStatus, setSidebarStatus, topCategories, setTopCategories, activeCategory, setActiveCategory,
        }}>
            {children}
        </GetUIContext.Provider>
    )
}
