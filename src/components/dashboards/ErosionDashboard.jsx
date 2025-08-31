import React from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import './ErosionDashboard.css'; // Import custom styles

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// --- Data Generation Functions (moved outside the component for clarity) ---

function generateErosionData() {
  const dates = [];
  const erosionRates = [];
  const predictions = [];
  const confidenceUpper = [];
  const confidenceLower = [];
  const historicalDataCutoff = 365; // 1 year ago

  // Data for the past 2 years (730 days)
  for (let i = 730; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);

    if (i > historicalDataCutoff) {
      // Historical data points
      const val = Math.random() * 0.5 + 0.2 + Math.sin(i / 50) * 0.1;
      erosionRates.push(val);
      predictions.push(null);
      confidenceUpper.push(null);
      confidenceLower.push(null);
    } else {
      // Add a null to historical data to create a gap before prediction starts
      if (i === historicalDataCutoff) {
        erosionRates.push(erosionRates[erosionRates.length - 1] || 0.5);
      } else {
        erosionRates.push(null);
      }

      // Predicted data points for the next year
      const trend = 0.3 + Math.sin(i / 40) * 0.15 + (historicalDataCutoff - i) * 0.0003;
      predictions.push(trend);
      confidenceUpper.push(trend + Math.random() * 0.1 + 0.05);
      confidenceLower.push(Math.max(0, trend - Math.random() * 0.1 - 0.05));
    }
  }
  return { dates, erosionRates, predictions, confidenceUpper, confidenceLower };
}

function generateEnvironmentalData() {
  const dates = [];
  const waveHeight = [];
  const tideLevel = [];
  const ndwi = [];
  const mndwi = [];

  for (let i = 90; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);

    waveHeight.push(Math.random() * 2 + 1 + Math.sin(i / 10) * 0.5);
    tideLevel.push(Math.random() * 1.5 + 0.5 + Math.cos(i / 15) * 0.3);
    ndwi.push(Math.random() * 0.4 + 0.6 + Math.sin(i / 20) * 0.1);
    mndwi.push(Math.random() * 0.3 + 0.4 + Math.cos(i / 25) * 0.1);
  }
  return { dates, waveHeight, tideLevel, ndwi, mndwi };
}

// --- Chart Configurations ---

const erosionData = generateErosionData();
const erosionChartData = {
  labels: erosionData.dates,
  datasets: [
    {
      label: 'Historical Erosion Rate',
      data: erosionData.erosionRates,
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      pointRadius: 0,
    },
    {
      label: 'Predicted Erosion Rate',
      data: erosionData.predictions,
      borderColor: '#ef4444',
      borderDash: [5, 5],
      tension: 0.4,
      pointRadius: 0,
    },
    {
      label: 'Confidence Interval',
      data: erosionData.confidenceUpper,
      borderColor: 'transparent',
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      fill: '+1', // Fill to the next dataset (index-wise)
      pointRadius: 0,
    },
    {
      label: 'Confidence Lower Bound',
      data: erosionData.confidenceLower,
      borderColor: 'transparent',
      fill: false,
      pointRadius: 0,
    },
  ],
};

const erosionChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { title: { display: true, text: 'Erosion Rate (m/year)' } },
    x: { title: { display: true, text: 'Date' } },
  },
};

const envData = generateEnvironmentalData();
const environmentalChartData = {
  labels: envData.dates,
  datasets: [
    {
      label: 'Wave Height (m)',
      data: envData.waveHeight,
      borderColor: '#06b6d4',
      yAxisID: 'y',
    },
    {
      label: 'Tide Level (m)',
      data: envData.tideLevel,
      borderColor: '#8b5cf6',
      yAxisID: 'y',
    },
    {
      label: 'NDWI',
      data: envData.ndwi,
      borderColor: '#10b981',
      yAxisID: 'y1',
    },
    {
      label: 'MNDWI',
      data: envData.mndwi,
      borderColor: '#f59e0b',
      yAxisID: 'y1',
    },
  ],
};

const environmentalChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      title: { display: true, text: 'Physical Measurements (m)' },
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      title: { display: true, text: 'Water Indices' },
      grid: { drawOnChartArea: false },
    },
  },
};


// --- React Component ---

const ErosionDashboard = () => {
  return (
    <div className="dashboard-body">
      <div className="header">
        <h1>🌊 Coastal Erosion Monitoring System</h1>
      </div>
      
      <img className="ig" src="\src\assets\example.gif" alt="Coastal erosion example" />

      <div className="dashboard-grid">
        <div className="chart-container large-chart">
          <div className="chart-title">📈 Erosion Rate Predictions & Historical Data</div>
          <div className="chart-wrapper">
            <Line options={erosionChartOptions} data={erosionChartData} />
          </div>
          <div className="legend-custom">
            <div className="legend-item">
              <div className="legend-color" style={{ background: '#3b82f6' }}></div>
              <span>Historical Data</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: '#ef4444' }}></div>
              <span>Predicted Erosion</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: 'rgba(239, 68, 68, 0.2)' }}></div>
              <span>Confidence Interval</span>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-title">🌍 Environmental Driving Factors</div>
          <div className="chart-wrapper">
            <Line options={environmentalChartOptions} data={environmentalChartData} />
          </div>
        </div>
      </div>

      <div className="stats-panel">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">2.3m</div>
            <div className="stat-label">Avg Annual Erosion</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">15.7km</div>
            <div className="stat-label">Coastline Monitored</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">89%</div>
            <div className="stat-label">Model Accuracy</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">0.85</div>
            <div className="stat-label">Current NDWI</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErosionDashboard;