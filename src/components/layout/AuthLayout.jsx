import { Outlet } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-lavender-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-md p-6 z-10 relative">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lavender-500/20 to-cyan-500/20 border border-lavender-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.15)] mb-4">
            <Shield className="w-8 h-8 text-lavender-400" />
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lavender-400 to-cyan-400 text-center">
            AI Security Core
          </h1>
        </div>
        
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
