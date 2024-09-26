import React, { useState } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information() {

    const [tab, setTab] = useState('transcription')

  return (
    <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20  max-w-prose w-full mx-auto'>
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap'>Your<span className='text-green-400 bold'> Transcription</span></h1>

            <div className="grid grid-cols-2 items-center mx-auto bg-white border-1 border-solid border-green-00 shadow rounded-full overflow-hidden">
                <button onClick={() => setTab('transcription')} className={'px-4 py-1 font-medium duration-200 ' + (tab == 'transcription' ? 'bg-green-400 text-white' : 'text-green-400 hover:text-green-600')}>Transcription</button>
                <button onClick={() => setTab('translation')} className={'px-4 py-1 font-medium duration-200 ' + (tab == 'translation' ? 'bg-green-400 text-white' : 'text-green-400 hover:text-green-600')}>Translation</button>
            </div>

            {tab === 'transcription' ? (
                <Transcription />
            ): (
                <Translation />
            )}
    </main>
  )
}
