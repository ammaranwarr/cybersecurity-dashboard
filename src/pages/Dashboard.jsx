import { ShieldAlert, ShieldCheck, Activity, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '00:00', threats: 12 },
  { name: '04:00', threats: 19 },
  { name: '08:00', threats: 15 },
  { name: '12:00', threats: 45 },
  { name: '16:00', threats: 32 },
  { name: '20:00', threats: 28 },
  { name: '24:00', threats: 20 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
  <div className="glass-panel p-6 relative overflow-hidden group">
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-lavender-500/10 rounded-full blur-2xl group-hover:bg-lavender-500/20 transition-all" />
    <div className="flex items-start justify-between mb-4 relative z-10">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
      <div className="w-10 h-10 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center">
        <Icon className="w-5 h-5 text-lavender-400" />
      </div>
    </div>
    <div className="flex items-center gap-2 relative z-10">
      <span className={`text-xs font-medium px-2 py-1 rounded-md ${trend === 'up' ? 'text-red-400 bg-red-500/10' : 'text-green-400 bg-green-500/10'}`}>
        {trendValue}
      </span>
      <span className="text-xs text-slate-500">vs last 24h</span>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Overview</h1>
          <p className="text-sm text-slate-400">Monitor your security posture in real-time.</p>
        </div>
        <div className="flex gap-3">
          <button className="secondary-button px-4 py-2 text-sm">Download Report</button>
          <button className="primary-button px-4 py-2 text-sm">Scan Now</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Threats" value="2,845" icon={ShieldAlert} trend="down" trendValue="-12%" />
        <StatCard title="Security Score" value="94/100" icon={ShieldCheck} trend="up" trendValue="+2%" />
        <StatCard title="Active Scans" value="24" icon={Activity} trend="up" trendValue="+4" />
        <StatCard title="Protected Users" value="1,204" icon={Users} trend="up" trendValue="+18" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 lg:col-span-2">
          <h3 className="text-lg font-medium text-white mb-6">Threat Activity Timeline</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b1121', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="threats" stroke="#a78bfa" strokeWidth={2} fillOpacity={1} fill="url(#colorThreats)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-panel p-6">
          <h3 className="text-lg font-medium text-white mb-6">Recent Alerts</h3>
          <div className="space-y-4">
            {[
              { id: 1, title: 'Suspicious Login Attempt', time: '10 mins ago', severity: 'High' },
              { id: 2, title: 'Port Scan Detected', time: '1 hour ago', severity: 'Medium' },
              { id: 3, title: 'Malware Signature Match', time: '2 hours ago', severity: 'Critical' },
              { id: 4, title: 'Unusual Data Transfer', time: '5 hours ago', severity: 'Low' },
            ].map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-navy-800/50 transition-colors border border-transparent hover:border-navy-700/50">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                  alert.severity === 'Critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                  alert.severity === 'High' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' :
                  alert.severity === 'Medium' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' :
                  'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                }`} />
                <div>
                  <h4 className="text-sm font-medium text-slate-200">{alert.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
