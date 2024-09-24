import { useState } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'
import FileDisplay from './components/FileDisplay'




function App() {
  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)

  const isAudioAvailable = file || audioStream;

  // receting the audio
  function handleAudioReset(){

    setFile(null)
    setAudioStream(null)
  }


  return (
    <>
      <div className="flex flex-col ">
        <section className='min-h-screen flex flex-col max-w-[1000px] mx-auto w-full '>

          <Header />

          {/* setting the body of the app based on a condition. that is if there is an audio file available or not */}
          {isAudioAvailable ? (
            <FileDisplay handleAudioReset={handleAudioReset} file={file} audioStream={setAudioStream}/>
          ):  (
            <HomePage setFile={setFile} setAudioStream={setAudioStream}/>
          )}
        </section>
        <footer></footer>
      </div>
    </>
  )
}

export default App
