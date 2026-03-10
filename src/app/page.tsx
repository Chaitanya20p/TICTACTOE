import { GameContainer } from "@/components/game/game-container";
import { Heart, Star, Sparkles, Cloud } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const puppy = PlaceHolderImages.find(img => img.id === 'cute-puppy');
  const kitten = PlaceHolderImages.find(img => img.id === 'cute-kitten');

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
      
      <div className="w-full max-w-5xl flex items-center justify-center gap-4 z-10">
        {/* Left Image - hidden on very small screens */}
        <div className="hidden lg:block w-48 h-72 relative rounded-3xl overflow-hidden pookie-shadow border-4 border-white rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
          {puppy && (
            <Image 
              src={puppy.imageUrl} 
              alt={puppy.description} 
              fill 
              className="object-cover"
              data-ai-hint={puppy.imageHint}
            />
          )}
        </div>

        {/* Game Container */}
        <div className="w-full max-w-xs sm:max-w-sm">
          <GameContainer />
        </div>

        {/* Right Image - hidden on very small screens */}
        <div className="hidden lg:block w-48 h-72 relative rounded-3xl overflow-hidden pookie-shadow border-4 border-white rotate-[3deg] hover:rotate-0 transition-transform duration-500">
          {kitten && (
            <Image 
              src={kitten.imageUrl} 
              alt={kitten.description} 
              fill 
              className="object-cover"
              data-ai-hint={kitten.imageHint}
            />
          )}
        </div>
      </div>
      
      <footer className="mt-4 text-muted-foreground text-[10px] font-medium flex items-center gap-1.5">
        <span>Made with</span>
        <Heart className="w-2.5 h-2.5 text-accent fill-accent animate-bounce" />
        <span>for Pookie</span>
      </footer>
    </main>
  );
}
