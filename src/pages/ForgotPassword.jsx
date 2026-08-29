import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="glass-panel p-8 w-full relative">
      <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none" />
      
      <div className="mb-6">
        <Link to="/login" className="inline-flex items-center text-xs text-slate-400 hover:text-lavender-400 transition-colors">
          <ArrowLeft className="w-3 h-3 mr-1" /> Back to login
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
      <p className="text-slate-400 text-sm mb-8">Enter your email address and we'll send you a link to reset your password.</p>

      {submitted ? (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm text-center">
          If an account exists with that email, a reset link has been sent.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input w-full pl-10 pr-4 py-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          <button type="submit" className="primary-button w-full py-3 flex items-center justify-center gap-2 group mt-2">
            Send Reset Link
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
