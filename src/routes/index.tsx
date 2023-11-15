import {useEffect, useState} from "react";
import {CheetahWorker, type CheetahTranscript} from "@picovoice/cheetah-web";
import {WebVoiceProcessor} from "@picovoice/web-voice-processor";
import cheetahParams from "./model";
import {HiMicrophone} from "react-icons/hi2";

function Root() {
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [cheetah, setCheetah] = useState<CheetahWorker | null>(null);

  useEffect(() => {
    async function setupCheetah() {
      const createdCheetah = await CheetahWorker.create(
        import.meta.env.VITE_ACCESS_KEY,
        transcriptCallback,
        {
          base64: cheetahParams,
        },
        {
          enableAutomaticPunctuation: true,
        }
      );
      setCheetah(createdCheetah);
    }

    setupCheetah();

    return () => {
      if (cheetah) {
        cheetah.release();
      }
    };
  }, [import.meta.env.VITE_ACCESS_KEY, cheetahParams]);

  function transcriptCallback(cheetahTranscript: CheetahTranscript) {
    if (cheetahTranscript.transcript === "") return
    setTranscripts((prevTranscripts) => [...prevTranscripts, cheetahTranscript.transcript]);
  }

  const startTranscription = async () => {
    if (cheetah) {
      await WebVoiceProcessor.subscribe(cheetah);
      setIsRecording(true);
    }
  };

  const stopTranscription = async () => {
    if (cheetah) {
      await WebVoiceProcessor.unsubscribe(cheetah);
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
          {transcripts.map((transcript, index) => (
            <span key={index}>{transcript}</span>
          ))}
        </p>
      </div>
      <div className="py-12">
        {cheetah
          ? (
            <button
              onClick={toggleTranscription}
              className={isRecording
                ? "p-3 rounded-full bg-white text-red-500 outline outline-red-500 transition"
                : "p-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition"
              }
            >
              <HiMicrophone className="w-6 h-6"/>
            </button>
          )
          : (
            <button
              disabled
              className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition opacity-60"
            >
              <HiMicrophone className="w-6 h-6"/>
            </button>
          )
        }
      </div>
    </main>
  )
}

export default Root
