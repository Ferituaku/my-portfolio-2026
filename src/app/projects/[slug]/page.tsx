import { notFound } from 'next/navigation';
import { projectsData } from '@/lib/projects';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const projectIndex = projectsData.findIndex(p => p.slug === resolvedParams.slug);
  
  if (projectIndex === -1) {
    notFound();
  }
  
  const project = projectsData[projectIndex];
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      
      {/* Left Side (Fixed on Desktop) */}
      <div className="lg:w-1/2 lg:fixed lg:h-screen p-8 md:p-12 lg:p-16 flex flex-col justify-between z-10">
         <div>
           {/* Navigation Meta */}
           <div className="flex items-center gap-4 mb-24 md:mb-32">
              <Link href="/#projects" className="text-xs uppercase tracking-widest font-sans hover:opacity-60 transition-opacity flex items-center gap-2">
                <ArrowLeft size={16} /> [ Back to Portfolio ]
              </Link>
           </div>

           {/* Title */}
           <h1 className="text-5xl md:text-7xl lg:text-[5vw] leading-[0.9] font-serif tracking-tighter mb-12 uppercase">
              {project.title} <span className="text-muted-foreground inline-block mt-2">{project.year}</span>
           </h1>

           {/* Description Row */}
           <div className="flex justify-between items-start gap-8 font-sans border-t border-border pt-8">
              <p className="leading-relaxed max-w-[400px] text-base md:text-lg font-light text-muted-foreground">
                {project.desc}
              </p>
              <div className="text-right flex-shrink-0 text-xs font-semibold tracking-widest uppercase">
                 Released <br/> 
                 <span className="text-muted-foreground font-normal">{project.year}</span>
              </div>
           </div>
         </div>

         {/* Next Project Nav items */}
         <div className="mt-24 lg:mt-0 flex gap-4 items-center">
           <Link href={`/projects/${nextProject.slug}`} className="text-sm uppercase tracking-widest font-sans font-semibold hover:opacity-60 transition-opacity flex items-center gap-3">
              [ Next Project: <span className="font-light">{nextProject.title}</span> <ArrowRight size={16} /> ]
           </Link>
         </div>
      </div>

      {/* Right Side (Scrollable) */}
      <div className="lg:w-1/2 lg:ml-[50%] p-8 md:p-12 lg:p-16 lg:border-l border-border bg-muted/5 min-h-screen lg:min-h-[200vh]">
         
         <div className="lg:mt-32">
             {/* Grid Details matching reference */}
             <div className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-y-4 text-xs md:text-sm font-sans uppercase tracking-[0.2em] font-semibold mb-24 lg:mb-32 max-w-xl">
                <span className="text-muted-foreground">Agency :</span>
                <span>{project.agency}</span>
                
                <span className="text-muted-foreground">Position :</span>
                <span>{project.role}</span>
                
                <span className="text-muted-foreground">Stack :</span>
                <span className="leading-relaxed">{project.tech.join(" ; ")}</span>
                
                <span className="text-muted-foreground">Status :</span>
                <span>{project.status} ;</span>
             </div>

             <div className="mb-16">
                <Link 
                   href={project.repo} 
                   target={project.repo.startsWith('http') ? "_blank" : "_self"} 
                   className="text-sm uppercase tracking-widest font-sans font-semibold hover:opacity-60 transition-opacity flex w-fit gap-2 border-b-2 border-foreground pb-1"
                >
                   [ See live ]
                </Link>
             </div>

             {/* Showcases / Image Details */}
             <div className="flex flex-col gap-16 md:gap-24 pb-32">
                {project.showcases.map((img, i) => (
                  <div key={i} className="w-full relative overflow-hidden bg-background">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img 
                        src={img} 
                        alt={`${project.title} showcase ${i + 1}`} 
                        className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-700 ease-out" 
                     />
                  </div>
                ))}
             </div>
         </div>
         
      </div>

    </div>
  );
}
