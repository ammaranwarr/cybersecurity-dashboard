import { useState, useEffect } from 'react';
import { User, Shield, Bell, Eye, Save, ToggleLeft, ToggleRight, Laptop, Trash2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

// Preset avatar backgrounds
const avatarOptions = [
  { name: 'Lavender', url: 'https://ui-avatars.com/api/?name=Admin&background=8b5cf6&color=fff' },
  { name: 'Ocean Blue', url: 'https://ui-avatars.com/api/?name=Admin&background=3b82f6&color=fff' },
  { name: 'Teal/Cyan', url: 'https://ui-avatars.com/api/?name=Admin&background=06b6d4&color=fff' },
  { name: 'Emerald', url: 'https://ui-avatars.com/api/?name=Admin&background=10b981&color=fff' },
  { name: 'Ruby Red', url: 'https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff' }
];

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();

  // Settings states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  const [twoFactor, setTwoFactor] = useState(() => {
    return localStorage.getItem('nexus_settings_2fa') === 'true';
  });
  
  const [loginAlerts, setLoginAlerts] = useState(() => {
    return localStorage.getItem('nexus_settings_loginalerts') !== 'false';
  });

  const [sessions, setSessions] = useState([
    { id: 'sess-1', device: 'Chrome on Windows 11 (Current)', ip: '192.168.1.142', location: 'Austin, US', active: true },
    { id: 'sess-2', device: 'Nexus App on iOS 17.2', ip: '172.56.21.90', location: 'Dallas, US', active: false },
    { id: 'sess-3', device: 'Safari on macOS Sonoma', ip: '192.168.1.180', location: 'Austin, US', active: false }
  ]);

  // Notifications Toggles
  const [notifyThreats, setNotifyThreats] = useState(() => {
    return localStorage.getItem('nexus_settings_notify_threats') !== 'false';
  });
  const [notifyReports, setNotifyReports] = useState(() => {
    return localStorage.getItem('nexus_settings_notify_reports') !== 'false';
  });
  const [notifyAI, setNotifyAI] = useState(() => {
    return localStorage.getItem('nexus_settings_notify_ai') !== 'false';
  });

  // Appearance Toggles
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('nexus_settings_darkmode') !== 'false';
  });
  const [compactMode, setCompactMode] = useState(() => {
    return localStorage.getItem('nexus_settings_compactmode') === 'true';
  });

  // Run initial class toggle on settings page load (sync state with DOM)
  useEffect(() => {
    // Compact mode check
    if (compactMode) {
      document.documentElement.classList.add('compact-mode');
    } else {
      document.documentElement.classList.remove('compact-mode');
    }
  }, [compactMode]);

  const handleSave = (e) => {
    e.preventDefault();

    // 1. Update Auth Context (persists user in localStorage inside context)
    updateUser({
      name,
      email,
      avatar
    });

    // 2. Save security & notification preferences to localStorage
    localStorage.setItem('nexus_settings_2fa', twoFactor.toString());
    localStorage.setItem('nexus_settings_loginalerts', loginAlerts.toString());
    localStorage.setItem('nexus_settings_notify_threats', notifyThreats.toString());
    localStorage.setItem('nexus_settings_notify_reports', notifyReports.toString());
    localStorage.setItem('nexus_settings_notify_ai', notifyAI.toString());
    localStorage.setItem('nexus_settings_darkmode', darkMode.toString());
    localStorage.setItem('nexus_settings_compactmode', compactMode.toString());

    // 3. Trigger Toast notification
    showToast('System configuration changes saved successfully.', 'success');
  };

  const handleRevokeSession = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    showToast('Active device session revoked.', 'success');
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">System Settings</h1>
          <p className="text-sm text-slate-400">Configure profile settings, active devices, notifications, and screen options.</p>
        </div>
        <button
          type="submit"
          className="primary-button px-5 py-2.5 text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-md font-semibold text-white flex items-center gap-2 border-b border-navy-700/50 pb-3">
            <User className="w-4.5 h-4.5 text-lavender-400" />
            Profile Configuration
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Full Name</label>
              <input
                type="text"
                required
                className="w-full bg-navy-950/50 border border-navy-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-lavender-500/50 focus:border-lavender-500/50 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Email Address</label>
              <input
                type="email"
                required
                className="w-full bg-navy-950/50 border border-navy-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-lavender-500/50 focus:border-lavender-500/50 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Avatar selector */}
            <div>
              <label className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block mb-2">Select Account Avatar</label>
              <div className="flex gap-3 items-center">
                <img
                  src={avatar}
                  alt="Current Avatar"
                  className="w-12 h-12 rounded-xl border border-lavender-500/40 p-0.5"
                />
                <div className="flex flex-wrap gap-2.5">
                  {avatarOptions.map((opt) => (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setAvatar(opt.url)}
                      className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                        avatar === opt.url ? 'border-lavender-400 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={opt.url} alt={opt.name} className="w-full h-full" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings & Active Sessions */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-md font-semibold text-white flex items-center gap-2 border-b border-navy-700/50 pb-3">
            <Shield className="w-4.5 h-4.5 text-cyan-400" />
            Security & Authentication
          </h3>

          <div className="space-y-4">
            {/* 2FA Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-navy-950/20 border border-navy-700/30">
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Two-Factor Authentication</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Enforce SMS/Authenticator MFA checks on system log-in attempts.</p>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactor(!twoFactor)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {twoFactor ? (
                  <ToggleRight className="w-9 h-9 text-lavender-400" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-slate-600" />
                )}
              </button>
            </div>

            {/* Login Alerts Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-navy-950/20 border border-navy-700/30">
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Login Attempt Alerts</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Send a real-time notification alert when a login succeeds from a new IP.</p>
              </div>
              <button
                type="button"
                onClick={() => setLoginAlerts(!loginAlerts)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {loginAlerts ? (
                  <ToggleRight className="w-9 h-9 text-lavender-400" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-slate-600" />
                )}
              </button>
            </div>

            {/* Active Sessions */}
            <div className="space-y-2.5">
              <label className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Active Sessions</label>
              <div className="space-y-2">
                {sessions.map((sess) => (
                  <div key={sess.id} className="flex justify-between items-center p-2 px-3 rounded-xl border border-navy-700/30 bg-navy-950/40 text-xs">
                    <div className="flex items-center gap-3">
                      <Laptop className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="font-semibold text-slate-200">{sess.device}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{sess.ip} • {sess.location}</p>
                      </div>
                    </div>
                    {sess.active ? (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">Active Now</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleRevokeSession(sess.id)}
                        className="text-slate-500 hover:text-red-400 p-1.5 hover:bg-red-500/15 rounded-lg transition-all"
                        title="Revoke session key"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Config */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-md font-semibold text-white flex items-center gap-2 border-b border-navy-700/50 pb-3">
            <Bell className="w-4.5 h-4.5 text-lavender-400" />
            Real-Time Notifications
          </h3>

          <div className="space-y-4">
            {/* Notify Threats */}
            <div className="flex items-center justify-between p-2.5">
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Threat Alerts</h4>
                <p className="text-[11px] text-slate-500">Instant notification when a Critical/High threat is detected.</p>
              </div>
              <button
                type="button"
                onClick={() => setNotifyThreats(!notifyThreats)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {notifyThreats ? (
                  <ToggleRight className="w-8 h-8 text-lavender-400" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-600" />
                )}
              </button>
            </div>

            {/* Notify Reports */}
            <div className="flex items-center justify-between p-2.5 border-t border-navy-700/30">
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Security Reports</h4>
                <p className="text-[11px] text-slate-500">Receive weekly compilation audits and posture reviews.</p>
              </div>
              <button
                type="button"
                onClick={() => setNotifyReports(!notifyReports)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {notifyReports ? (
                  <ToggleRight className="w-8 h-8 text-lavender-400" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-600" />
                )}
              </button>
            </div>

            {/* Notify AI Alerts */}
            <div className="flex items-center justify-between p-2.5 border-t border-navy-700/30">
              <div>
                <h4 className="text-sm font-semibold text-slate-200">AI Analysis Updates</h4>
                <p className="text-[11px] text-slate-500">Notify upon successful resolution of log analysis queues.</p>
              </div>
              <button
                type="button"
                onClick={() => setNotifyAI(!notifyAI)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {notifyAI ? (
                  <ToggleRight className="w-8 h-8 text-lavender-400" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-md font-semibold text-white flex items-center gap-2 border-b border-navy-700/50 pb-3">
            <Eye className="w-4.5 h-4.5 text-cyan-400" />
            Display & Appearance
          </h3>

          <div className="space-y-4">
            {/* Dark Mode */}
            <div className="flex items-center justify-between p-2.5">
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Dark Mode Enforcement</h4>
                <p className="text-[11px] text-slate-500">Toggle dark / midnight color tokens across all interfaces.</p>
              </div>
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {darkMode ? (
                  <ToggleRight className="w-8 h-8 text-lavender-400" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-600" />
                )}
              </button>
            </div>

            {/* Compact Mode */}
            <div className="flex items-center justify-between p-2.5 border-t border-navy-700/30">
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Compact Padding Layout</h4>
                <p className="text-[11px] text-slate-500">Shrink vertical margins and internal card spacing metrics.</p>
              </div>
              <button
                type="button"
                onClick={() => setCompactMode(!compactMode)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {compactMode ? (
                  <ToggleRight className="w-8 h-8 text-lavender-400" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Settings;
