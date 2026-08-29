const PlaceholderPage = ({ title, description }) => (
  <div className="flex flex-col items-center justify-center h-[70vh] text-center">
    <div className="w-24 h-24 bg-lavender-500/10 rounded-full flex items-center justify-center mb-6 border border-lavender-500/20 shadow-[0_0_30px_rgba(139,92,246,0.15)] relative">
      <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl mix-blend-screen" />
      <div className="w-12 h-12 rounded-full border-2 border-dashed border-lavender-400 animate-[spin_10s_linear_infinite]" />
    </div>
    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lavender-400 to-cyan-400 mb-4">{title}</h1>
    <p className="text-slate-400 max-w-md">{description}</p>
    <button className="mt-8 secondary-button px-6 py-2">Explore Features</button>
  </div>
);

export const Threats = () => <PlaceholderPage title="Threat Intelligence" description="Monitor and filter real-time security threats with advanced AI categorization and severity scoring." />;
export const AIAnalysis = () => <PlaceholderPage title="AI Security Analyst" description="Interact with our advanced AI to analyze code snippets, investigate anomalies, and generate mitigation strategies." />;
export const Security = () => <PlaceholderPage title="Security Posture" description="Detailed breakdown of your current security score, vulnerabilities, and recommended actions." />;
export const Reports = () => <PlaceholderPage title="Compliance & Reports" description="Generate automated security reports for compliance audits and executive summaries." />;
export const Activity = () => <PlaceholderPage title="Activity Timeline" description="Comprehensive audit log of all system activities, logins, and configuration changes." />;
export const Settings = () => <PlaceholderPage title="System Settings" description="Configure notifications, API keys, user roles, and system preferences." />;
