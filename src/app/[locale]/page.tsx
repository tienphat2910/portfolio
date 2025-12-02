import Hero from "../../components/Hero";
import About from "../../components/About";
import Services from "../../components/Services";
import Projects from "../../components/Projects";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import AuroraGradientBackground from "../../components/AuroraGradientBackground";

export default function Home() {
  return (
    <>
      <main className="pt-16 relative">
        <AuroraGradientBackground />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
