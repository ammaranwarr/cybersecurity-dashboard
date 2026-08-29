import { Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-navy-900/80 backdrop-blur-md border-b border-navy-700/50 flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden text-slate-400 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex relative w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500 group-focus-within:text-lavender-400 transition-colors" />
          </div>
          <input
            type="text"
            className="w-full bg-navy-800/50 border border-navy-700/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lavender-500/50 focus:border-lavender-500/50 transition-all"
            placeholder="Search threats, IP addresses, or CVEs..."
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-lavender-400 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-navy-900"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-navy-700/50">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-slate-200">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.role}</p>
          </div>
          <img
            src={user?.avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-xl border border-navy-600/50"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
