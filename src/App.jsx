import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Shop from './components/Shop/Shop'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Shop></Shop>
    </div>
  )
}

export default App
