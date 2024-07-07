import './App.css'
import { TopBar } from './components/TopBar'



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    {/* test  */}
    <div className='main'>
      <div className='chats-section'>
      <TopBar/>
      </div>
      <div className='chats-window'></div>
    </div>
   </>
  )
}

export default App
