import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  useEffect(() => {
    const isCompact = localStorage.getItem('nexus_settings_compactmode') === 'true';
    if (isCompact) {
      document.documentElement.classList.add('compact-mode');
    } else {
      document.documentElement.classList.remove('compact-mode');
    }
  }, []);
  return (
    <div className="min-h-screen bg-navy-900 flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-lavender-600/5 blur-[120px] pointer-events-none rounded-full" />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
