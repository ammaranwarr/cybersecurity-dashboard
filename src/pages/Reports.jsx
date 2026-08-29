import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, Legend } from 'recharts';
import { FileText, Download, Eye, Shield, Calendar, AlertTriangle, CheckCircle, BarChart3, X, FileSpreadsheet } from 'lucide-react';
import { useToast } from '../context/ToastContext';

// Chart Data Sets
const trendData = [
  { date: 'Mon', threats: 15 },
  { date: 'Tue', threats: 24 },
  { date: 'Wed', threats: 18 },
  { date: 'Thu', threats: 32 },
  { date: 'Fri', threats: 28 },
  { date: 'Sat', threats: 12 },
  { date: 'Sun', threats: 9 }
];

const distributionData = [
  { name: 'Ransomware', value: 15, color: '#f87171' },     // red
  { name: 'SQL Injection', value: 30, color: '#fb923c' },  // orange
  { name: 'SSH Brute Force', value: 40, color: '#facc15' }, // yellow
  { name: 'Phishing', value: 25, color: '#38bdf8' },        // cyan
  { name: 'DDoS', value: 10, color: '#8b5cf6' }             // lavender
];

const scoreData = [
  { week: 'Wk 1', score: 85 },
  { week: 'Wk 2', score: 88 },
  { week: 'Wk 3', score: 89 },
  { week: 'Wk 4', score: 92 },
  { week: 'Wk 5', score: 94 },
  { week: 'Wk 6', score: 95 }
];

