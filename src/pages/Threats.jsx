import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ShieldAlert, Shield, ShieldCheck, Activity, Eye, X, Info, AlertTriangle, ArrowUpRight, Terminal } from 'lucide-react';
import { useToast } from '../context/ToastContext';

// Realistic mock threat data
const initialThreats = [
  {
    id: 'TR-8921',
    name: 'Suspicious Ransomware Activity',
    type: 'Ransomware',
    severity: 'Critical',
    source: '185.220.101.5',
    detectedTime: '2 mins ago',
    status: 'Active',
    host: 'PROD-DB-SERVER-01',
    description: 'Multiple rapid file modifications with suspicious extensions (.locked) detected in the system directory.',
    mitigation: 'Isolate the affected database server from the network immediately. Terminate active user sessions on the machine and restore from the latest clean backup.',
    rawLog: 'Aug 29 07:44:12 PROD-DB-SERVER-01 file-monitor[1042]: WARNING: Rapid encryption activity detected in /var/lib/mysql. User: db_admin_svc. Source IP: 185.220.101.5. Encryption pattern matches LockBit 3.0 signature.'
  },
  {
    id: 'TR-8922',
    name: 'SQL Injection Exploitation Attempt',
    type: 'Web Attack',
    severity: 'High',
    source: '45.143.203.12',
    detectedTime: '12 mins ago',
    status: 'Investigating',
    host: 'CUSTOMER-PORTAL-WEB-04',
    description: 'Inbound HTTP POST request containing classic SQL command structure (UNION SELECT) targeted at login inputs.',
    mitigation: 'Verify input sanitization rules on web application firewall (WAF). Validate queries to check if payload was executed successfully. Blacklist the threat source IP.',
    rawLog: 'Aug 29 07:34:01 CUSTOMER-PORTAL-WEB-04 nginx-access[883]: POST /api/auth/login HTTP/1.1 500 - Payload: username=admin\' UNION SELECT NULL,username,password FROM users--&password=foo Source: 45.143.203.12'
  },
  {
    id: 'TR-8923',
    name: 'SSH Brute Force Attack',
    type: 'Intrusion',
    severity: 'Medium',
    source: '89.248.165.74',
    detectedTime: '45 mins ago',
    status: 'Active',
    host: 'INTERNAL-VPN-GATEWAY',
    description: 'Over 150 failed SSH login attempts detected within a 60-second window targeting root and admin accounts.',
    mitigation: 'Enable Fail2Ban IP-blocking rules. Change SSH listening port, disable password auth (favor SSH key-pairs only), and restrict VPN subnet access rules.',
    rawLog: 'Aug 29 07:01:45 VPN-GATEWAY sshd[3214]: Failed password for invalid user admin from 89.248.165.74 port 48992 ssh2 (Repeated 148 times)'
  },
  {
    id: 'TR-8924',
    name: 'Phishing Email Link Interaction',
    type: 'Social Engineering',
    severity: 'High',
    source: 'user.alice@company.com',
    detectedTime: '2 hours ago',
    status: 'Investigating',
    host: 'HR-LAPTOP-02',
    description: 'Employee clicked on a categorized high-risk link inside an external email spoofing corporate intranet login.',
    mitigation: 'Revoke corporate access tokens for Alice\'s user credentials. Trigger a password reset and run an endpoint security scan on HR-LAPTOP-02.',
    rawLog: 'Aug 29 05:46:11 HR-LAPTOP-02 endpoint-agent[993]: Security Alert: User clicked external link from spoofed domain company-intranet-login.tk. Target IP resolved: 103.22.14.9'
  },
  {
    id: 'TR-8925',
    name: 'Outbound Data Exfiltration Anomaly',
    type: 'Data Leak',
    severity: 'Critical',
    source: '104.244.74.33',
    detectedTime: '4 hours ago',
    status: 'Active',
    host: 'SECURE-FILE-SHARE-02',
    description: 'Unusual data upload rate (4.2 GB sent to external destination) detected outside core working hours.',
    mitigation: 'Instantly block egress traffic to IP 104.244.74.33 on core firewall. Audit the exfiltrated directories to determine if sensitive intellectual property or customer data was compromised.',
    rawLog: 'Aug 29 03:22:04 FILE-SHARE-02 traffic-monitor[443]: ALERT: Outbound transfer anomaly: 4.21 GB transmitted to destination 104.244.74.33 via port 443 in 12 minutes.'
  },
  {
    id: 'TR-8926',
    name: 'Network Port Reconnaissance Scan',
    type: 'Reconnaissance',
    severity: 'Low',
    source: '198.51.100.42',
    detectedTime: '6 hours ago',
    status: 'Resolved',
    host: 'DMZ-FIREWALL',
    description: 'Sequential TCP port sweeps (ports 21, 22, 23, 80, 443, 8080) scanned from a single host source over 5 minutes.',
    mitigation: 'The DMZ Firewall automatically identified and dropped the scanning traffic. Source IP has been locked and added to the transient firewall blacklist block group.',
    rawLog: 'Aug 29 01:14:52 DMZ-FIREWALL iptables[412]: BLOCKED: TCP Port Sweep from 198.51.100.42. Target range: 21-8080. Actions: Drop packet, blacklist source.'
  },
  {
    id: 'TR-8927',
    name: 'Unauthorized Admin API Access',
    type: 'Access Violation',
    severity: 'High',
    source: '172.56.21.90',
    detectedTime: '12 hours ago',
    status: 'Resolved',
    host: 'CENTRAL-AUTH-SERVICE',
    description: 'Call to administrative API endpoint /admin/settings bypasses active session validation using a leaked developer token.',
    mitigation: 'Leaked API token revoked. Added subnet constraints restricting administrative API access to the secure management subnet only. Enhanced token rotation policy.',
    rawLog: 'Aug 28 19:30:15 AUTH-SERVICE api-gateway[110]: Authorization Warning: Access to /admin/settings by developer-token-0499 (revoked) from external address 172.56.21.90.'
  },
  {
    id: 'TR-8928',
    name: 'Unidentified Cryptomining Process',
    type: 'Malware',
    severity: 'Medium',
    source: '5.255.250.3',
    detectedTime: '1 day ago',
    status: 'Resolved',
    host: 'DEV-WORKSTATION-09',
    description: 'System utility svchost.exe utilizing 98% CPU resources and polling external cryptomining network pool addresses.',
    mitigation: 'Quarantined the svchost.exe file payload via endpoint detection (EDR). Run system cleaning tools and review developer browser history for drive-by download vector.',
    rawLog: 'Aug 28 07:12:00 DEV-WORKSTATION-09 edr-agent[214]: Alert: Unsigned binary svchost.exe executing pool communication to cryptopool.org:3333 with max CPU core saturation.'
  }
];

