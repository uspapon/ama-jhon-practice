import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Shop from './components/Shop/Shop'
import Header from './Header/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header></Header>
      <Shop></Shop>
    </div>
  )
}

export default App
