import React, {useState, useEffect, useRef} from 'react'

export default function HomePage({setFile, setAudioStream}) {

    const [recordingStatus, setRecordingState] = useState('inactive')
    const [audioChunks, setAudioChunks] = useState([])
    const [duration, setDuration] = useState(0)
    
    const mediaRecorder = useRef(null)

    const mimeType = 'audioo/webm'

    // function to start recording
    async function  startRecording(params) {
        let tempStream

        console.log('Start Recording')

        // trying to get the user audio device
        try {
            const streamData = navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })
            tempStream = streamData
        }catch (err){
            console.log(err.message)
            return
        }

        // create new Media recorder instance using the stream
        const media = new MediaRecorder(tempStream, {type: mimeType})
        mediaRecorder.current = media

        // start recording the media
        mediaRecorder.current.start()
        let localAudioChunks = []

        mediaRecorder.current.ondataavailable = (event) => {
            if(typeof event.data === 'undefined'){return}

            if(event.data.size === 0) {return}
            localAudioChunks.push(event.data)
        }
    }

  return (
    // base ui for the home page
    <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20 '>
        <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>I-<span className='text-green-400 bold'>Scribe</span></h1>

        <h3 className="font-medium md:text-lg">Record <span className='text-green-400'>&rarr;</span>Transcribe <span className='text-green-400'>&rarr;</span>Translate</h3>

        <button className='flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn py-2 rounded-xl px-4 '>
            <p>Record</p>
            <i className="fa-solid fa-microphone text-green-400"></i>
        </button>

        <p className='text-base'>Or 
            <label htmlFor="upload" className='text-green-400 cursor-pointer hover:text-green-600 duration-200'> upload</label>

            <input type="file" className="hidden" onChange={(e) => {
                const tempFile = e.target.files[0];
                setFile(tempFile)
            }} id='upload' name='upload' accept='.mp3,.wave'/> a mp3 file
        </p>

        <p className='italic text-zinc-400'>Forever Freee</p>
    </main>
  )
}
