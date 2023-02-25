
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Mapp from './components/Mapp';
import SoilAnalysis from './components/SoilAnalysis';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>

      <Route path="/" element={<Login />}></Route>
     
      <Route path="/register" element={<Register />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/maps" element={<Mapp />}></Route>
      <Route path='/soil-analysis' element={<SoilAnalysis />}></Route>
     
      </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
