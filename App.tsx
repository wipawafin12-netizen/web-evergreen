import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';

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
const News = lazy(() => import('./pages/News').then(m => ({ default: m.News })));
const Catalog = lazy(() => import('./pages/Catalog').then(m => ({ default: m.Catalog })));

const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminNews = lazy(() => import('./pages/admin/AdminNews').then(m => ({ default: m.AdminNews })));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts').then(m => ({ default: m.AdminProducts })));
const AdminBanners = lazy(() => import('./pages/admin/AdminBanners').then(m => ({ default: m.AdminBanners })));
const AdminCards = lazy(() => import('./pages/admin/AdminCards').then(m => ({ default: m.AdminCards })));
const AdminLogos = lazy(() => import('./pages/admin/AdminLogos').then(m => ({ default: m.AdminLogos })));
const AdminLeads = lazy(() => import('./pages/admin/AdminLeads').then(m => ({ default: m.AdminLeads })));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings').then(m => ({ default: m.AdminSettings })));
const AdminAccounts = lazy(() => import('./pages/admin/AdminAccounts').then(m => ({ default: m.AdminAccounts })));

const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// The back-office uses its own full-screen chrome, so hide the public
// Navbar/Footer on /admin and /login.
function Shell() {
  const { pathname } = useLocation();
  const isStandalone = pathname.startsWith('/admin') || pathname === '/login';

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 text-brand-900 dark:text-stone-100 selection:bg-brand-100 selection:text-brand-900 dark:selection:bg-brand-900 dark:selection:text-brand-100">
      {!isStandalone && <Navbar />}

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
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<News />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="banners" element={<AdminBanners />} />
              <Route path="cards" element={<AdminCards />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="logos" element={<AdminLogos />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="accounts" element={<AdminAccounts />} />
            </Route>
          </Routes>
        </Suspense>
      </main>

      {!isStandalone && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <SettingsProvider>
          <AuthProvider>
            <Shell />
          </AuthProvider>
        </SettingsProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
