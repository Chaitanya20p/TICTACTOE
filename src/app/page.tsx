import { GameContainer } from "@/components/game/game-container";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const dogLeft = PlaceHolderImages.find(img => img.id === 'cute-dog-left');
  const dogRight = PlaceHolderImages.find(img => img.id === 'cute-dog-right');

  return (
    <main className="h-screen bg-background selection:bg-primary/30 flex flex-col items-center justify-center relative overflow-hidden p-2">
      {/* Decorative blurred background elements */}
      <div className="fixed top-[-5%] left-[-5%] w-[30vw] h-[30vw] bg-accent/10 rounded-full blur-[100px] -z-10" />
      <div className="fixed bottom-[-5%] right-[-5%] w-[40vw] h-[40vw] bg-secondary/10 rounded-full blur-[120px] -z-10" />
      
      {/* Floating cute icons */}
      <div className="fixed top-[10%] left-[5%] text-accent/20 animate-float-slow -z-10">
        <Heart className="w-8 h-8 fill-current" />
      </div>
      <div className="fixed top-[15%] right-[8%] text-primary/20 animate-float-fast -z-10">
        <Star className="w-6 h-6 fill-current" />
      </div>
      
      <div className="w-full max-w-[1400px] flex items-center justify-center gap-4 md:gap-12 lg:gap-24 z-10 px-4">
        {/* Left Side Dog Image */}
        <div className="hidden md:block w-32 h-48 lg:w-48 lg:h-72 relative rounded-3xl overflow-hidden pookie-shadow border-4 border-white -rotate-[8deg] shrink-0 opacity-80 hover:opacity-100 transition-opacity">
          {dogLeft && (
            <Image 
              src={dogLeft.imageUrl} 
              alt={dogLeft.description} 
              fill 
              className="object-cover"
              data-ai-hint={dogLeft.imageHint}
            />
          )}
        </div>

        {/* Game Container - Center Focus */}
        <div className="w-full max-w-[320px] sm:max-w-[480px] shrink-0">
          <GameContainer />
        </div>

        {/* Right Side Dog Image */}
        <div className="hidden md:block w-32 h-48 lg:w-48 lg:h-72 relative rounded-3xl overflow-hidden pookie-shadow border-4 border-white rotate-[8deg] shrink-0 opacity-80 hover:opacity-100 transition-opacity">
          {dogRight && (
            <Image 
              src={dogRight.imageUrl} 
              alt={dogRight.description} 
              fill 
              className="object-cover"
              data-ai-hint={dogRight.imageHint}
            />
          )}
        </div>
      </div>
      
      <footer className="absolute bottom-4 text-muted-foreground text-[10px] font-medium flex items-center gap-1 opacity-60">
        <span>Made with</span>
        <Heart className="w-3 h-3 text-accent fill-accent animate-bounce" />
        <span>for Pookie</span>
      </footer>
    </main>
  );
}
