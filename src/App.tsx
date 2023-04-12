import './App.css'
import Nav from './components/nav'
import Home from './components/HomePage/home'
import Gestion from './components/Gestion/gestion'

import Chart from 'chart.js/auto';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <div>
      <div className='absolute w-full background-complete overflow-hidden'>
        <div className="bg-white min-h-screen z-10 relative max-w-[900px] m-auto shadow-xl pb-5 overflow-hidden backGroundImage">
          <Router>
              <Nav/>
            <Routes>
              <Route path="/" Component={Home}/> 
              <Route path="gestion" Component={Gestion}/>
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  )
}

export default App
