import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import './index.css'
import Root from './routes'
import TextToSpeech from "./routes/TextToSpeech.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/text-to-speech',
    element: <TextToSpeech />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
