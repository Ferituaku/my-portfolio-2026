import { projectsData } from "@/lib/projects"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Footer } from "@/components/sections/Footer"

// Helper to chunk array into groups of a specific size
const chunkArray = (arr: any[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export default function WorkPage() {
  const projectChunks = chunkArray(projectsData, 2);

  return (
    <>
      <main className="relative z-10 bg-background selection:bg-foreground selection:text-background mb-[50vh] shadow-2xl shadow-black">
        
        {/* Intro / Header Section */}
      <section className="h-[50vh] min-h-[400px] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto relative z-0">
        <Link 
          href="/#projects" 
          className="inline-flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight mb-6 text-foreground">
          All Projects
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-2xl">
          A comprehensive archive of my selected works, side projects, and experiments. 
          Blending design, engineering, and artificial intelligence into cohesive digital experiences.
        </p>
      </section>
      
      {/* Stacking Grid Sections */}
      <div className="relative">
        {projectChunks.map((chunk, chunkIndex) => (
          <section 
            key={chunkIndex} 
            className="sticky top-0 h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-background overflow-hidden"
            style={{ zIndex: chunkIndex + 1 }}
          >
            {chunk.map((project: any, i: number) => (
              <div 
                key={i} 
                className="group relative h-full w-full overflow-hidden border-r last:border-r-0 border-t border-border/20"
              >
                {/* Background Image Container */}
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  style={{ 
                    backgroundImage: `url("${project.image}")`, 
                    backgroundColor: '#1a1a1a' 
                  }}
                />
                
                {/* Overlay that darkens slightly on hover to make text readable */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-4 mb-4">
                       <span className="text-xs font-sans text-white/80 uppercase px-3 py-1 rounded-full border border-white/30 whitespace-nowrap tracking-widest flex-shrink-0 backdrop-blur-md">
                         {project.year}
                       </span>
                       {project.company && (
                         <span className="text-xs font-sans uppercase tracking-wider text-white/80">
                           {project.company}
                         </span>
                       )}
                    </div>
                    
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-white mb-4">
                      {project.title}
                    </h3>

                    <p className="text-white/80 font-light text-base md:text-lg mb-8 line-clamp-3 leading-relaxed">
                      {project.desc}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-end">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t: string, index: number) => (
                          <span key={index} className="text-[10px] font-sans uppercase tracking-widest text-black bg-white/90 px-3 py-1.5 rounded-sm backdrop-blur-md">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        <Link 
                          href={`/projects/${project.slug}`} 
                          className="h-12 px-6 rounded-full bg-white text-black flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-medium hover:bg-white/80 transition-colors"
                        >
                          Details
                        </Link>
                        {project.repo && project.repo !== '/under-construction' && (
                          <a 
                            href={project.repo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                          >
                            <ArrowUpRight size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </section>
        ))}
      </div>
      
      </main>
      <Footer />
    </>
  )
}
