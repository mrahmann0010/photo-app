import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
// import About from "./Pages/About";
import CurvedGallery from "./pages/About2";
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
        <Route path="/about" element={<CurvedGallery />}></Route>

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

const photos = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
];
