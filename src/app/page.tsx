import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Main content with mb-[50vh] to reveal fixed footer */}
      <main className="relative z-10 bg-background mt-[100vh] shadow-2xl shadow-black mb-[50vh]">
        <About />
        <Work />
        <Projects />
        <TechStack />
      </main>
      <Footer />
    </>
  );
}
