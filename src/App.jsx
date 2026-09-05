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

export default function App() {
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
