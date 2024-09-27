import React, { useState, useEffect, useRef } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information(props) {

    const {output, finished} = props

    const [tab, setTab] = useState('transcription')
    const [translation, setTranslation] = useState(null)
    const [translating, setTranslating] = useState(null)
    const [toLanguage, setToLanguage] = useState('Select Language')

    const worker = useRef()

    const textElement = tab === 'transcription' ? output.map(val => val.text) : translation || 'No translation'

    useEffect(() => {
        if (!worker.current) {
            worker.current = new Worker(new Worker(new URL('../utils/translate.worker.js', import.meta.url), {
                type: 'module'
            }))
        }

        const onMessageReceived = async (e) => {
            // switch case that help communicate the status of the translation
            switch (e.data.status) {
                case 'initiate':
                    console.log('DOWNLOADING')
                    break;
                case 'progress':
                    console.log('LOADING')
                    break;
                case 'update':
                    setTranslation(e.data.output)
                    console.log(e.data.output)
                    break;
                case 'complete':
                    setTranslating(false)
                    console.log("DONE")
                    break;
            }
        }

        worker.current.addEventListener('message', onMessageReceived)

        // cleanup function
        return () => worker.current.removeEventListener('message', onMessageReceived)
    },[])



    // function to generate the translation
    function generateTranslation() {
        if (translating || toLanguage === 'Select Language') { return }

        setTranslating(true)

        worker.current.postMessage({
            text: output.map(val => val.text),
            src_lang: 'eng_Latn',
            tgt_lang: toLanguage
        })
    }

    // function to copy output
    function handleCopy() {
        navigator.clipboard.writeText(textElement)
    }

    // function to download ouput
    function handleDownload() {
        const element = document.createElement('a')
        const file = new Blob([], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download(`I-Scribe_${(new Date()).toDateString()}.txt`)
        document.body.appendChild(element)
        element.click()
    }

    


    return (
        <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20  max-w-prose w-full mx-auto'>
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap'>Your<span className='text-green-400 bold'> Transcription</span></h1>

            <div className="grid grid-cols-2 items-center mx-auto bg-white border-1 border-solid border-green-00 shadow rounded-full overflow-hidden">
                <button onClick={() => setTab('transcription')} className={'px-4 py-1 font-medium duration-200 ' + (tab == 'transcription' ? 'bg-green-400 text-white' : 'text-green-400 hover:text-green-600')}>Transcription</button>
                <button onClick={() => setTab('translation')} className={'px-4 py-1 font-medium duration-200 ' + (tab == 'translation' ? 'bg-green-400 text-white' : 'text-green-400 hover:text-green-600')}>Translation</button>
            </div>

            <div className="my-8 flex flex-col-reverse max-w-prose w-full mx-auto gap-4">

                {(!finished || translating) && (
                    <div className="grid place-items-center">
                        <i className="fa-solid fa-spinner animate-spin"></i>
                    </div>
                )}

                {tab === 'transcription' ? (
                    <Transcription {...props}  textElement={textElement} />
                ) : (
                    <Translation {...props}  toLanguage={toLanguage} translating={translating} 
                    textElement={textElement} setTranslating={setTranslating} setTranslation={setTranslation} setToLanguage={setToLanguage} generateTranslation={generateTranslation} />
                )}
            </div>

            <div className="flex items-center gap-4 mx-auto">
                <button onClick={handleCopy} className="bg-white text-green-300 px-2 rounded duration-200 hover:text-green-600">
                    Copy
                    <i className="fa-solid fa-copy p-2 text-zinc-600"></i>

                </button>

                <button  onClick={handleDownload} className="bg-white text-green-300 px-2 rounded duration-200 hover:text-green-600">
                    Download
                    <i className="fa-solid fa-download p-2 text-zinc-600"></i>
                </button>
            </div>

        </main>
    )
}
