import React from 'react'

export default function Transcribing({downloading}) {
    return (
        <div className='flex items-center flex-col justify-center text-center gap-10 md:gap-14 pb-24 p-4 flex-1'>
            <div className="flex flex-col gap-2 sm:gap-4">
                <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl sm:w-96 w-72'>...<span className='text-green-400 bold'> Transcribing</span></h1>

                <p>{!downloading ? 'warning up cylinders' : 'core cylinders engaged'}</p>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 max-w-[400px] mx-auto w-full">
                {
                    [0,1,2].map(val => {
                        return(
                            <div key={val} className={'rounded-full h-2 sm:h-3 bg-zinc-400 loading ' + `loading${val}`}></div>
                        )
                    })
                }
            </div>
        </div>
    )
}
