import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { Github } from "@/components/sections/Github";
import { Footer } from "@/components/sections/Footer";
import { ParticleScroll } from "@/components/canvasui/ParticleScroll";

export default function Home() {
  return (
    <>
      {/* Particle Scroll effect active from Hero section through Work Experience */}
      <ParticleScroll
        point={0.68}
        band={420}
        density={2}
        size={1.25}
        spread={220}
        gravity={0.35}
        drift={0.7}
        swirl={60}
        stagger={0.7}
        fade={0.85}
        settle={1.2}
        smoothing={0.6}
        windowScroll={true}
      >
        <Hero />
        {/* Upper content with shadow sliding over fixed Hero */}
        <div className="relative z-10 bg-background mt-[100dvh] shadow-2xl shadow-black">
          <About />
          <Work />
        </div>
      </ParticleScroll>

      {/* Main content from Projects Showcase onwards — strictly outside the particle scroll effect */}
      <main className="relative z-10 bg-background shadow-2xl shadow-black">
        <Projects />
        <TechStack />
        <Github />
      </main>
      <Footer />
    </>
  );
}
