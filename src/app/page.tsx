import { GameContainer } from "@/components/game/game-container";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const animalLeft = PlaceHolderImages.find(img => img.id === 'cute-animal-left');
  const animalRight = PlaceHolderImages.find(img => img.id === 'cute-animal-right');

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 py-2 px-4 flex flex-col items-center justify-center relative overflow-hidden">
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
      
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-12 z-10">
        {/* Left Side Image */}
        <div className="hidden md:block w-32 h-48 lg:w-40 lg:h-60 xl:w-56 xl:h-80 relative rounded-[2rem] overflow-hidden pookie-shadow border-4 border-white -rotate-[4deg] hover:rotate-0 transition-transform duration-500 shrink-0">
          {animalLeft && (
            <Image 
              src={animalLeft.imageUrl} 
              alt={animalLeft.description} 
              fill 
              className="object-cover"
              data-ai-hint={animalLeft.imageHint}
            />
          )}
        </div>

        {/* Game Container */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md">
          <GameContainer />
        </div>

        {/* Right Side Image */}
        <div className="hidden md:block w-32 h-48 lg:w-40 lg:h-60 xl:w-56 xl:h-80 relative rounded-[2rem] overflow-hidden pookie-shadow border-4 border-white rotate-[4deg] hover:rotate-0 transition-transform duration-500 shrink-0">
          {animalRight && (
            <Image 
              src={animalRight.imageUrl} 
              alt={animalRight.description} 
              fill 
              className="object-cover"
              data-ai-hint={animalRight.imageHint}
            />
          )}
        </div>
      </div>
      
      <footer className="mt-4 text-muted-foreground text-[10px] font-medium flex items-center gap-1.5 opacity-60">
        <span>Made with</span>
        <Heart className="w-2.5 h-2.5 text-accent fill-accent animate-bounce" />
        <span>for Pookie</span>
      </footer>
    </main>
  );
}