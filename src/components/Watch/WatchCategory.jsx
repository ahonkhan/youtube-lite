import React, { useContext } from 'react'
import { GetUIContext } from '../../context/UI/Uicontext';

const WatchCategory = ({ categoryData, activeWatchCategory, setWatchActiveCategory }) => {
    const context = useContext(GetUIContext)
    return (
        <section className='flex items-center gap-2 pt-2 overflow-x-scroll pb-2 scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-900'>
            {
                categoryData?.map(category =>
                    <button onClick={() => { context.setLoadingRelatedContent(true); setWatchActiveCategory(category.toLowerCase()) }} className={`item min-w-max active:bg-neutral-700 duration-500 px-3 py-1 rounded-2xl text-neutral-300 font-Montserrat font-medium
                text-sm ${category.toLowerCase() === activeWatchCategory ? 'bg-neutral-600' : 'bg-neutral-800'}`}>{category}</button>
                )
            }
        </section>
    )
}

export default WatchCategory