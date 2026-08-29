import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BrainCircuit, ShieldAlert, Sparkles, Send, Cpu, ShieldCheck, Terminal, HelpCircle, Loader2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

// Sample templates
const templates = {
  ssh: {
    label: 'SSH Brute Force Attempt',
    log: `Aug 29 07:01:45 VPN-GATEWAY sshd[3214]: Failed password for invalid user admin from 89.248.165.74 port 48992 ssh2\nAug 29 07:01:46 VPN-GATEWAY sshd[3216]: Failed password for invalid user root from 89.248.165.74 port 48998 ssh2\nAug 29 07:01:47 VPN-GATEWAY sshd[3218]: Failed password for invalid user support from 89.248.165.74 port 49004 ssh2\nAug 29 07:01:48 VPN-GATEWAY sshd[3220]: Failed password for invalid user admin from 89.248.165.74 port 49010 ssh2`
  },
  sql: {
    label: 'SQL Injection on Login API',
    log: `POST /api/v1/users/authenticate HTTP/2.0\nHost: portal.company.com\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\nAccept: application/json\nContent-Type: application/json\nContent-Length: 104\n\n{"username": "admin' OR 1=1; --", "password": "nopassword", "auth_token": "null"}`
  },
  exfil: {
    label: 'Egress Traffic Anomaly',
    log: `Traffic Log: File-Share-02 -> IP 104.244.74.33\nProtocol: HTTPS (TCP 443)\nDuration: 12 minutes\nBytes Transmitted: 4,520,388,110 bytes (4.21 GB)\nBytes Received: 24,019,204 bytes (22.9 MB)\nAnomaly Alert Score: 94.2 (Threshold: 50.0)\nUser Session: hr_backup_svc`
  }
};

