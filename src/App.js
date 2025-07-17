import { Link, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import Photos from './Pages/Photos';

function App() {
  return (
    <>
      <nav className="py-2 bg-green-400">
        <ul className="list-none flex gap-4 justify-center">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>Home</Link></li>
          <li><Link to='/photos'>Photos</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/photos" element={<Photos />}></Route>
      </Routes>


    </>
  );
}

export default App;
