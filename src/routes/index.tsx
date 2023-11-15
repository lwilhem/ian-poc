import {useEffect, useState} from "react";
import {HiMicrophone} from "react-icons/hi2";

function Root() {
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = function (event) {
        console.log('Speech recognition result', event.results)
        const results = [];
        for (let i = 0; i < event.results.length; i++) {
          results.push(event.results[i][0].transcript);
        }
        setTranscripts(results);
      };

      recognition.onerror = function (event) {
        console.error('Speech recognition error', event);
      };

      recognition.onend = function () {
        if (isRecording) {
          recognition.start();
        }
      };

      setRecognition(recognition)
    } else {
      console.log('Your browser does not support the Web Speech API');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startTranscription = () => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);
    }
  };

  const stopTranscription = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const toggleTranscription = () => {
    if (isRecording) {
      stopTranscription();
    } else {
      startTranscription();
    }
  };

  return (
    <main
      className="h-screen grid grid-cols-1 justify-items-center bg-neutral-800"
      style={{gridTemplateRows: "1fr auto"}}
    >
      <div className="w-full p-12 overflow-y-scroll">
        <p className="text-lg text-white mb-4">Speaker 1</p>
        <p className="text-white text-xl">
          {transcripts.map((transcript) => (
            <span key={transcript}>
              {transcript}
            </span>
          ))}
        </p>
      </div>
      <div className="py-12">
        <button
          onClick={toggleTranscription}
          className={isRecording
            ? "p-3 rounded-full bg-white text-red-500 outline outline-red-500 transition"
            : "p-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition"
          }
        >
          <HiMicrophone className="w-6 h-6"/>
        </button>
      </div>
    </main>
  )
}

export default Root