const AIAnalysis = () => {
  const location = useLocation();
  const { showToast } = useToast();
  
  const [logInput, setLogInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);

  // Check if a prompt was passed from another page (like Threats page)
  useEffect(() => {
    if (location.state && location.state.logPrompt) {
      setLogInput(location.state.logPrompt);
      showToast('Pre-populated threat log for AI analysis', 'info');
    }
  }, [location.state, showToast]);

  const loadingStatuses = [
    'Parsing security payload...',
    'Checking matching threat vectors in signature database...',
    'Evaluating potential impact on adjacent infrastructure...',
    'Formulating defensive isolation & mitigation response...'
  ];

  const handleRunAnalysis = () => {
    if (!logInput.trim()) {
      showToast('Please enter a threat description or security log to analyze.', 'warning');
      return;
    }

    setAnalyzing(true);
    setLoadingStep(0);
    setResult(null);

    // Simulate multi-step analysis progress
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < loadingStatuses.length) {
        setLoadingStep(step);
      } else {
        clearInterval(interval);
        generateMockResult();
      }
    }, 450);
  };

  const generateMockResult = () => {
    // Basic heuristics to make mock result fit the input
    const lowerInput = logInput.toLowerCase();
    
    let classification = 'Unclassified Security Incident';
    let riskScore = 75;
    let confidence = 89;
    let recommendation = 'Initiate standard incident containment procedures. Restrict access to affected systems and audit logs.';
    let findings = [
      'Anomalous activity signature identified on internal host nodes.',
      'Potential unauthorized system actions or privilege escalation detected.',
      'Risk of adjacent asset exposure remains high due to network boundaries.'
    ];

    if (lowerInput.includes('ransomware') || lowerInput.includes('locked') || lowerInput.includes('encrypt')) {
      classification = 'Active Ransomware Propagation / Cryptolocker Event';
      riskScore = 98;
      confidence = 96;
      recommendation = 'IMMEDIATE NETWORK ISOLATION REQUIRED. Shut down the target server (PROD-DB-SERVER-01) network ports. Audit storage volumes, snapshot immediately, and block the external payload source IP 185.220.101.5 on the corporate firewall.';
      findings = [
        'High-velocity file extension mutation matching LockBit 3.0 encryption behavior.',
        'Affected target node contains critical relational database files (MySQL).',
        'Outbound connection attempts to known ransomware C2 command server.'
      ];
    } else if (lowerInput.includes('sql') || lowerInput.includes('union select') || lowerInput.includes('1=1')) {
      classification = 'SQL Injection (SQLi) Web exploit attempt';
      riskScore = 88;
      confidence = 94;
      recommendation = 'Blacklist source IP 45.143.203.12 immediately on the Cloudflare Web Application Firewall (WAF). Review application auth code logs, apply Parameterized Prepared Statements to user query endpoints, and enforce strict input sanitization schemas.';
      findings = [
        'Vulnerability exploitation target located in login authentication route.',
        'Exploit payload attempts to bypass authentication checks by short-circuiting database queries (\' OR 1=1).',
        'Database responses indicate query errors, suggesting payload validation occurred but backend security failed to block.'
      ];
    } else if (lowerInput.includes('ssh') || lowerInput.includes('brute force') || lowerInput.includes('failed password')) {
      classification = 'SSH Brute-Force Authentication Scanning';
      riskScore = 65;
      confidence = 91;
      recommendation = 'Restrict SSH access exclusively to verified admin VPN subnets. Enable SSH Key authentication only and disable passwords. Configure fail2ban to lock out IPs after 3 consecutive login failures.';
      findings = [
        'Distributed scanning activity targeting standard listening port 22.',
        '148 failed authentication credentials matching common default administrative user dictionaries (admin, root, support).',
        'Attack source IP originates from an unverified public cloud proxy provider block.'
      ];
    } else if (lowerInput.includes('exfil') || lowerInput.includes('anomaly') || lowerInput.includes('gb') || lowerInput.includes('bytes')) {
      classification = 'Egress Data Exfiltration Anomaly';
      riskScore = 92;
      confidence = 92;
      recommendation = 'Revoke credentials and security tokens of the user session (hr_backup_svc) immediately. Block all traffic going to host 104.244.74.33 on core gateway routers. Audit the HR File Share file system access logs to determine compromised record namespaces.';
      findings = [
        'Highly anomalous outbound network payload (4.21 GB) compared to historical baseline averages for this server.',
        'Egress transfer matches high-severity target addresses located in atypical hosting regions.',
        'Triggered by an automation credential outside typical backup maintenance window.'
      ];
    }

    setResult({
      classification,
      riskScore,
      confidence,
      recommendation,
      findings
    });
    setAnalyzing(false);
    showToast('AI Security Analysis complete.', 'success');
  };

  const handleLoadTemplate = (key) => {
    setLogInput(templates[key].log);
    showToast(`Loaded ${templates[key].label} template`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">AI Security Assistant</h1>
        <p className="text-sm text-slate-400">Leverage advanced generative AI to analyze logs, trace security anomalies, and receive instant remediation instructions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input panel */}
        <div className="glass-panel p-6 lg:col-span-2 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-lavender-400" />
              Input Threat Logs / Payload
            </h3>
            
            {/* Quick Templates */}
            <div className="flex gap-2">
              <span className="text-xs text-slate-500 self-center hidden sm:inline">Load Sample:</span>
              {Object.keys(templates).map((key) => (
                <button
                  key={key}
                  onClick={() => handleLoadTemplate(key)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-navy-800 hover:bg-navy-700 border border-navy-700/50 text-slate-300 hover:text-white transition-colors"
                >
                  {key.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col relative">
            <textarea
              className="w-full h-80 bg-navy-950/60 border border-navy-700/50 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-lavender-500/50 focus:border-lavender-500/50 transition-all resize-none leading-relaxed"
              placeholder="Paste raw log lines, vulnerability scanner reports, network traffic summaries, or alert dumps here..."
              value={logInput}
              onChange={(e) => setLogInput(e.target.value)}
              disabled={analyzing}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              Tips: Use realistic JSON, syslog format, or structured logs for best results.
            </div>
            
            <button
              onClick={handleRunAnalysis}
              disabled={analyzing}
              className="primary-button px-6 py-2.5 text-sm flex items-center gap-2 disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4" />
                  Run AI Analysis
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Panel / Loading Panel */}
        <div className="glass-panel p-6 flex flex-col justify-between min-h-[450px]">
          {analyzing ? (
            /* Loading State */
            <div className="flex flex-col items-center justify-center h-full my-auto text-center gap-5">
              <div className="w-16 h-16 rounded-full bg-lavender-500/10 border border-lavender-500/30 flex items-center justify-center relative shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                <Cpu className="w-8 h-8 text-lavender-400 animate-pulse" />
                <div className="absolute inset-0 border-2 border-dashed border-lavender-400/50 rounded-full animate-spin" />
              </div>
              <div>
                <h4 className="text-md font-semibold text-white">AI Security Engine Active</h4>
                <p className="text-xs text-slate-500 mt-2 font-mono h-4">{loadingStatuses[loadingStep]}</p>
              </div>
            </div>
          ) : result ? (
            /* Analysis Results */
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-navy-700/50 pb-4">
                  <Cpu className="w-5 h-5 text-lavender-400" />
                  <h3 className="text-md font-semibold text-white">AI Threat Report</h3>
                </div>

                <div className="space-y-4">
                  {/* Classification */}
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Threat Classification</span>
                    <span className="text-sm font-semibold text-slate-200">{result.classification}</span>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-navy-950/40 border border-navy-700/30 rounded-xl">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Risk Score</span>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-xl font-bold ${
                          result.riskScore >= 90 ? 'text-red-400' :
                          result.riskScore >= 70 ? 'text-orange-400' : 'text-yellow-400'
                        }`}>{result.riskScore}</span>
                        <span className="text-xs text-slate-500">/ 100</span>
                      </div>
                      {/* Risk bar */}
                      <div className="w-full bg-navy-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            result.riskScore >= 90 ? 'bg-red-500' :
                            result.riskScore >= 70 ? 'bg-orange-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${result.riskScore}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="p-3 bg-navy-950/40 border border-navy-700/30 rounded-xl">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">AI Confidence</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-cyan-400">{result.confidence}%</span>
                      </div>
                      <div className="w-full bg-navy-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div 
                          className="h-full bg-cyan-400 rounded-full"
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Findings */}
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Key Findings</span>
                    <ul className="space-y-1.5">
                      {result.findings.map((finding, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <span className="text-lavender-400 font-bold mt-0.5">•</span>
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div className="pt-2">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Recommended Remediation
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10">
                      {result.recommendation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-navy-700/50 mt-4 text-center">
                <span className="text-[10px] text-slate-500">Security intelligence report compiled in sandbox env.</span>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center h-full my-auto text-center p-6">
              <div className="w-14 h-14 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center mb-4 text-slate-500">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-300">Ready for Analysis</h4>
              <p className="text-xs text-slate-500 mt-2 max-w-[200px] mx-auto leading-relaxed">
                Provide threat payload or select a quick template on the left to start security evaluation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
