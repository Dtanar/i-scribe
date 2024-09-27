import React from 'react'
import { LANGUAGES } from '../utils/presets'

export default function Translation({ textElement, toLanguage, translating, setToLanguage, generateTranslation }) {


    return (
        <>

            {(textElement && !translating) && (
                <p>{textElement}</p>
            )}

            {!translating && (<div className="flex flex-col gap-1 mb-4">
                <p className='text-xs sm:text-sm font-medium'>To Language</p>
                
                <div className="flex items-stretch gap-2 text-zinc-500 mr-auto">

                    <select value={toLanguage} onChange={(e) => setToLanguage(e.target.value)} className='flex-1 outline-none bg-white focus:outline-none border border-solid border-transparent hover:border-green-300 duration-200 p-2 rounded '>

                        <option value={'Select Language'}>Select Language</option>
                        {Object.entries(LANGUAGES).map(([key, value]) => {

                            return (
                                <option key={key} value={value}>{key}</option>
                            )

                        })}
                    </select>

                    <button onClick={generateTranslation} className="specialBtn px-3 py-2 rounded-lg text-green-300 hover:text-green-600 duration-200">Translate</button>
                </div>
            </div>)}

            {
                translating && (
                    <div className='grid place-items-center'>
                        <i className="fa-solid fa-spinner animate-spin"></i>
                    </div>
                )
            }

        </>
    )
}
