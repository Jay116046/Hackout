# Coastal Threat Alert System

A comprehensive web platform for early warning and alerting of coastal threats including storm surges, erosion, pollution, illegal dumping, sea-level rise, algal blooms, and cyclones.

## 🌊 Features

### Multi-User Role System
- **Disaster Management Departments**: Real-time alerts, storm tracking, report generation
- **Coastal City Governments**: Infrastructure monitoring, sea-level rise tracking
- **Environmental NGOs**: Pollution detection, environmental trend analysis
- **Fisherfolk**: Mobile-friendly fishing safety alerts and weather warnings
- **Civil Defence Teams**: Task management, emergency response coordination

### Core Functionality
- Real-time alert system with severity levels (Critical, Moderate, Low)
- Interactive map dashboard (placeholder for API integration)
- Historical trends and analytics
- Role-based dashboards and navigation
- Responsive design for all devices
- Notification center for alerts

## 🚀 Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS with custom coastal theme colors
- **UI Components**: shadcn/ui design system
- **Animations**: Framer Motion for smooth transitions
- **Charts**: Recharts for data visualization
- **Routing**: React Router for navigation
- **Icons**: Lucide React for consistent iconography

## 📁 Project Structure

```
src/
├── components/
│   ├── LandingPage.jsx          # Landing page with role selection
│   ├── Login.jsx                # Authentication and role selection
│   ├── Dashboard.jsx            # Main dashboard router
│   ├── Sidebar.jsx              # Navigation sidebar
│   └── dashboards/              # Role-specific dashboards
│       ├── DisasterManagementDashboard.jsx
│       ├── CityGovernmentDashboard.jsx
│       ├── EnvironmentalNGODashboard.jsx
│       ├── FisherfolkDashboard.jsx
│       └── CivilDefenceDashboard.jsx
├── contexts/
│   └── AuthContext.jsx          # Authentication and user management
├── data/
│   └── dummyData.js             # Sample data for demonstration
├── App.jsx                      # Main application component
├── main.jsx                     # Application entry point
└── index.css                    # Global styles and Tailwind directives
```

## 🎨 Design System

### Color Palette
- **Coastal Blues**: Primary brand colors for ocean themes
- **Ocean Greens**: Secondary colors for environmental elements
- **Alert Colors**: Red (critical), Yellow (moderate), Green (low)

### Components
- Modern card-based layouts
- Responsive grid systems
- Interactive hover states
- Smooth animations and transitions
- Mobile-first responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coastal-threat-alert-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🔐 Authentication

The system uses a simulated authentication system for demonstration purposes:

- **Login**: Select user role and enter any email/password
- **Role-based Access**: Each role gets a tailored dashboard
- **Session Management**: User state persists during browser session

### Available Roles
1. **Disaster Management Department** - Emergency response coordination
2. **Coastal City Government** - Infrastructure and planning
3. **Environmental NGO** - Environmental monitoring
4. **Fisherfolk** - Fishing safety and weather
5. **Civil Defence Team** - Emergency response tasks

## 📊 Data Sources

The application currently uses mock data for demonstration:

- **Alerts**: Simulated coastal threat notifications
- **Weather Data**: Current conditions and forecasts
- **Infrastructure**: Coastal infrastructure status
- **Environmental Trends**: Sea level rise, pollution levels, erosion rates

## 🗺️ Map Integration

The map component is a placeholder ready for integration with:

- **Google Maps API**
- **Mapbox**
- **OpenStreetMap**
- **Custom GIS solutions**

## 📱 Responsive Design

- **Mobile**: Optimized for small screens with touch-friendly interfaces
- **Tablet**: Adaptive layouts for medium screens
- **Desktop**: Full-featured dashboards with advanced controls

## 🔧 Customization

### Adding New Roles
1. Update `userRoles` array in `dummyData.js`
2. Create new dashboard component
3. Add routing in `Dashboard.jsx`
4. Update sidebar navigation

### Styling
- Modify `tailwind.config.js` for theme colors
- Update `index.css` for custom component styles
- Use Tailwind utility classes for rapid development

## 🚀 Future Enhancements

- **Real-time Data Integration**: Connect to actual coastal monitoring systems
- **Push Notifications**: SMS and app notifications for critical alerts
- **Advanced Analytics**: Machine learning for threat prediction
- **Mobile App**: Native mobile applications
- **API Development**: Backend services and data management
- **Multi-language Support**: Internationalization for coastal communities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Coastal communities and emergency responders
- Environmental monitoring organizations
- Disaster management professionals
- Open source community contributors

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for coastal safety and environmental protection**
