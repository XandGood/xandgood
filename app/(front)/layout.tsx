import { Nav } from "@/components/nav";

export default function FrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col dark text-foreground">
      <div className="fixed inset-0 -z-10 pointer-events-none bg-background">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: "2s" }} />
      </div>

      <Nav />

      {children}

      <footer className="border-t border-white/5 mt-auto relative z-10 glass-liquid rounded-b-none rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-20 px-5 text-xs text-white/40">
          <p>© 2026 XandGood. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
