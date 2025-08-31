import React, { useState, useEffect, useRef } from 'react';
import './StormData.css';
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
  Filler, // Important for uncertainty band
} from 'chart.js';

// Register Chart.js components
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







// --- Configuration ---
const WEBSOCKET_URL = 'wss://welcometofightclub-hackout-server.hf.space/ws/surge';
const API_REQUEST = {
  action: "stream", // or "get_dashboard" for a single fetch
  stations: ["Harbor_A", "Estuary_B", "OpenCoast_C"],
  interval: 5.0 // Seconds between updates (for "stream" mode)
};

// --- Main Dashboard Component ---
const SurgeDashboard = () => {
  const [apiData, setApiData] = useState(null);
  const [status, setStatus] = useState('Connecting...');
  const ws = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket(WEBSOCKET_URL);

    ws.current.onopen = () => {
      setStatus('🟢 Connected');
      console.log('WebSocket Connected');
      ws.current.send(JSON.stringify(API_REQUEST));
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.error) {
          console.error('API Error:', data.error);
          setStatus(`🔴 Error: ${data.error}`);
        } else {
          setApiData(data);
        }
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
      setStatus('🔴 Error');
    };

    ws.current.onclose = () => {
      console.log('WebSocket Disconnected');
      setStatus('🔴 Disconnected');
    };

    // Cleanup on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Helper to format time labels ---
  const formatTime = (isoString) => new Date(isoString).toLocaleTimeString();

  // --- Loading and Error States ---
  if (!apiData) {
    return (
      <div className="surge-dashboard-container">
        <h1 className="surge-dashboard-header">SurgeNN Real-time Dashboard</h1>
        <p className="surge-dashboard-status">Status: {status}</p>
        <p>Awaiting data from the server...</p>
      </div>
    );
  }

  // --- Data Preparation for Charts ---
  // We'll prepare data for the first station in the list for single-station charts.
  const primaryStationName = apiData.stations[0];
  const stationData = apiData.station_graphs[primaryStationName];

  // 1. Surge Curve Data
  const surgeCurveChartData = {
    labels: stationData.surge_curve.data.map(p => formatTime(p.time)),
    datasets: [
      {
        label: 'Observed',
        data: stationData.surge_curve.data.map(p => p.observed),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Predicted',
        data: stationData.surge_curve.data.map(p => p.predicted),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderDash: [5, 5],
      },
    ],
  };

  // 2. Tide Overlay Data
  const tideOverlayChartData = {
    labels: stationData.tide_overlay.data.map(p => formatTime(p.time)),
    datasets: [
      {
        label: 'Tide',
        data: stationData.tide_overlay.data.map(p => p.tide),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Surge',
        data: stationData.tide_overlay.data.map(p => p.surge),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
      },
    ],
  };

  // 3. Uncertainty Band Data
  const uncertaintyBandChartData = {
    labels: stationData.uncertainty_band.data.map(p => formatTime(p.time)),
    datasets: [
      {
        label: 'Mean Forecast',
        data: stationData.uncertainty_band.data.map(p => p.mean),
        borderColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Uncertainty Band',
        data: stationData.uncertainty_band.data.map(p => p.upper),
        fill: '+1', // Fill to the next dataset in the list (the 'lower' one)
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'transparent',
        pointRadius: 0,
      },
      {
        label: 'Lower Bound', // Not shown in legend
        data: stationData.uncertainty_band.data.map(p => p.lower),
        borderColor: 'transparent',
        pointRadius: 0,
      },
    ],
  };

  // 4. Multi-Station Comparison Data
  const stationColors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)'];
  const multiStationChartData = {
    labels: apiData.multi_station.data.map(p => formatTime(p.time)),
    datasets: apiData.stations.map((stationName, index) => ({
      label: stationName,
      data: apiData.multi_station.data.map(p => p[stationName]),
      borderColor: stationColors[index % stationColors.length],
      tension: 0.1
    }))
  };

  return (
    <div className="surge-dashboard-container">
      <h1 className="surge-dashboard-header">SurgeNN Real-time Dashboard</h1>
      <p className="surge-dashboard-status">Status: {status} | Last Updated: {new Date(apiData.generated_at).toLocaleString()}</p>

      {/* --- Grid for Visualizations --- */}
      <div className="surge-dashboard-grid">

        {/* 5. Alert Status */}
        <div className="surge-dashboard-card">
          <h2 className="surge-dashboard-card-title">Alert Status</h2>
          <div className="surge-dashboard-alert-container">
            {apiData.alert_status.stations.map(station => (
              <div key={station.name} className={`surge-dashboard-alert-box surge-dashboard-alert-${station.alert.toLowerCase()}`}>
                <span className="surge-dashboard-alert-station-name">{station.name}</span>
                <span className="surge-dashboard-alert-level">{station.alert}</span>
                <span className="surge-dashboard-alert-value">{station.value.toFixed(2)}m</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Model Metrics */}
        <div className="surge-dashboard-card">
          <h2 className="surge-dashboard-card-title">Model Metrics</h2>
          <table className="surge-dashboard-table">
            <thead>
              <tr>
                <th className="surge-dashboard-th">Station</th>
                <th className="surge-dashboard-th">RMSE</th>
                <th className="surge-dashboard-th">MAE</th>
                <th className="surge-dashboard-th">R²</th>
              </tr>
            </thead>
            <tbody>
              {apiData.model_metrics.data.map(metric => (
                <tr key={metric.station}>
                  <td className="surge-dashboard-td">{metric.station}</td>
                  <td className="surge-dashboard-td">{metric.rmse.toFixed(2)}</td>
                  <td className="surge-dashboard-td">{metric.mae.toFixed(2)}</td>
                  <td className="surge-dashboard-td">{metric.r2.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 1. Surge Curve */}
        <div className="surge-dashboard-card">
          <h2 className="surge-dashboard-card-title">Surge Curve ({primaryStationName})</h2>
          <div className="surge-dashboard-chart">
            <Line options={{ responsive: true, maintainAspectRatio: false }} data={surgeCurveChartData} />
          </div>
        </div>

         {/* 2. Tide Overlay  */}
        <div className="surge-dashboard-card">
          <h2 className="surge-dashboard-card-title">Tide vs Surge ({primaryStationName})</h2>
          <div className="surge-dashboard-chart">
            <Line options={{ responsive: true, maintainAspectRatio: false }} data={tideOverlayChartData} />
          </div>
        </div>

        {/* 3. Uncertainty Band */}
        <div className="surge-dashboard-card">
          <h2 className="surge-dashboard-card-title">Forecast Uncertainty ({primaryStationName})</h2>
          <div className="surge-dashboard-chart">
            <Line options={{ responsive: true, maintainAspectRatio: false, scales: { y: { stacked: false } } }} data={uncertaintyBandChartData} />
          </div>
        </div>

        {/* 4. Multi-Station Comparison */}
        <div className="surge-dashboard-card">
          <h2 className="surge-dashboard-card-title">Multi-Station Comparison</h2>
          <div className="surge-dashboard-chart">
            <Line options={{ responsive: true, maintainAspectRatio: false }} data={multiStationChartData} />
          </div>
        </div>

      </div>
    </div>
  );
};


export default SurgeDashboard;