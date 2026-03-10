import { GameContainer } from "@/components/game/game-container";
import { Heart, Star, Sparkles, Cloud } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 py-8 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative blurred background elements */}
      <div className="fixed top-[-5%] left-[-5%] w-[30vw] h-[30vw] bg-accent/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="fixed bottom-[-5%] right-[-5%] w-[40vw] h-[40vw] bg-secondary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] -z-10" />
      
      {/* Floating cute icons */}
      <div className="fixed top-[15%] left-[10%] text-accent/20 animate-float-slow -z-10">
        <Heart className="w-16 h-16 fill-current" />
      </div>
      <div className="fixed top-[20%] right-[15%] text-primary/20 animate-float-fast -z-10">
        <Star className="w-12 h-12 fill-current" />
      </div>
      <div className="fixed bottom-[20%] left-[12%] text-secondary/20 animate-float-fast -z-10">
        <Sparkles className="w-10 h-10" />
      </div>
      <div className="fixed bottom-[15%] right-[10%] text-accent/20 animate-float-slow -z-10">
        <Heart className="w-12 h-12 fill-current" />
      </div>
      <div className="fixed top-[40%] right-[5%] text-primary/10 animate-float-slow -z-10">
        <Cloud className="w-20 h-20 fill-current" />
      </div>
      <div className="fixed bottom-[40%] left-[5%] text-secondary/10 animate-float-fast -z-10">
        <Cloud className="w-16 h-16 fill-current" />
      </div>
      
      <div className="w-full max-w-lg z-10">
        <GameContainer />
      </div>
      
      <footer className="mt-12 text-muted-foreground text-sm font-medium flex items-center gap-2">
        <span>Made with</span>
        <Heart className="w-4 h-4 text-accent fill-accent animate-bounce" />
        <span>for Pookie</span>
      </footer>
    </main>
  );
}