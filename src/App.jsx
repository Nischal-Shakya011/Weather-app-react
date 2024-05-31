import { useState, Suspense, lazy } from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Loading from './components/Loading';
// import Weather from './pages/Weather'
const LazyWeather = lazy(() => import('./pages/Weather'));


function App() {

  return (
    <>
    <Routes>
     <Route path='/' element={<Home/>}/>

     <Route path='/weather' element={
     <Suspense fallback={<Loading />}>
     <LazyWeather/>
     </Suspense>
     }/>
     {/* <Route path='/weather' element={<Weather/>}></Route> */}
     </Routes>
    </>
  )
}


export default App
