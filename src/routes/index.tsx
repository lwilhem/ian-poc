/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react'
import { HiMicrophone, HiSpeakerWave } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

function Root() {
  const [prevResults, setPrevResults] = useState<string[][][]>([])
  const [results, setResults] = useState<string[][]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.lang = 'fr-FR'
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onresult = function (event) {
        console.log('Speech recognition result', event.results)
        const results: string[] = []
        for (let i = 0; i < event.results.length; i++)
          results.push(event.results[i][0].transcript)

        setResults((prev) => {
          const newResults = [...prev]
          newResults[currentIndex] = results
          return newResults
        })
      }

      recognition.onerror = function (event) {
        console.error('Speech recognition error', event)
      }

      recognition.onend = function () {
        if (isRecording) {
          setCurrentIndex(prev => prev + 1)
          recognition.start()
        }
      }

      recognitionRef.current = recognition
    }
    else {
      console.log('Your browser does not support the Web Speech API')
    }

    return () => {
      if (recognitionRef.current)
        recognitionRef.current.stop()
    }
  }, [])

  const startTranscription = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
      setResults([])
      setIsRecording(true)
    }
  }

  const stopTranscription = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setCurrentIndex(prev => prev + 1)
      setPrevResults(prev => [...prev, results])
      setIsRecording(false)
    }
  }

  const toggleTranscription = () => {
    if (isRecording)
      stopTranscription()

    else
      startTranscription()
  }

  return (
    <>
      <main
        className="h-screen grid grid-cols-1 justify-items-center bg-neutral-800"
        style={{ gridTemplateRows: '1fr auto' }}
      >
        <div className="w-full p-12 overflow-y-scroll">
          <>
            {prevResults.map(results => (
              <div>
                <p className="text-lg text-white mb-2 text-blue-600 font-semibold">Gilles</p>
                <p className="text-white text-xl mb-12">
                  {results?.map(result => (
                    result?.map(transcript => (
                      <span key={transcript}>
                        {transcript}
                      </span>
                    ))
                  ))}
                </p>
              </div>
            ))}
          </>
          {isRecording && (
            <div>
              <p className="text-lg text-white mb-2 text-blue-600 font-semibold">Gilles</p>
              <p className="text-white text-xl mb-12">
                <>
                  {results.map(result => (
                    result?.map(transcript => (
                      <span key={transcript}>
                        {transcript}
                      </span>
                    ))
                  ))}
                </>
              </p>
            </div>
          )}
        </div>
        <div
          className="py-12 w-full grid grid-cols-3 justify-items-center"
          style={{ gridTemplateColumns: '1fr 1f 1fr' }}
        >
          <div></div>
          <button
            onClick={toggleTranscription}
            className={isRecording
              ? 'p-3 aspect-square flex items-center justify-center rounded-full bg-white text-red-500 outline outline-red-500 transition'
              : 'p-3 aspect-square flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white transition'}
          >
            <HiMicrophone className="w-6 h-6" />
          </button>
          <Link
            to="/text-to-speech"
            className="p-3 aspect-square flex items-center justify-center rounded-full hover:bg-neutral-700 text-white transition border-2 border-white"
          >
            <HiSpeakerWave className="w-6 h-6" />
          </Link>
        </div>
      </main>
    </>
  )
}

export default Root
