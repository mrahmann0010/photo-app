import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../pages/HomePage';
import GalleryPage from '../pages/GalleryPage';
import CollectionPage from '../pages/CollectionPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'gallery/:slug', element: <CollectionPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
]);

export default router;
