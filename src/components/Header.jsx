import React from 'react'

export default function Header() {
    return (
        <header className='flex items-center justify-between gap-4 p-4'>
            <h1 className='font-semibold'>I-<span className='text-green-400 bold font-semibold'>Scribe</span></h1>
            <button className='flex items-center gap-2 specialBtn py-2 rounded-lg px-3 text-green-400'>
                <p>New</p>
                <i className="fa-solid fa-plus"></i>
            </button>
        </header>
    )
}
