import { useState } from 'react';
import { ShieldCheck, ShieldAlert, Shield, Server, UserCheck, Smartphone, Database, Check, Loader2, Play, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

// Simple SVG Circular Progress Component
const CircularProgress = ({ score, size = 100, strokeWidth = 8, color = 'stroke-lavender-500', glow = 'shadow-[0_0_15px_rgba(139,92,246,0.25)]' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Glow backing */}
      <div className={`absolute inset-2 rounded-full blur-xl pointer-events-none opacity-20`} />
      <svg className="w-full h-full transform -rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-navy-700/80 fill-none"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`fill-none transition-all duration-1000 ${color}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-bold text-white">{score}</span>
        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">POSTURE</span>
      </div>
    </div>
  );
};

const Security = () => {
  const { showToast } = useToast();
  
  const [overallScore, setOverallScore] = useState(94);
  const [scores, setScores] = useState({
    network: 92,
    identity: 88,
    app: 95,
    data: 90
  });

  const [scanning, setScanning] = useState(false);
  const [lastScan, setLastScan] = useState('14 mins ago');
  const [remediatingId, setRemediatingId] = useState(null);

  const [recommendations, setRecommendations] = useState([
    {
      id: 'REC-01',
      title: 'Enforce MFA for Developer VPN Accounts',
      category: 'identity',
      severity: 'High',
      impact: '+3 Score',
      points: 3,
      desc: '3 administrator profiles are logging in without MFA enforcement checks on the VPN tunnel.'
    },
    {
      id: 'REC-02',
      title: 'Patch Tomcat Web Vulnerability CVE-2023-4567',
      category: 'app',
      severity: 'Critical',
      impact: '+2 Score',
      points: 2,
      desc: 'Portal applications in DMZ subnet run an obsolete Apache service with critical remote code execution exposure.'
    },
    {
      id: 'REC-03',
      title: 'Restrict SSH Management Ports on Prod Nodes',
      category: 'network',
      severity: 'Medium',
      impact: '+2 Score',
      points: 2,
      desc: 'Multiple SSH management interfaces (Port 22) are open to public gateway subnets.'
    },
    {
      id: 'REC-04',
      title: 'Enable Encrypted DB Off-site Replication',
      category: 'data',
      severity: 'Low',
      impact: '+1 Score',
      points: 1,
      desc: 'Production database backup pipelines are only replicated locally, risking data integrity loss during a backup node failure.'
    }
  ]);

  const handleScan = () => {
    setScanning(true);
    showToast('Initializing full network and asset security scan...', 'info');

    setTimeout(() => {
      setScanning(false);
      setLastScan('Just now');
      
      // Update scores slightly to simulate scanner finding new fixes or updates
      setScores({
        network: 93,
        identity: 88,
        app: 95,
        data: 91
      });
      setOverallScore(94);
      showToast('Security scan complete. 12,408 assets validated.', 'success');
    }, 2000);
  };

  const handleRemediate = (id, points, category) => {
    setRemediatingId(id);
    showToast(`Remediating recommendations rules on ${category} layer...`, 'info');

    setTimeout(() => {
      // Remove recommendation from state
      setRecommendations(prev => prev.filter(r => r.id !== id));
      
      // Increment score
      setOverallScore(prev => Math.min(100, prev + points));
      setScores(prev => ({
        ...prev,
        [category]: Math.min(100, prev[category] + points)
      }));

      setRemediatingId(null);
      showToast('Remediation script executed. Security score updated!', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Security Posture</h1>
          <p className="text-sm text-slate-400">Evaluate defenses, manage hardening recommendations, and audit vulnerabilities.</p>
        </div>
        <div>
          <button
            onClick={handleScan}
            disabled={scanning}
            className="primary-button px-4 py-2.5 text-xs flex items-center gap-1.5 disabled:opacity-50"
          >
            {scanning ? (
              <>
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
                Scanning Assets...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Scan Now
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Score Summary */}
        <div className="glass-panel p-6 flex flex-col items-center justify-center text-center gap-6">
          <h3 className="text-md font-semibold text-slate-200">Overall Security Score</h3>
          
          <div className="relative">
            <CircularProgress 
              score={overallScore} 
              size={180} 
              strokeWidth={14} 
              color="stroke-lavender-500" 
            />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
              Protection Status: Excellent
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Last Scan Executed: <span className="text-slate-300 font-medium">{lastScan}</span>
            </p>
          </div>

          <div className="w-full border-t border-navy-700/50 pt-5 mt-2 grid grid-cols-2 gap-4">
            <div className="text-left">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Audited Assets</span>
              <span className="text-md font-bold text-white">12,408</span>
            </div>
            <div className="text-left">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Open Hardening Rules</span>
              <span className="text-md font-bold text-lavender-400">{recommendations.length}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Score breakdown categories */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Network Security */}
          <div className="glass-panel p-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Network Security</h4>
                  <span className="text-xs text-slate-500">Firewall, ports, routing</span>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Secure</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-navy-950/60 h-2 rounded-full overflow-hidden border border-navy-700/50">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${scores.network}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-300">{scores.network}%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Identity Security */}
          <div className="glass-panel p-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Identity Security</h4>
                  <span className="text-xs text-slate-500">MFA, API keys, access control</span>
                </div>
                <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Attention</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-navy-950/60 h-2 rounded-full overflow-hidden border border-navy-700/50">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${scores.identity}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-300">{scores.identity}%</span>
              </div>
            </div>
          </div>

          {/* Card 3: Application Security */}
          <div className="glass-panel p-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Application Security</h4>
                  <span className="text-xs text-slate-500">WAF protection, dependencies</span>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Secure</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-navy-950/60 h-2 rounded-full overflow-hidden border border-navy-700/50">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${scores.app}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-300">{scores.app}%</span>
              </div>
            </div>
          </div>

          {/* Card 4: Data Security */}
          <div className="glass-panel p-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center flex-shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Data Security</h4>
                  <span className="text-xs text-slate-500">Encryption, DB replicas, backups</span>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Secure</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-navy-950/60 h-2 rounded-full overflow-hidden border border-navy-700/50">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${scores.data}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-300">{scores.data}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Hardening Recommendations Section */}
      <div className="glass-panel p-6">
        <h3 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-lavender-400" />
          Active Security Recommendations ({recommendations.length})
        </h3>
        
        <div className="space-y-4">
          {recommendations.length > 0 ? (
            recommendations.map((rec) => (
              <div 
                key={rec.id} 
                className="p-4 rounded-xl border border-navy-700/50 bg-navy-950/20 hover:bg-navy-950/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      rec.severity === 'Critical' ? 'bg-red-500/15 text-red-400 border border-red-500/20' :
                      rec.severity === 'High' ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20' :
                      rec.severity === 'Medium' ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20' :
                      'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                    }`}>
                      {rec.severity} Severity
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{rec.id}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10">
                      {rec.impact}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 mt-1">{rec.title}</h4>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">{rec.desc}</p>
                </div>

                <div>
                  <button
                    onClick={() => handleRemediate(rec.id, rec.points, rec.category)}
                    disabled={remediatingId === rec.id}
                    className="secondary-button px-4 py-2 text-xs flex items-center gap-1.5 border border-navy-700 hover:border-lavender-500/40 hover:text-lavender-300"
                  >
                    {remediatingId === rec.id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Remediating...
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Remediate
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center border border-dashed border-navy-700 rounded-xl">
              <ShieldCheck className="w-12 h-12 mx-auto text-emerald-400 mb-2" />
              <h4 className="text-sm font-semibold text-slate-200">No Open Recommendations</h4>
              <p className="text-xs text-slate-500 mt-1">All verified hardening policies are successfully enforced!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Security;
