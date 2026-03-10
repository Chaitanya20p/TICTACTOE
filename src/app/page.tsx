
import { GameContainer } from "@/components/game/game-container";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const pookiePuppy = PlaceHolderImages.find(img => img.id === 'pookie-fluffy-puppy');

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 py-4 px-4 flex flex-col items-center justify-center relative overflow-hidden">
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
      
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-8 z-10">
        {/* Game Container */}
        <div className="order-2 lg:order-1 w-full max-w-xs sm:max-w-sm md:max-w-md">
          <GameContainer />
        </div>

        {/* Right Side Image - The fluffy puppy */}
        <div className="order-1 lg:order-2 w-48 h-72 sm:w-56 sm:h-80 relative rounded-3xl overflow-hidden pookie-shadow border-4 border-white rotate-[2deg] hover:rotate-0 transition-transform duration-500 shrink-0">
          {pookiePuppy && (
            <Image 
              src={pookiePuppy.imageUrl} 
              alt={pookiePuppy.description} 
              fill 
              className="object-cover"
              data-ai-hint={pookiePuppy.imageHint}
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
