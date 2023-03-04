import './App.css';
import Home from './home'
import Navbar from './navbar'
import Donate from './donate'
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className='App'>
    {/* <Navbar /> */}
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/donate" element={<Donate />} />
    </Routes>
    </div>
  );
}

export default App;
