import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShieldAlert, BrainCircuit, ShieldCheck, FileText, Activity as ActivityIcon, Settings, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: ShieldAlert, label: 'Threats', path: '/threats' },
  { icon: BrainCircuit, label: 'AI Analysis', path: '/ai-analysis' },
  { icon: ShieldCheck, label: 'Security', path: '/security' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: ActivityIcon, label: 'Activity', path: '/activity' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-navy-900/95 backdrop-blur-xl border-r border-navy-700/50 flex flex-col hidden md:flex z-20">
      <div className="h-20 flex items-center px-6 border-b border-navy-700/50">
        <div className="flex items-center gap-3 text-lavender-400">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lavender-500/20 to-cyan-500/20 border border-lavender-500/30 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-lavender-400 to-cyan-400">
            Nexus AI
          </span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden",
                isActive 
                  ? "text-white bg-lavender-500/10 border border-lavender-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-navy-800/50"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-lavender-400 to-cyan-400 rounded-r-md" />
              )}
              <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-lavender-400" : "text-slate-500 group-hover:text-lavender-400/70")} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-navy-700/50">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
