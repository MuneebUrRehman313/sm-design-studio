import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandStatement from './components/BrandStatement'
import Projects from './components/Projects'
import OnSiteProjects from './components/OnSiteProjects'
import Services from './components/Services'
import About from './components/About'
import Process from './components/Process'
import WhyChooseUs from './components/WhyChooseUs'
import VisualShowcase from './components/VisualShowcase'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProjectEditor from './pages/admin/ProjectEditor'

function PublicSite() {
  return (
    <div className="min-h-dvh bg-ink text-cream">
      <Navbar />
      <main id="main">
        <Hero />
        <BrandStatement />
        <Projects />
        <OnSiteProjects />
        <Services />
        <About />
        <Process />
        <WhyChooseUs />
        <VisualShowcase />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard/new"
        element={
          <ProtectedRoute>
            <ProjectEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard/:projectId/edit"
        element={
          <ProtectedRoute>
            <ProjectEditor />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
