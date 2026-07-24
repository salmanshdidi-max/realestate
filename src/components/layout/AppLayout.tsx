import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Set dark mode initially
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden font-sans" dir="rtl">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 relative h-screen">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background/50 relative">
          {/* Subtle noise/grid background overlay */}
          <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
               
          <div className="relative z-10 p-6 max-w-7xl mx-auto w-full min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};
