import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import GalleryPage from "./pages/GalleryPage";

// External Lib
import SwiperMain from "./Components/SwiperMain";
import { AnimatePresence } from "motion/react";
import Footer from "./Components/Footer";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <Routes location={location}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>

        {/* For Framer Motion, Wrapper */}

        <Route
          path="/photos/*"
          element={
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route index element={<GalleryPage />}></Route>
                <Route path=":slug" element={<SwiperMain />}></Route>
              </Routes>
            </AnimatePresence>
          }
        ></Route>

        <Route path="/photos" element={<GalleryPage />}></Route>
        <Route path="/photos/:slug" element={<SwiperMain />}></Route>

        {/* Catch-all 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

// Simple 404 Not Found component
function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default App;

// Prev Routes
{
  /* <Route path="/photos" element={<Photos />}></Route>
    <Route path="/photos/:slug" element={<SwiperMain />}></Route> */
}
