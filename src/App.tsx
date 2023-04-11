import './App.css'
import Nav from './components/nav'
import Info from './components/info'
import Search from './components/search'
import ConteinerCard  from './components/conteinerCard'

function App() {

  return (
    <div>
      <div className='absolute w-full h-full background-complete'>
      </div>
      <div className="bg-white z-10 relative max-w-[900px] m-auto shadow-xl min-h-full pb-5 overflow-hidden backGroundImage">
        <Nav/>
        <Info/>
        <Search/>
        <ConteinerCard/>
      </div>
    </div>
  )
}

export default App
