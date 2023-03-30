import React, { useContext, useEffect } from 'react'
import { GetUIContext } from '../../context/UI/Uicontext'
const Categories = () => {
    const context = useContext(GetUIContext)
    return (
        <section className='flex items-center gap-2 pt-2 overflow-x-scroll pb-2 scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-900'>
            {
                context.topCategories.map(category =>
                    <button onClick={() => { context.setLoading(true); context.setActiveCategory(category.toLowerCase()) }} className={`item min-w-max active:bg-neutral-700 duration-500 px-3 py-1 rounded-2xl text-neutral-300 font-Montserrat font-medium
                    text-sm ${category.toLowerCase() === context.activeCategory ? 'bg-neutral-600' : 'bg-neutral-800'}`}>{category}</button>
                )
            }
        </section>
    )
}

export default Categories