import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from './Pages/Home';
import About from './Pages/About';
import Photos from './Pages/Photos';

// External Lib
import SwiperMain from "./Components/SwiperMain";
import { AnimatePresence } from "motion/react";

function App() {

  const location = useLocation();

  return (
    <>
      <Navbar />

      
      <Routes location={location}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>

        {/* For Framer Motion, Wrapper */}

        <Route path="/photos/*" element={
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route index element={<Photos />}></Route>
              <Route path=":slug" element={<SwiperMain />}></Route>
            </Routes>
          </AnimatePresence>
        }>
        </Route>



        <Route path="/photos" element={<Photos />}></Route>
        <Route path="/photos/:slug" element={<SwiperMain />}>

        </Route>
      </Routes>


    </>
  );
}

export default App;

// Prev Routes
{/* <Route path="/photos" element={<Photos />}></Route>
    <Route path="/photos/:slug" element={<SwiperMain />}></Route> */}
