import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { Home } from './pages/Home';
import { OurCompany } from './pages/OurCompany';
import { ServicesPage } from './pages/ServicesPage';
import { Door } from './pages/Door';
import { Doorframe } from './pages/Doorframe';
import { ServiceShaft } from './pages/ServiceShaft';
import { Flooring } from './pages/Flooring';
import { Staircase } from './pages/Staircase';
import { WallPanel } from './pages/WallPanel';
import { Login } from './pages/Login';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-stone-950 text-brand-900 dark:text-stone-100 selection:bg-brand-100 selection:text-brand-900 dark:selection:bg-brand-900 dark:selection:text-brand-100">

          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Our Company */}
              <Route path="/our-company" element={<OurCompany />} />

              {/* Product Pages - Individual Files */}
              <Route path="/door" element={<Door />} />
              <Route path="/doorframe" element={<Doorframe />} />
              <Route path="/service-shaft" element={<ServiceShaft />} />
              <Route path="/flooring" element={<Flooring />} />
              <Route path="/staircase" element={<Staircase />} />
              <Route path="/wall-panel" element={<WallPanel />} />

              {/* Services */}
              <Route path="/services" element={<ServicesPage />} />

              {/* Account */}
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;