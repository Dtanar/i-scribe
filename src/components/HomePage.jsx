import React, { useState, useEffect, useRef } from 'react'

export default function HomePage({ setFile, setAudioStream }) {

    const [recordingStatus, setRecordingStatus] = useState('inactive')
    const [audioChunks, setAudioChunks] = useState([])
    const [duration, setDuration] = useState(0)

    const mediaRecorder = useRef(null)

    const mimeType = 'audioo/webm'

    // function to start recording
    async function startRecording() {
        let tempStream

        console.log('Start Recording')

        // trying to get the user audio device
        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })
            tempStream = streamData
        } catch (err) {
            console.log(err.message)
            return
        }


        setRecordingStatus('recording')

        // create new Media recorder instance using the stream
        const media = new MediaRecorder(tempStream, { type: mimeType })
        mediaRecorder.current = media

        // start recording the media
        mediaRecorder.current.start()
        let localAudioChunks = []

        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') { return }

            if (event.data.size === 0) { return }
            localAudioChunks.push(event.data)
        }

        // when audio is available, we set the audio chunks
        setAudioChunks(localAudioChunks)
    }

    // function to stop recording
    async function stopRecording() {
        setRecordingStatus('inactive')
        console.log('Stop recording')

        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {

            // creating a blob when stoping the audio
            const audioBlob = new Blob(audioChunks, {type: mimeType})
            setAudioStream(audioBlob)
            setAudioChunks([])
            setDuration(0)
        }
    }

    // useEffect to show the amount of time recorded
    useEffect(() => {
        if(recordingStatus === 'inactive'){return}

        const interval = setInterval(() => {
            setDuration(curr => curr + 1)
        },1000)

        return () =>  clearInterval(interval)
    })


    return (
        // base ui for the home page
        <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20 '>
            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>I-<span className='text-green-400 bold'>Scribe</span></h1>

            <h3 className="font-medium md:text-lg">Record <span className='text-green-400'>&rarr;</span>Transcribe <span className='text-green-400'>&rarr;</span>Translate</h3>

            <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className='flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn py-2 rounded-xl px-4 '>

                <p>{recordingStatus === 'inactive' ? "Record": `Stop Recording`}</p>


                <div className="flex items-center gap2">
                    {duration !== 0 && (
                        <p className='text-sm'>{duration}s</p>
                    )}

                    <i className={"fa-solid fa-microphone duration-200 " + (recordingStatus==='recording' ? 'text-rose-400':'text-green-400')}></i>
                </div>
            </button>

            <p className='text-base'>Or
                <label htmlFor="upload" className='text-green-400 cursor-pointer hover:text-green-600 duration-200'> upload</label>

                <input type="file" className="hidden" onChange={(e) => {
                    const tempFile = e.target.files[0];
                    setFile(tempFile)
                }} id='upload' name='upload' accept='.mp3,.wave' /> a mp3 file
            </p>

            <p className='italic text-zinc-400'>Forever Freee</p>
        </main>
    )
}
