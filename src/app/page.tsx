
import { GameContainer } from "@/components/game/game-container";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heartLeft = PlaceHolderImages.find(img => img.id === 'cute-heart-left');
  const heartRight = PlaceHolderImages.find(img => img.id === 'cute-heart-right');

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 py-2 px-2 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative blurred background elements */}
      <div className="fixed top-[-5%] left-[-5%] w-[30vw] h-[30vw] bg-accent/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="fixed bottom-[-5%] right-[-5%] w-[40vw] h-[40vw] bg-secondary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      
      {/* Floating cute icons */}
      <div className="fixed top-[10%] left-[5%] text-accent/20 animate-float-slow -z-10">
        <Heart className="w-12 h-12 fill-current" />
      </div>
      <div className="fixed top-[15%] right-[8%] text-primary/20 animate-float-fast -z-10">
        <Star className="w-10 h-10 fill-current" />
      </div>
      
      <div className="w-full max-w-[1200px] flex flex-row items-center justify-center gap-2 lg:gap-8 z-10">
        {/* Left Side Heart Image - visible on small screens and up */}
        <div className="hidden sm:block w-20 h-32 lg:w-32 lg:h-48 xl:w-40 xl:h-60 relative rounded-[1.5rem] overflow-hidden pookie-shadow border-4 border-white -rotate-[4deg] hover:rotate-0 transition-transform duration-500 shrink-0">
          {heartLeft && (
            <Image 
              src={heartLeft.imageUrl} 
              alt={heartLeft.description} 
              fill 
              className="object-cover"
              data-ai-hint={heartLeft.imageHint}
            />
          )}
        </div>

        {/* Game Container */}
        <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md shrink-0">
          <GameContainer />
        </div>

        {/* Right Side Heart Image - visible on small screens and up */}
        <div className="hidden sm:block w-20 h-32 lg:w-32 lg:h-48 xl:w-40 xl:h-60 relative rounded-[1.5rem] overflow-hidden pookie-shadow border-4 border-white rotate-[4deg] hover:rotate-0 transition-transform duration-500 shrink-0">
          {heartRight && (
            <Image 
              src={heartRight.imageUrl} 
              alt={heartRight.description} 
              fill 
              className="object-cover"
              data-ai-hint={heartRight.imageHint}
            />
          )}
        </div>
      </div>
      
      <footer className="mt-1 text-muted-foreground text-[9px] font-medium flex items-center gap-1 opacity-60">
        <span>Made with</span>
        <Heart className="w-2 h-2 text-accent fill-accent animate-bounce" />
        <span>for Pookie</span>
      </footer>
    </main>
  );
}
