import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from './Pages/Home';
import About from './Pages/About';
import Photos from './Pages/Photos';
import SwiperMain from "./Components/SwiperMain";

function App() {
  return (
    <>
      <Navbar />

      
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/photos" element={<Photos />}></Route>

        {/* Dynamic Routes for Photos */}
        <Route path="/photos/:slug" element={<SwiperMain />}></Route>
      </Routes>


    </>
  );
}

export default App;
