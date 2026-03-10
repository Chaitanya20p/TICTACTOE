import { GameContainer } from "@/components/game/game-container";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heartLeft = PlaceHolderImages.find(img => img.id === 'cute-heart-left');
  const heartRight = PlaceHolderImages.find(img => img.id === 'cute-heart-right');

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
      
      <div className="w-full max-w-6xl flex items-center justify-center gap-2 sm:gap-4 md:gap-8 z-10">
        {/* Left Side Heart Image - smaller and visible sooner */}
        <div className="hidden xs:block w-16 h-24 sm:w-24 sm:h-36 lg:w-32 lg:h-48 relative rounded-2xl overflow-hidden pookie-shadow border-4 border-white -rotate-[4deg] shrink-0">
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
        <div className="w-full max-w-[280px] sm:max-w-sm shrink-0">
          <GameContainer />
        </div>

        {/* Right Side Heart Image - smaller and visible sooner */}
        <div className="hidden xs:block w-16 h-24 sm:w-24 sm:h-36 lg:w-32 lg:h-48 relative rounded-2xl overflow-hidden pookie-shadow border-4 border-white rotate-[4deg] shrink-0">
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
      
      <footer className="absolute bottom-2 text-muted-foreground text-[8px] font-medium flex items-center gap-1 opacity-60">
        <span>Made with</span>
        <Heart className="w-2 h-2 text-accent fill-accent animate-bounce" />
        <span>for Pookie</span>
      </footer>
    </main>
  );
}