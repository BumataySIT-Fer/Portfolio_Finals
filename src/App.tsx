import { BrowserRouter,Routes,Route } from 'react-router-dom';
import About from './Links/About';
import Contact from './Links/Contact';
import Home from './Links/Home';
import Project from './Links/Project';
import NavBar from './Links/Navbar';
import Secret from './Links/Secret';
import './App.css';

function App() {


  return (
    <>

    <BrowserRouter>
  <NavBar/>
  <Routes>

  <Route path="/" element={<Home/>}/>
  <Route path="/about"element={<About/>}/>
  <Route path="/project"element={<Project/>}/>
  <Route path="/contact"element={<Contact/>}/>
  <Route path="/secret"element={<Secret/>}/>



  </Routes>
  </BrowserRouter>  
    
    </>
  )
}

export default App
