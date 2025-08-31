import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import StormSurgeDashboard from './dashboards/StormSurgeDashboard';
import CoastalErosionDashboard from './dashboards/CoastalErosionDashboard';
import MarinePollutionDashboard from './dashboards/MarinePollutionDashboard';
import IllegalActivityDashboard from './dashboards/IllegalActivityDashboard';
import { Waves, Activity, Droplets, ShieldAlert } from 'lucide-react';

const dashboards = [
  {
    id: 'storm-surge',
    name: 'Storm Surge Prediction',
    icon: <Waves className="w-6 h-6 mr-2" />,
    component: StormSurgeDashboard,
  },
  {
    id: 'coastal-erosion',
    name: 'Coastal Erosion Detection',
    icon: <Activity className="w-6 h-6 mr-2" />,
    component: CoastalErosionDashboard,
  },
  {
    id: 'marine-pollution',
    name: 'Marine Pollution',
    icon: <Droplets className="w-6 h-6 mr-2" />,
    component: MarinePollutionDashboard,
  },
  {
    id: 'illegal-activity',
    name: 'Illegal Activity Detection',
    icon: <ShieldAlert className="w-6 h-6 mr-2" />,
    component: IllegalActivityDashboard,
  },
];

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [selected, setSelected] = useState(dashboards[0].id);
  const { darkMode, toggleDarkMode } = useTheme();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const selectedDashboard = dashboards.find((d) => d.id === selected);
  const DashboardComponent = selectedDashboard.component;

  return (
    <div className={darkMode ? "flex h-screen bg-gray-950 text-gray-100" : "flex h-screen bg-gray-50 text-gray-900"}>
      <aside className={darkMode ? "w-72 bg-gray-900 border-r border-gray-800 p-6 flex flex-col" : "w-72 bg-white border-r border-gray-200 p-6 flex flex-col"}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-tight">EnviroMaritime Monitor</h1>
          <button
            onClick={toggleDarkMode}
            className={darkMode ? "px-2 py-1 rounded bg-gray-800 text-yellow-300" : "px-2 py-1 rounded bg-gray-200 text-gray-700"}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
        <nav className="flex-1 space-y-3">
          {dashboards.map((d, idx) => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg font-semibold focus:outline-none transition-colors duration-200 ${selected === d.id
                ? (darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-blue-100 ')
                : (darkMode ? 'hover:bg-gray-800 text-gray-100' : 'hover:bg-blue-50 text-black')}`}
            >
              {d.icon}
              <span>{d.name}</span>
            </button>
          ))}
        </nav>
        <footer className="mt-8 text-xs text-gray-400 text-center">
          &copy; 2025 EnviroMaritime Monitor
        </footer>
      </aside>
      <main className="flex-1 overflow-auto p-8 flex flex-col">
        {/* Navbar with user info */}
        <nav className="flex items-center justify-end mb-6">
          <div className="flex items-center space-x-3 bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
            <span className="font-semibold text-gray-700 dark:text-gray-200">{(useAuth().user?.displayName || useAuth().user?.email) ?? "User"}</span>
            <img src={useAuth().user?.photoURL || 'https://ui-avatars.com/api/?name=User'} alt="User Icon" className="w-8 h-8 rounded-full border" />
          </div>
        </nav>
        <header className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight">{selectedDashboard.name}</h2>
        </header>
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className={darkMode ? "bg-gray-900 text-gray-100 rounded-xl shadow-xl p-6" : "bg-white text-gray-900 rounded-xl shadow-xl p-6"}
          >
            <DashboardComponent darkMode={darkMode} />
          </motion.div>
        </AnimatePresence>
        <footer className="mt-8 text-xs text-gray-400 text-center">
          Data is simulated for demo purposes.
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
