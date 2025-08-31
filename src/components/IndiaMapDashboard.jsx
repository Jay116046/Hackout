import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './IndiaMapDashboard.css'; // Import custom styles

// --- Component ---
const IndiaMapDashboard = () => {
    // --- State Management ---
    // State to hold calculated values
    const [area, setArea] = useState('Calculating...');
    const [centroid, setCentroid] = useState('Calculating...');

    // --- Refs ---
    // Ref to hold the map container DOM element
    const mapContainerRef = useRef(null);
    // Ref to hold the Leaflet map instance
    const mapInstanceRef = useRef(null);

    // Bounding points data
    const boundingPoints = [
        [22.945794, 69.776661],
        [23.142726, 70.166490],
        [23.044999, 70.545263],
        [22.298116, 70.013361],
        [22.224074, 69.453331],
        [22.577473, 69.008862]
    ];

    // --- Side Effects (Map Initialization & Calculations) ---
    useEffect(() => {
        // Run only if the map container is available and the map hasn't been initialized yet
        if (mapContainerRef.current && !mapInstanceRef.current) {
            // --- 1. MAP INITIALIZATION ---
            const map = L.map(mapContainerRef.current, {
                center: [22.5937, 78.9629],
                zoom: 5,
                zoomControl: true,
                scrollWheelZoom: true,
                doubleClickZoom: true,
                dragging: true,
                touchZoom: true,
                boxZoom: true,
                keyboard: true,
            });
            mapInstanceRef.current = map; // Store map instance in ref

            // --- 2. TILE LAYER ---
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            }).addTo(map);

            // --- 3. DRAW THE POLYGON AND MARKERS ---

            // Draw polygon and zoom to its bounds
            const polygon = L.polygon(boundingPoints, {
                color: 'green',
                fillColor: '#22c55e',
                fillOpacity: 0.3,
                weight: 2
            }).addTo(map);

            boundingPoints.forEach(point => {
                L.marker(point)
                    .addTo(map)
                    .bindPopup(`<b>Coordinates:</b><br>${point[0].toFixed(4)}, ${point[1].toFixed(4)}`);
            });

            // Zoom to polygon area
            map.fitBounds(polygon.getBounds());

            // --- 4. CALCULATIONS ---
            const calculatedArea = calculatePolygonArea(boundingPoints);
            const calculatedCentroid = calculateCentroid(boundingPoints);

            // --- 5. UPDATE STATE ---
            setArea(`${calculatedArea.toLocaleString('en-IN', { maximumFractionDigits: 0 })} km²`);
            setCentroid(`${calculatedCentroid[0].toFixed(4)}°, ${calculatedCentroid[1].toFixed(4)}°`);
        }

        // --- Cleanup Function ---
        // This function will run when the component unmounts
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [boundingPoints]); // Rerun effect if boundingPoints change

    // --- Calculation Helpers ---
    const calculatePolygonArea = (latLngs) => {
        let area = 0;
        const n = latLngs.length;
        for (let i = 0; i < n; i++) {
            const p1 = latLngs[i];
            const p2 = latLngs[(i + 1) % n];
            area += (p1[1] * p2[0] - p2[1] * p1[0]);
        }
        area = Math.abs(area / 2);
        const avgLat = latLngs.reduce((sum, p) => sum + p[0], 0) / n;
        const degToKm = 111.132 * (111.320 * Math.cos(avgLat * Math.PI / 180));
        return area * degToKm;
    };

    const calculateCentroid = (latLngs) => {
        let latSum = 0;
        let lngSum = 0;
        latLngs.forEach(point => {
            latSum += point[0];
            lngSum += point[1];
        });
        return [latSum / latLngs.length, lngSum / latLngs.length];
    };


    // --- Render JSX ---
    return (
        <div className="flex flex-col md:flex-row h-screen font-inter">
            {/* ===== Left Panel: Details & Information ===== */}
            <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 shadow-2xl z-10 overflow-y-auto">
                <div className="flex items-center mb-6">
                    <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <h1 className="text-2xl font-bold text-gray-800">Area Analysis</h1>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                    <h2 className="text-sm font-semibold text-gray-500 mb-2">APPROXIMATE AREA</h2>
                    <p className="text-3xl font-bold text-green-700">{area}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                    <h2 className="text-sm font-semibold text-gray-500 mb-2">GEOGRAPHIC CENTER (CENTROID)</h2>
                    <p className="text-xl font-medium text-gray-800">{centroid}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h2 className="text-sm font-semibold text-gray-500 mb-2">BOUNDING POINTS (VERTICES)</h2>
                    <ul className="space-y-2 text-gray-700">
                        {boundingPoints.map((point, index) => (
                            <li key={index} className="flex justify-between text-sm">
                                <span>Point {index + 1}:</span>
                                <span className="font-mono">{point[0]}, {point[1]}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ===== Right Panel: The Map ===== */}
            <div className="w-full md:w-2/3 lg:w-3/4 h-full flex flex-col">
                <div ref={mapContainerRef} id="map" className="flex-grow" />
                <div className="p-4 bg-white border-t border-gray-200">
                    {/* <iframe
                        src="https://www.openstreetmap.org/export/embed.html?bbox=68.1766%2C6.7519%2C97.4026%2C35.6745&amp;layer=mapnik"
                        style={{ border: '1px solid #ccc', width: '100%', height: '300px', borderRadius: '12px' }}
                        allowFullScreen
                        loading="lazy"
                        title="Interactive OpenStreetMap of India"
                    ></iframe> */}
                    <div className="text-xs text-gray-500 mt-1">Interactive map powered by OpenStreetMap</div>
                </div>
            </div>
        </div>
    );
};

export default IndiaMapDashboard;