import { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'
import FileDisplay from './components/FileDisplay'
import Information from './components/Information'
import Transcribing from './components/Transcribing'




function App() {
  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)
  // final output
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)

  const isAudioAvailable = file || audioStream;


  // receting the audio
  function handleAudioReset() {

    setFile(null)
    setAudioStream(null)
  }


  return (
    <>
      <div className="flex flex-col ">
        <section className='min-h-screen flex flex-col max-w-[1000px] mx-auto w-full '>

          <Header />

          {/* conditional statements to display different part of the app based on outpu, loading state and availability of the audio */}
          {output ? (
            <Information />
          ) : loading ? (<Transcribing />) : isAudioAvailable ? (
            <FileDisplay handleAudioReset={handleAudioReset} file={file} audioStream={setAudioStream} />
          ): (
            <HomePage setFile={setFile} setAudioStream={setAudioStream} />
          )}

        
        </section>
        <footer></footer>
      </div>
    </>
  )
}

export default App
