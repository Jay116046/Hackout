// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler
// } from 'chart.js';
// import { SurgeCurveChart, TideOverlayChart, UncertaintyBandChart, MultiStationChart, AlertStatusChart, ModelMetricsChart } from '../StormData';
// import React, { useState, useEffect } from 'react';
// // Register all the necessary components from Chart.js
// ChartJS.register(
//   CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler
// );


// // // ...existing code for dummy data, D3 chart, and Mapbox map...
// // export default function StormSurgeDashboard({ darkMode }) {
// //   // ...implement as per requirements...
// //   return (
// //     <>
// //       <h2 className={darkMode ? 'text-2xl font-bold text-yellow-100 mb-6 m-auto' : 'text-2xl font-bold text-coastal-700 mb-6 m-auto'} >Coastal Erosion Dashboard</h2>

// //       {/* <main className="dashboard-grid space-y-3">
// //        <div className='flex flex-wrap justify-evenly'>
// //          <SurgeCurveChart />
// //         <TideOverlayChart />
// //         <UncertaintyBandChart />
// //         <MultiStationChart />
// //        </div>
// //         <AlertStatusChart />
// //         <ModelMetricsChart />
// //       </main> */}

// //       </>
// //   );
// // }




// const SurgeNNClient = () => {
//   const [data, setData] = useState(null);
//   const [connected, setConnected] = useState(false);

//   useEffect(() => {
//     const ws = new WebSocket('wss://welcometofightclub-hackout-server.hf.space/ws/surge');

//     ws.onopen = () => {
//       setConnected(true);

//       // Request streaming data for multiple stations
//       const request = {
//         action: "stream",
//         stations: ["Harbor_A", "Harbor_B", "Harbor_C"],
//         interval: 3.0
//       };
//       ws.send(JSON.stringify(request));
//     };

//     ws.onmessage = (event) => {
//       const newData = JSON.parse(event.data);
//       if (newData.error) {
//         console.error('API Error:', newData.error);
//         return;
//       }
//       setData(newData);
//     };

//     ws.onclose = () => setConnected(false);
//     ws.onerror = (error) => console.error('WebSocket error:', error);

//     return () => ws.close();
//   }, []);

//   // Extract data for your charts
//   const surgeData = data?.station_graphs?.Harbor_A?.surge_curve?.data || [];
//   const alertData = data?.alert_status?.stations || [];
//   const multiStationData = data?.multi_station?.data || [];

//   return (
//     <div>
//       <h2>SurgeNN Dashboard</h2>
//       <p>Status: {connected ? '🟢 Connected' : '🔴 Disconnected'}</p>

//       {data && (
//         <div>
//           <p>Last updated: {data.generated_at}</p>
//           <div className='flex flex-wrap justify-evenly'>
//             <SurgeCurveChart />
//             <TideOverlayChart />
//             <UncertaintyBandChart />
//             <MultiStationChart />
//           </div>
//           <AlertStatusChart />
//           <ModelMetricsChart />

//         </div>
//       )}
//     </div>
//   );
// };



// src/App.js
import React from 'react';
import SurgeDashboard from '../StormData';

function StormSurgeDashboard() {
  return (
    <div>
     <SurgeDashboard />
    </div>
  );
}

export default StormSurgeDashboard;