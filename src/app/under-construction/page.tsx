import Link from "next/link";
import { ArrowLeft, HardHat } from "lucide-react";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center z-50 relative">
      <div className="mb-8 p-6 rounded-full bg-muted/10 border border-border">
        <HardHat size={48} className="text-muted-foreground" />
      </div>
      <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">Under Construction</h1>
      <p className="text-muted-foreground font-light text-lg md:text-xl max-w-[600px] mb-12 leading-relaxed">
        This project showcase is currently being built in the background. Check back soon for the full experience.
      </p>
      
      <Link href="/" className="group flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:bg-foreground hover:text-background transition-colors duration-300 pointer-events-auto">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm tracking-widest uppercase font-sans font-medium text-inherit">Return Home</span>
      </Link>
    </div>
  );
}
