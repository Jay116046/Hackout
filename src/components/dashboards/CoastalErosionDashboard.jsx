import ErosionDashboard from "./ErosionDashboard";

const glassCard = (darkMode = false, extra = "") =>
  `backdrop-blur-lg bg-white/40 ${darkMode ? 'bg-gradient-to-br from-gray-800/60 to-gray-900/80 border-gray-700 text-yellow-100' : 'bg-gradient-to-br from-blue-100/60 to-white/80 border-blue-200 text-blue-900'} shadow-xl border rounded-xl ${extra}`;

export default function CoastalErosionDashboard({ darkMode = true }) {
  return (
    <div>
      <h2 className={darkMode ? 'text-2xl font-bold text-yellow-100 mb-6' : 'text-2xl font-bold text-coastal-700 mb-6'}>Coastal Erosion Dashboard</h2>
      <ErosionDashboard />
    </div>
  );
}
