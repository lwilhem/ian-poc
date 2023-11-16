import { useEffect, useState } from 'react'

function useSpeechRecognition(): [string, () => void, () => void, boolean] {
  const [transcript, setTranscript] = useState<string>('')
  const [listening, setListening] = useState<boolean>(false)

  let recognition: SpeechRecognition

  const startListening = () => {
    if (recognition) {
      recognition.start()
      setListening(true)
    }
  }

  const stopListening = () => {
    if (recognition) {
      recognition.stop()
      setListening(false)
    }
  }

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition
        = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

      recognition = new SpeechRecognition()

      recognition.onstart = () => {
        setListening(true)
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const last = event.results.length - 1
        const newTranscript = event.results[last][0].transcript
        setTranscript(newTranscript)
      }

      recognition.onend = () => {
        setListening(false)
      }

      recognition.onerror = (event: Event) => {
        console.error('Speech recognition error:', event)
        setListening(false)
      }

      return () => {
        if (recognition)
          recognition.stop()
      }
    }
    else {
      console.error('Speech Recognition API not supported')
    }
  }, [])

  return [transcript, startListening, stopListening, listening]
}

export default useSpeechRecognition