const Threats = () => {
  const [threats, setThreats] = useState(initialThreats);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedThreat, setSelectedThreat] = useState(null);
  
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Filtered threats list
  const filteredThreats = threats.filter((threat) => {
    const matchesSearch = 
      threat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.host.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = severityFilter === 'All' || threat.severity === severityFilter;
    const matchesStatus = statusFilter === 'All' || threat.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  // Calculate statistics based on current threats array state
  const totalCount = threats.length;
  const criticalCount = threats.filter(t => t.severity === 'Critical').length;
  const activeCount = threats.filter(t => t.status === 'Active' || t.status === 'Investigating').length;
  const resolvedCount = threats.filter(t => t.status === 'Resolved').length;

  const handleUpdateStatus = (id, newStatus) => {
    setThreats(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    
    // Update selected threat modal state
    if (selectedThreat && selectedThreat.id === id) {
      setSelectedThreat(prev => ({ ...prev, status: newStatus }));
    }
    
    showToast(`Threat status updated to ${newStatus}`, 'success');
  };

  const handleSendToAI = (threat) => {
    showToast('Redirecting to AI Security Analyst with threat details...', 'info');
    navigate('/ai-analysis', { 
      state: { 
        logPrompt: `[Threat Investigation - ${threat.id}]\nHost: ${threat.host}\nType: ${threat.type}\nSeverity: ${threat.severity}\nDescription: ${threat.description}\n\nRaw Log:\n${threat.rawLog}` 
      } 
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Threat Intelligence</h1>
          <p className="text-sm text-slate-400">Investigate, filter, and remediate active cybersecurity events.</p>
        </div>
      </div>

      {/* Threat Statistics Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-5 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-lavender-500/10 rounded-full blur-xl" />
          <p className="text-slate-400 text-sm font-medium mb-1">Total Threats</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-white">{totalCount}</h3>
            <div className="w-10 h-10 rounded-lg bg-navy-800 border border-navy-700 flex items-center justify-center">
              <Shield className="w-5 h-5 text-lavender-400" />
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-red-500/10 rounded-full blur-xl" />
          <p className="text-slate-400 text-sm font-medium mb-1">Critical Severity</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-red-400">{criticalCount}</h3>
            <div className="w-10 h-10 rounded-lg bg-navy-800 border border-navy-700 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-amber-500/10 rounded-full blur-xl" />
          <p className="text-slate-400 text-sm font-medium mb-1">Active Alerts</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-amber-400">{activeCount}</h3>
            <div className="w-10 h-10 rounded-lg bg-navy-800 border border-navy-700 flex items-center justify-center">
              <Activity className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl" />
          <p className="text-slate-400 text-sm font-medium mb-1">Resolved Threats</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-emerald-400">{resolvedCount}</h3>
            <div className="w-10 h-10 rounded-lg bg-navy-800 border border-navy-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 flex-shrink-0 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-lavender-400 transition-colors" />
          <input
            type="text"
            className="w-full bg-navy-950/50 border border-navy-700/50 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lavender-500/50 focus:border-lavender-500/50 transition-all"
            placeholder="Search threats, sources, or systems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4 w-full md:w-auto items-center justify-end">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Filters:</span>
          </div>

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
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-navy-900 border border-navy-700 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-lavender-500/50 focus:border-lavender-500/50"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Investigating">Investigating</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Threat List Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-navy-700/50 bg-navy-900/30 text-xs font-semibold text-slate-400 tracking-wider">
                <th className="p-4 pl-6">ID & Threat Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Severity</th>
                <th className="p-4">Source</th>
                <th className="p-4">Detected</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700/30">
              {filteredThreats.length > 0 ? (
                filteredThreats.map((threat) => (
                  <tr key={threat.id} className="hover:bg-navy-800/20 transition-colors text-sm text-slate-200">
                    <td className="p-4 pl-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-100 flex items-center gap-2">
                          {threat.name}
                        </span>
                        <span className="text-xs text-slate-500 font-mono mt-0.5">{threat.id} • {threat.host}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-slate-400 bg-navy-800 border border-navy-700/50 text-xs px-2.5 py-1 rounded-md font-medium">
                        {threat.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                        threat.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        threat.severity === 'High' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                        threat.severity === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {threat.severity}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-400 text-xs">{threat.source}</td>
                    <td className="p-4 text-slate-400 text-xs">{threat.detectedTime}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          threat.status === 'Active' ? 'bg-red-500 animate-pulse' :
                          threat.status === 'Investigating' ? 'bg-amber-400 animate-pulse' :
                          'bg-emerald-500'
                        }`} />
                        <span className="text-xs font-medium text-slate-300">{threat.status}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <button
                        onClick={() => setSelectedThreat(threat)}
                        className="p-2 rounded-lg bg-navy-800/80 hover:bg-lavender-500/20 border border-navy-700/50 hover:border-lavender-500/30 text-slate-400 hover:text-lavender-300 transition-colors inline-flex items-center gap-1.5 text-xs font-medium"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Investigate
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500">
                    <ShieldAlert className="w-10 h-10 mx-auto text-slate-600 mb-3" />
                    No threats matched the active filter parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Threat Details Modal */}
      {selectedThreat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => setSelectedThreat(null)} 
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity"
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-2xl bg-navy-900/95 border border-navy-700/80 rounded-2xl shadow-2xl p-6 overflow-hidden md:max-h-[90vh] flex flex-col z-10 animate-[scaleIn_0.2s_ease-out]">
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-lavender-500/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-navy-700/50 pb-4 mb-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  selectedThreat.severity === 'Critical' ? 'bg-red-500/10 border border-red-500/30 text-red-400' :
                  selectedThreat.severity === 'High' ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400' :
                  selectedThreat.severity === 'Medium' ? 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-400' :
                  'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                }`}>
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {selectedThreat.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedThreat.id} • Target: {selectedThreat.host}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedThreat(null)} 
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {/* Meta tags */}
              <div className="grid grid-cols-3 gap-4 p-3.5 bg-navy-950/30 rounded-xl border border-navy-700/30">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 tracking-wider font-semibold block">Severity</span>
                  <span className={`text-sm font-semibold ${
                    selectedThreat.severity === 'Critical' ? 'text-red-400' :
                    selectedThreat.severity === 'High' ? 'text-orange-400' :
                    selectedThreat.severity === 'Medium' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`}>{selectedThreat.severity}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 tracking-wider font-semibold block">Attacker IP/User</span>
                  <span className="text-sm font-mono font-medium text-slate-300">{selectedThreat.source}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 tracking-wider font-semibold block">Detected Time</span>
                  <span className="text-sm font-medium text-slate-300">{selectedThreat.detectedTime}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs uppercase text-slate-400 tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-lavender-400" /> Description
                </h4>
                <p className="text-slate-300 text-sm bg-navy-800/30 p-3 border border-navy-700/30 rounded-xl leading-relaxed">
                  {selectedThreat.description}
                </p>
              </div>

              {/* Mitigation Steps */}
              <div>
                <h4 className="text-xs uppercase text-slate-400 tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Recommended Action & Mitigation
                </h4>
                <p className="text-slate-300 text-sm bg-navy-800/30 p-3 border border-navy-700/30 rounded-xl leading-relaxed">
                  {selectedThreat.mitigation}
                </p>
              </div>

              {/* Raw Log Event */}
              <div>
                <h4 className="text-xs uppercase text-slate-400 tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Raw Log Event Payload
                </h4>
                <pre className="p-3 bg-slate-950 border border-navy-700 rounded-xl text-[11px] font-mono text-cyan-400/90 whitespace-pre-wrap overflow-x-auto max-h-36">
                  {selectedThreat.rawLog}
                </pre>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="border-t border-navy-700/50 pt-4 mt-4 flex flex-wrap gap-3 items-center justify-between">
              <div className="flex gap-2">
                {selectedThreat.status !== 'Resolved' ? (
                  <button
                    onClick={() => handleUpdateStatus(selectedThreat.id, 'Resolved')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                  >
                    Mark as Resolved
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateStatus(selectedThreat.id, 'Active')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-navy-800 hover:bg-navy-700 border border-navy-700 rounded-xl transition-all"
                  >
                    Reopen Threat
                  </button>
                )}
                
                {selectedThreat.status === 'Active' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedThreat.id, 'Investigating')}
                    className="px-4 py-2 text-xs font-semibold text-slate-200 bg-amber-600/90 hover:bg-amber-500 rounded-xl transition-all"
                  >
                    Start Investigation
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleSendToAI(selectedThreat)}
                  className="primary-button px-4 py-2 text-xs flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Analyze with AI
                </button>
                <button
                  onClick={() => setSelectedThreat(null)}
                  className="secondary-button px-4 py-2 text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Threats;
