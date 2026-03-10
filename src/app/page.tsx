import { GameContainer } from "@/components/game/game-container";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 py-8 px-4 flex flex-col items-center justify-center">
      {/* Decorative background elements */}
      <div className="fixed top-10 left-10 w-24 h-24 bg-accent/20 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-10 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -z-10" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
      
      <GameContainer />
      
      <footer className="mt-8 text-muted-foreground text-sm font-medium">
        Made with <span className="text-accent">♥</span> for Pookie
      </footer>
    </main>
  );
}
