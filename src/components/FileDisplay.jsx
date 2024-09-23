import React from 'react'

export default function FileDisplay({file, handleAudioReset, audioStream}) {
  return (
    <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20 w-fit max-w-full mx-auto'>
        <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>Your<span className='text-green-400 bold'> File</span></h1>

        <div className="flex flex-col text-left mx-auto my-4">
            <h3 className="font-semibold">Name</h3>
            <p>{file.name}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
            <button onClick={handleAudioReset} className='text-zinc-400 hover:text-green-600 duration-200'>Reset</button>

            <button className="specialBtn px-3 py-2 rounded-lg text-green-400 flex items-center gap-2">
                <p>Transcribe</p>
                <i className="fa-solid fa-pen-nib"></i>
            </button>
        </div>
    </main>
  )
}
