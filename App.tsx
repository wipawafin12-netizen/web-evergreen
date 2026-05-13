import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const OurCompany = lazy(() => import('./pages/OurCompany').then(m => ({ default: m.OurCompany })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const Door = lazy(() => import('./pages/Door').then(m => ({ default: m.Door })));
const Doorframe = lazy(() => import('./pages/Doorframe').then(m => ({ default: m.Doorframe })));
const ServiceShaft = lazy(() => import('./pages/ServiceShaft').then(m => ({ default: m.ServiceShaft })));
const Flooring = lazy(() => import('./pages/Flooring').then(m => ({ default: m.Flooring })));
const Staircase = lazy(() => import('./pages/Staircase').then(m => ({ default: m.Staircase })));
const WallPanel = lazy(() => import('./pages/WallPanel').then(m => ({ default: m.WallPanel })));
const Quote = lazy(() => import('./pages/Quote').then(m => ({ default: m.Quote })));
const B2B = lazy(() => import('./pages/B2B').then(m => ({ default: m.B2B })));
const Affiliate = lazy(() => import('./pages/Affiliate').then(m => ({ default: m.Affiliate })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));

const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-stone-950 text-brand-900 dark:text-stone-100 selection:bg-brand-100 selection:text-brand-900 dark:selection:bg-brand-900 dark:selection:text-brand-100">

          <Navbar />

          <main>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/our-company" element={<OurCompany />} />
                <Route path="/door" element={<Door />} />
                <Route path="/doorframe" element={<Doorframe />} />
                <Route path="/service-shaft" element={<ServiceShaft />} />
                <Route path="/flooring" element={<Flooring />} />
                <Route path="/staircase" element={<Staircase />} />
                <Route path="/wall-panel" element={<WallPanel />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/b2b" element={<B2B />} />
                <Route path="/affiliate" element={<Affiliate />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
