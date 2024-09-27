import React from 'react'

export default function FileDisplay({ file, handleAudioReset, audioStream, handleFormSubmission }) {
    return (
        <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20  max-w-full mx-auto sm:w-96 w-72'>
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl '>Your<span className='text-green-400 bold'> File</span></h1>

            <div className="flex flex-col text-left mx-auto my-4">
                <h3 className="font-semibold">Name</h3>
                <p>{file ? file.name : "Your Newly Recorded Audio"}</p>
            </div>

            <div className="flex items-center justify-between gap-4">
                <button onClick={handleAudioReset} className='text-zinc-400 hover:text-green-600 duration-200'>Reset</button>

                <button onClick={handleFormSubmission} className="specialBtn px-3 py-2 rounded-lg text-green-400 flex items-center gap-2">
                    <p>Transcribe</p>
                    <i className="fa-solid fa-pen-nib"></i>
                </button>
            </div>
        </main>
    )
}
