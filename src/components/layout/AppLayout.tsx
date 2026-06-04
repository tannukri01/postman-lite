'use client';

import { ReactNode } from 'react';
import { CollectionsSidebar } from '@/components/collections/CollectionsSidebar';
import { Toaster } from 'sonner';
import { Zap, ExternalLink, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950">
      <CollectionsSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Custom Header */}
        <header className="h-14 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Postman Lite
              </h1>
              <p className="text-[10px] text-muted-foreground -mt-0.5 tracking-wider uppercase">
                API Testing & Docs
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="text-xs gap-1.5" asChild>
              <a href="https://github.com/tannukri01/postman-lite" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3.5 h-3.5" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-hidden">
          {children}
        </main>

        {/* Footer */}
        <footer className="h-8 border-t bg-muted/30 flex items-center justify-center text-[10px] text-muted-foreground gap-1">
          Made with <Heart className="w-3 h-3 text-red-500" /> by Tannu Singh • Next.js + Zustand + Monaco
        </footer>
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