const Reports = () => {
  const { showToast } = useToast();
  const [selectedReport, setSelectedReport] = useState(null);

  const handleDownloadCSV = (reportType) => {
    // Generate simple CSV content
    const csvRows = [
      ['Nexus AI Security Report Summary'],
      ['Report Type', reportType],
      ['Generated Date', new Date().toLocaleString()],
      [],
      ['Overall Performance Metrics'],
      ['Security Posture Score', '94/100'],
      ['Total Scanned Assets', '12408'],
      ['Active Vulnerabilities', '4'],
      ['Resolved Vulnerabilities', '48'],
      [],
      ['Category Posture Scores'],
      ['Network Security', '92%'],
      ['Identity Security', '88%'],
      ['Application Security', '95%'],
      ['Data Security', '90%'],
      [],
      ['Recent Critical Threat Alerts'],
      ['ID', 'Threat Name', 'Type', 'Severity', 'Target Host', 'Status'],
      ['TR-8921', 'Suspicious Ransomware Activity', 'Ransomware', 'Critical', 'PROD-DB-SERVER-01', 'Active'],
      ['TR-8922', 'SQL Injection Exploitation Attempt', 'Web Attack', 'High', 'CUSTOMER-PORTAL-WEB-04', 'Investigating'],
      ['TR-8925', 'Outbound Data Exfiltration Anomaly', 'Data Leak', 'Critical', 'SECURE-FILE-SHARE-02', 'Active']
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' 
      + csvRows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(',')).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${reportType.toLowerCase().replace(/\s+/g, '_')}_security_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(`${reportType} CSV download initiated.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Compliance & Reports</h1>
        <p className="text-sm text-slate-400">Generate executive security briefings, audit compliance documentation, and track historical trends.</p>
      </div>

      {/* Available Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Report */}
        <div className="glass-panel p-6 flex flex-col md:flex-row gap-5 justify-between items-start md:items-center relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-lavender-500/5 rounded-full blur-xl" />
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-lavender-500/10 border border-lavender-500/30 flex items-center justify-center flex-shrink-0 text-lavender-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-md font-semibold text-slate-200">Weekly Executive Security Report</h3>
              <p className="text-xs text-slate-500 mt-0.5">Aggregated audit of active host scans, vulnerabilities patched, and core firewall trends.</p>
              <div className="flex gap-4 mt-2.5 text-[11px] text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Aug 22 - Aug 28</span>
                <span className="flex items-center gap-1 font-semibold text-emerald-400"><CheckCircle className="w-3.5 h-3.5" /> ISO 27001 Compliant</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setSelectedReport({ type: 'Weekly Security Report', date: 'Aug 22 - Aug 28' })}
              className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold secondary-button flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              View
            </button>
            <button
              onClick={() => handleDownloadCSV('Weekly Security Report')}
              className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold primary-button flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Download CSV
            </button>
          </div>
        </div>

        {/* Monthly Report */}
        <div className="glass-panel p-6 flex flex-col md:flex-row gap-5 justify-between items-start md:items-center relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl" />
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-md font-semibold text-slate-200">Monthly Audit Compliance Briefing</h3>
              <p className="text-xs text-slate-500 mt-0.5">Comprehensive audit log compilation, policy enforcement checks, and long-term trends.</p>
              <div className="flex gap-4 mt-2.5 text-[11px] text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> August 1 - August 28</span>
                <span className="flex items-center gap-1 font-semibold text-cyan-400"><Shield className="w-3.5 h-3.5" /> SOC 2 Audited</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setSelectedReport({ type: 'Monthly Audit Compliance Briefing', date: 'August 1 - August 28' })}
              className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold secondary-button flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              View
            </button>
            <button
              onClick={() => handleDownloadCSV('Monthly Audit Compliance Briefing')}
              className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold primary-button flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Download CSV
            </button>
          </div>
        </div>
      </div>

      {/* Recharts Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart */}
        <div className="glass-panel p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-lavender-400" />
            Threat Incident Trends
          </h3>
          <div className="h-[250px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReportThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b1121', borderColor: '#1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="threats" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorReportThreats)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attack Distribution Pie Chart */}
        <div className="glass-panel p-6 flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            Attack Vector Distribution
          </h3>
          
          <div className="h-[180px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b1121', borderColor: '#1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] text-slate-400 font-medium pt-4 border-t border-navy-700/50">
            {distributionData.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: entry.color }} />
                <span className="truncate">{entry.name} ({entry.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Score History */}
        <div className="glass-panel p-6 lg:col-span-3">
          <h3 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Security Posture Score History
          </h3>
          <div className="h-[200px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="week" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" domain={[70, 100]} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b1121', borderColor: '#1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Line type="monotone" dataKey="score" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, stroke: '#38bdf8', strokeWidth: 2, fill: '#0b1121' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* View Report Briefing Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setSelectedReport(null)} className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />
          
          <div className="relative w-full max-w-2xl bg-navy-900/95 border border-navy-700/80 rounded-2xl shadow-2xl p-6 overflow-hidden md:max-h-[90vh] flex flex-col z-10 animate-[scaleIn_0.2s_ease-out]">
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-lavender-500/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-navy-700/50 pb-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-lavender-500/10 border border-lavender-500/30 text-lavender-400 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedReport.type}</h3>
                  <p className="text-xs text-slate-500">Briefing Window: {selectedReport.date}</p>
                </div>
              </div>
              <button onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Table / Summaries */}
            <div className="flex-1 overflow-y-auto space-y-5 pr-1 text-sm text-slate-300">
              <div className="p-4 bg-navy-950/40 rounded-xl border border-navy-700/30 space-y-3">
                <h4 className="font-semibold text-slate-200">1. Executive Summary</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  During this reporting period, Nexus AI security scanners evaluated a total of 12,408 assets. The overall posture security score is established at <strong>94/100</strong>, indicating minor vulnerabilities in identity management and SSH restrictions.
                </p>
              </div>

              {/* Stat summary table */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-200">2. Performance Breakdown</h4>
                <div className="overflow-hidden border border-navy-700/50 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-navy-950/50 border-b border-navy-700/50 font-semibold text-slate-400">
                        <th className="p-3">Category</th>
                        <th className="p-3">Score</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Remediation Rules Enforced</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-700/30">
                      <tr>
                        <td className="p-3 font-medium">Network Security</td>
                        <td className="p-3">92%</td>
                        <td className="p-3 text-emerald-400">Secure</td>
                        <td className="p-3">12 / 13</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Identity Security</td>
                        <td className="p-3">88%</td>
                        <td className="p-3 text-amber-400 font-semibold">Attention Req.</td>
                        <td className="p-3">9 / 11</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Application Security</td>
                        <td className="p-3">95%</td>
                        <td className="p-3 text-emerald-400">Secure</td>
                        <td className="p-3">18 / 18</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Data Security</td>
                        <td className="p-3">90%</td>
                        <td className="p-3 text-emerald-400">Secure</td>
                        <td className="p-3">8 / 9</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Incidents Table */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-200">3. Flagged Incidents Summary</h4>
                <div className="overflow-hidden border border-navy-700/50 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-navy-950/50 border-b border-navy-700/50 font-semibold text-slate-400">
                        <th className="p-3">ID</th>
                        <th className="p-3">Event Name</th>
                        <th className="p-3">Severity</th>
                        <th className="p-3">Target Node</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-700/30 font-mono">
                      <tr>
                        <td className="p-3">TR-8921</td>
                        <td className="p-3 font-sans">Suspicious Ransomware Activity</td>
                        <td className="p-3 text-red-400">Critical</td>
                        <td className="p-3">PROD-DB-01</td>
                        <td className="p-3 font-sans text-red-400 animate-pulse">Active</td>
                      </tr>
                      <tr>
                        <td className="p-3">TR-8922</td>
                        <td className="p-3 font-sans">SQL Injection Attack</td>
                        <td className="p-3 text-orange-400">High</td>
                        <td className="p-3">CUSTOMER-WEB-04</td>
                        <td className="p-3 font-sans text-amber-400">Investigating</td>
                      </tr>
                      <tr>
                        <td className="p-3">TR-8925</td>
                        <td className="p-3 font-sans">Egress Data Exfiltration</td>
                        <td className="p-3 text-red-400">Critical</td>
                        <td className="p-3">FILE-SHARE-02</td>
                        <td className="p-3 font-sans text-red-400 animate-pulse">Active</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-navy-700/50 pt-4 mt-4 flex justify-between items-center">
              <span className="text-[10px] text-slate-500">System verified document code: SH-481-992</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleDownloadCSV(selectedReport.type);
                    setSelectedReport(null);
                  }}
                  className="primary-button px-4 py-2 text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CSV
                </button>
                <button
                  onClick={() => setSelectedReport(null)}
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

export default Reports;
