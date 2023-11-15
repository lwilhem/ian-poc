import React from 'react'
import { HiMicrophone, HiSpeakerWave } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const TextToSpeech: React.FC = () => {
  const [text, setText] = React.useState('')

  return (
    <>
      <main
        className="h-screen grid grid-cols-1 justify-items-center bg-neutral-800"
        style={{ gridTemplateRows: '1fr auto' }}
      >
        <div className="w-full overflow-y-scroll">
          <textarea
            className="p-12 w-full text-white bg-transparent border-0 outline-none resize-none h-full"
            placeholder="Ecrivez ce que vous voulez dire..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <div
          className="py-12 w-full grid grid-cols-3 justify-items-center"
          style={{ gridTemplateColumns: '1fr 1f 1fr' }}
        >
          <div></div>
          <button
            // @ts-expect-error responsive
            onClick={() => responsiveVoice.speak(text, 'French Male')}
            className="p-3 aspect-square flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white transition"
          >
            <HiSpeakerWave className="w-6 h-6" />
          </button>
          <Link
            to="/"
            className="p-3 aspect-square flex items-center justify-center rounded-full hover:bg-neutral-700 text-white transition border-2 border-white"
          >
            <HiMicrophone className="w-6 h-6" />
          </Link>
        </div>
      </main>
    </>
  )
}

export default TextToSpeech
