import './App.css'
import Nav from './components/nav'
import Chart from 'chart.js/auto';
import Info from './components/HomePage/info'
import Search from './components/HomePage/search'
import ConteinerCard  from './components/HomePage/conteinerCard'
import Modal from './components/Modal/modal'

function App() {

  return (
    <div>
      <div className='absolute w-full background-complete overflow-hidden'>
        <div className="bg-white min-h-screen z-10 relative max-w-[900px] m-auto shadow-xl pb-5 overflow-hidden backGroundImage">
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
