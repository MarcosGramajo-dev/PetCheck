import './App.css'
import Nav from './components/nav'
import Info from './components/info'
import Search from './components/search'
import ConteinerCard  from './components/conteinerCard'

function App() {

  return (
    <div>
      <div className='absolute w-full background-complete overflow-hidden'>
        <div className="bg-white z-10 relative max-w-[900px] m-auto shadow-xl pb-5 overflow-hidden backGroundImage">
          <Nav/>
          <Info/>
          <Search/>
          <ConteinerCard/>
        </div>
      </div>
    </div>
  )
}

export default App
