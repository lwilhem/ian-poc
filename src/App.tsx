import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className="bg-red-500">
        <div>{count}</div>
      </section>

      <button onClick={() => setCount(count + 1)}>click to add</button>
    </>
  )
}

export default App
