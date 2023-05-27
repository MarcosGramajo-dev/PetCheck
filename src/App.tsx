import './App.css'
import Nav from './components/nav'
import Home from './components/HomePage/home'
import Gestion from './components/Gestion/gestion'
import Register from './components/Register/register'
import Perfil from './components/Profile/perfil'
import NuevaHistoria from './components/HisotriaClinica/newHistory'
import HistoriaClinica from './components/HisotriaClinica/HistoriaClinica'
import NewPass from './components/Register/newPass'
import Error404 from './components/Error/Error404'

import Chart from 'chart.js/auto';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginContextProvider from './components/Context/Context'

function App() {


  return (
    <LoginContextProvider>
      <div className='absolute w-full background-complete overflow-hidden'>
        <div className="bg-white min-h-screen z-10 relative max-w-[900px] m-auto shadow-xl pb-5 overflow-hidden backGroundImage">
          <Router>
              <Nav/>
            <Routes>
              <Route path="/" Component={Home}/> 
              <Route path="gestion" Component={Gestion}/>
              <Route path="register" Component={Register}/>
              <Route path="perfil" Component={Perfil}/>
              <Route path="nuevaHistoria" Component={NuevaHistoria}/>
              <Route path='historiaClinica' Component={HistoriaClinica}/>
              <Route path='newPass' Component={NewPass}/>
              <Route path='*' Component={Error404} />
            </Routes>
          </Router>
        </div>
      </div>
    </LoginContextProvider>
  )
}

export default App
