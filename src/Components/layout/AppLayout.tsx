import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from '../navigation/Navbar';
import SiteFooter from './SiteFooter';
import PageWrapper from './PageWrapper';

/**
 * Root layout: Navbar → animated page content → Footer.
 */
export default function AppLayout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <AnimatePresence mode="wait">
          <PageWrapper key={location.pathname}>
            <Outlet />
          </PageWrapper>
        </AnimatePresence>
      </main>
      <SiteFooter />
    </>
  );
}
