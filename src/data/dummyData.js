export const userRoles = [
  {
    id: 'dStormSurgeDashboard',
    name: 'StormSurgeDashboard',
    description: 'Real-time alerts, storm tracking, and report generation',
    color: 'coastal'
  },
  {
    id: 'coastal_eErosion_dashboard',
    name: 'Coastal Erosion Dashboard',
    description: 'Infrastructure monitoring and sea-level rise tracking',

    color: 'ocean'
  },
  {
    id: 'marine_pollution_dashboard ',
    name: 'Marine Pollution dashboard',
    description: 'Water quality monitoring and pollution source identification',
    color: 'coastal'
  },
  {
    id: 'illegal_activity_dashboard',
    name: 'Illegal Activity Dashboard',
    description: 'Vessel tracking and anomaly detection',
    color: 'coastal'
  }
]

export const alerts = [
  {
    id: 1,
    type: 'cyclone',
    severity: 'critical',
    title: 'Cyclone Warning - Category 3',
    description: 'Cyclone approaching coastal region with wind speeds up to 120 km/h',
    location: 'Eastern Coastal Zone',
    timestamp: '2024-01-15T10:30:00Z',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    affectedAreas: ['Port City', 'Fishing Village', 'Tourist Beach'],
    recommendations: ['Evacuate low-lying areas', 'Secure loose objects', 'Stay indoors']
  },
  {
    id: 2,
    type: 'storm-surge',
    severity: 'moderate',
    title: 'Storm Surge Alert',
    description: 'Expected storm surge of 2-3 meters along northern coastline',
    location: 'Northern Coastal Region',
    timestamp: '2024-01-15T09:15:00Z',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    affectedAreas: ['Harbor Area', 'Coastal Roads'],
    recommendations: ['Avoid coastal areas', 'Monitor tide levels']
  },
  {
    id: 3,
    type: 'erosion',
    severity: 'moderate',
    title: 'Coastal Erosion Detected',
    description: 'Accelerated erosion detected in southern beach areas',
    location: 'Southern Beach Zone',
    timestamp: '2024-01-15T08:45:00Z',
    coordinates: { lat: 8.0883, lng: 77.5385 },
    affectedAreas: ['Beach Resort', 'Coastal Highway'],
    recommendations: ['Restrict beach access', 'Monitor infrastructure stability']
  },
  {
    id: 4,
    type: 'pollution',
    severity: 'low',
    title: 'Water Quality Alert',
    description: 'Elevated levels of pollutants detected in coastal waters',
    location: 'Western Harbor',
    timestamp: '2024-01-15T07:30:00Z',
    coordinates: { lat: 9.9312, lng: 76.2673 },
    affectedAreas: ['Fishing Grounds', 'Swimming Areas'],
    recommendations: ['Avoid swimming', 'Monitor fish catches']
  },
  {
    id: 5,
    type: 'algal-bloom',
    severity: 'moderate',
    title: 'Harmful Algal Bloom',
    description: 'Red tide detected spreading along eastern coastline',
    location: 'Eastern Coastal Waters',
    timestamp: '2024-01-15T06:20:00Z',
    coordinates: { lat: 16.5062, lng: 80.6480 },
    affectedAreas: ['Shellfish Beds', 'Tourist Beaches'],
    recommendations: ['Avoid shellfish consumption', 'Close affected beaches']
  }
]

export const weatherData = {
  current: {
    temperature: 28,
    humidity: 75,
    windSpeed: 25,
    windDirection: 'SE',
    pressure: 1013,
    visibility: 8
  },
  forecast: [
    { day: 'Today', temp: 28, condition: 'Partly Cloudy', wind: 25 },
    { day: 'Tomorrow', temp: 26, condition: 'Rainy', wind: 35 },
    { day: 'Day 3', temp: 27, condition: 'Cloudy', wind: 20 },
    { day: 'Day 4', temp: 29, condition: 'Sunny', wind: 15 },
    { day: 'Day 5', temp: 30, condition: 'Sunny', wind: 10 }
  ]
}

export const infrastructureData = [
  {
    id: 1,
    name: 'Port Bridge',
    type: 'bridge',
    status: 'at-risk',
    riskLevel: 'moderate',
    lastInspection: '2024-01-10',
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: 2,
    name: 'Seawall North',
    type: 'seawall',
    status: 'stable',
    riskLevel: 'low',
    lastInspection: '2024-01-12',
    coordinates: { lat: 13.0827, lng: 80.2707 }
  },
  {
    id: 3,
    name: 'Fishing Harbor',
    type: 'harbor',
    status: 'maintenance',
    riskLevel: 'moderate',
    lastInspection: '2024-01-08',
    coordinates: { lat: 8.0883, lng: 77.5385 }
  }
]

export const environmentalTrends = {
  seaLevelRise: [
    { year: 2020, level: 0 },
    { year: 2021, level: 2.3 },
    { year: 2022, level: 4.1 },
    { year: 2023, level: 5.8 },
    { year: 2024, level: 7.2 }
  ],
  pollutionLevels: [
    { month: 'Jan', level: 45 },
    { month: 'Feb', level: 52 },
    { month: 'Mar', level: 48 },
    { month: 'Apr', level: 61 },
    { month: 'May', level: 58 },
    { month: 'Jun', level: 55 }
  ],
  erosionRate: [
    { month: 'Jan', rate: 2.1 },
    { month: 'Feb', rate: 2.8 },
    { month: 'Mar', rate: 3.2 },
    { month: 'Apr', rate: 4.1 },
    { month: 'May', rate: 3.8 },
    { month: 'Jun', rate: 3.5 }
  ]
}
