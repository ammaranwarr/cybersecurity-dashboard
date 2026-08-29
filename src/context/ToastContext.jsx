import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertOctagon } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full px-4 md:px-0 md:w-96 pointer-events-none">
        {toasts.map((toast) => {
          let Icon = CheckCircle;
          let iconColor = 'text-green-400';
          let borderColor = 'border-green-500/30';
          let glowColor = 'shadow-[0_0_15px_rgba(74,222,128,0.15)]';

          if (toast.type === 'error') {
            Icon = AlertOctagon;
            iconColor = 'text-red-400';
            borderColor = 'border-red-500/30';
            glowColor = 'shadow-[0_0_15px_rgba(248,113,113,0.15)]';
          } else if (toast.type === 'warning') {
            Icon = AlertTriangle;
            iconColor = 'text-yellow-400';
            borderColor = 'border-yellow-500/30';
            glowColor = 'shadow-[0_0_15px_rgba(250,204,21,0.15)]';
          } else if (toast.type === 'info') {
            Icon = Info;
            iconColor = 'text-cyan-400';
            borderColor = 'border-cyan-500/30';
            glowColor = 'shadow-[0_0_15px_rgba(56,189,248,0.15)]';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border bg-navy-900/90 backdrop-blur-md text-slate-200 transition-all duration-300 transform translate-y-0 ${borderColor} ${glowColor}`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
              <div className="flex-1 text-sm font-medium">{toast.message}</div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-500 hover:text-slate-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
