import { useState } from 'react';
import { Search, Filter, AlertTriangle, ShieldCheck, ShieldAlert, Key, Cpu, HelpCircle, Activity as ActivityIcon, Clock } from 'lucide-react';

const initialActivities = [
  {
    id: 'ACT-901',
    type: 'Threat Detected',
    category: 'Threat',
    title: 'Suspicious Ransomware Activity Alert',
    desc: 'Multiple file encryption sweeps detected on PROD-DB-SERVER-01 matching LockBit 3.0 footprint.',
    severity: 'Critical',
    time: '2 mins ago',
    timestamp: 'Aug 29, 07:44:12',
    icon: ShieldAlert,
    iconColor: 'text-red-400 bg-red-500/10 border-red-500/30'
  },
  {
    id: 'ACT-902',
    type: 'Attack Blocked',
    category: 'Threat',
    title: 'SQL Injection Web Injection Stopped',
    desc: 'WAF rules blocked input query override (UNION SELECT) from source IP 45.143.203.12 targeting Web Customer API.',
    severity: 'High',
    time: '12 mins ago',
    timestamp: 'Aug 29, 07:34:01',
    icon: ShieldCheck,
    iconColor: 'text-orange-400 bg-orange-500/10 border-orange-500/30'
  },
  {
    id: 'ACT-903',
    type: 'Security Scan Completed',
    category: 'System',
    title: 'Compliance Security Scan Completed',
    desc: 'Full internal compliance sweep finished. 12,408 assets audited. 4 minor recommendations flagged.',
    severity: 'Info',
    time: '14 mins ago',
    timestamp: 'Aug 29, 07:32:15',
    icon: ShieldCheck,
    iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
  },
  {
    id: 'ACT-904',
    type: 'AI Analysis Completed',
    category: 'AI',
    title: 'AI Threat Report Compiled',
    desc: 'AI Security Analyst completed full telemetry breakdown on TR-8921 with a Risk Score of 98/100.',
    severity: 'Info',
    time: '30 mins ago',
    timestamp: 'Aug 29, 07:16:45',
    icon: Cpu,
    iconColor: 'text-lavender-400 bg-lavender-500/10 border-lavender-500/30'
  },
  {
    id: 'ACT-905',
    type: 'Login Activity',
    category: 'Authentication',
    title: 'SSH Authentication Brute-Force Blocked',
    desc: 'Over 150 failed password attempts detected from 89.248.165.74 on internal VPN gateway. Source IP blacklisted.',
    severity: 'Medium',
    time: '45 mins ago',
    timestamp: 'Aug 29, 07:01:45',
    icon: Key,
    iconColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
  },
  {
    id: 'ACT-906',
    type: 'Threat Resolved',
    category: 'Threat',
    title: 'Network Scanner Sweep Restrained',
    desc: 'Transient IP ban active for 198.51.100.42 after sequential sweep scan on perimeter DMZ Firewall.',
    severity: 'Low',
    time: '1 hour ago',
    timestamp: 'Aug 29, 06:46:12',
    icon: ShieldCheck,
    iconColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
  },
  {
    id: 'ACT-907',
    type: 'Login Activity',
    category: 'Authentication',
    title: 'Successful Authentication: Admin Account',
    desc: 'User admin@example.com (Role: Administrator) successfully logged in via Chrome / Windows 11 client.',
    severity: 'Info',
    time: '2 hours ago',
    timestamp: 'Aug 29, 05:36:57',
    icon: Key,
    iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
  },
  {
    id: 'ACT-908',
    type: 'Threat Detected',
    category: 'Threat',
    title: 'Egress Transfer Leak Anomaly Triggered',
    desc: 'Alert outbound exfiltration transfer (4.21 GB egress to 104.244.74.33) executed by user hr_backup_svc.',
    severity: 'Critical',
    time: '4 hours ago',
    timestamp: 'Aug 29, 03:22:04',
    icon: ShieldAlert,
    iconColor: 'text-red-400 bg-red-500/10 border-red-500/30'
  },
  {
    id: 'ACT-909',
    type: 'Threat Resolved',
    category: 'Threat',
    title: 'API Leaked Token Revoked & Blocked',
    desc: 'Admin developer token api-token-0499 deactivated. Subnet restrictions enforced on administrative routes.',
    severity: 'High',
    time: '12 hours ago',
    timestamp: 'Aug 28, 19:30:15',
    icon: ShieldCheck,
    iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
  },
  {
    id: 'ACT-910',
    type: 'System Update',
    category: 'System',
    title: 'Security Definitions Updated',
    desc: 'Nexus threat feeds database synced. 42 new active ransomware definitions and 110 IP blocklists appended.',
    severity: 'Info',
    time: '1 day ago',
    timestamp: 'Aug 28, 07:12:00',
    icon: Cpu,
    iconColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
  }
];

const Activity = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Filter logic
  const filteredActivities = initialActivities.filter((act) => {
    const matchesSearch = 
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = severityFilter === 'All' || act.severity === severityFilter;
    const matchesCategory = categoryFilter === 'All' || act.category === categoryFilter;

    return matchesSearch && matchesSeverity && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Security Activity</h1>
        <p className="text-sm text-slate-400">Audit system events, authentication alerts, and threat detection timelines.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 flex-shrink-0 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-lavender-400 transition-colors" />
          <input
            type="text"
            className="w-full bg-navy-950/50 border border-navy-700/50 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lavender-500/50 focus:border-lavender-500/50 transition-all"
            placeholder="Search activities, descriptions, or alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4 w-full md:w-auto items-center justify-end">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Filter Logs:</span>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-navy-900 border border-navy-700 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-lavender-500/50 focus:border-lavender-500/50"
          >
            <option value="All">All Categories</option>
            <option value="Threat">Threats & Blocks</option>
            <option value="System">System Scans</option>
            <option value="Authentication">Authentication</option>
            <option value="AI">AI Reports</option>
          </select>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-navy-900 border border-navy-700 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-lavender-500/50 focus:border-lavender-500/50"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="Info">Info</option>
          </select>
        </div>
      </div>

      {/* Timeline List */}
      <div className="glass-panel p-6">
        <div className="relative border-l border-navy-700/50 pl-6 space-y-8 py-2 ml-3">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="relative group animate-[fadeIn_0.3s_ease-out]">
                  {/* Timeline Dot Icon */}
                  <div className={`absolute -left-11 top-0 w-10 h-10 rounded-xl border flex items-center justify-center transition-all group-hover:scale-105 ${act.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Activity Details Card */}
                  <div className="p-4 rounded-xl border border-navy-700/40 bg-navy-950/20 hover:bg-navy-950/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">{act.type}</span>
                        <span className="text-[10px] text-slate-500 font-mono font-medium">{act.id}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                          act.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                          act.severity === 'High' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                          act.severity === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                          act.severity === 'Low' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          'bg-slate-500/10 text-slate-400 border-slate-500/20'
                        }`}>
                          {act.severity}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-200 mt-1">{act.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">{act.desc}</p>
                    </div>

                    {/* Time details */}
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-medium whitespace-nowrap self-end md:self-center">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{act.time}</span>
                      <span className="text-slate-700">•</span>
                      <span className="font-mono text-[10px]">{act.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center text-slate-500">
              <ActivityIcon className="w-10 h-10 mx-auto text-slate-600 mb-2" />
              No activities matched search query or active filter settings.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
