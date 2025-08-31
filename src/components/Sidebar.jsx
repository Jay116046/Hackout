import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  Shield, 
  AlertTriangle, 
  Map, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  Bell,
  Users,
  FileText,
  Globe,
  Activity
} from 'lucide-react'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getMenuItems = (role) => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', href: '/dashboard' },
      { icon: Bell, label: 'Alerts', href: '/dashboard/alerts' },
      { icon: Map, label: 'Map View', href: '/dashboard/map' },
      { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    ]

    switch (role) {
      case 'disaster-management':
        return [
          ...baseItems,
          { icon: FileText, label: 'Reports', href: '/dashboard/reports' },
          { icon: Activity, label: 'Storm Tracking', href: '/dashboard/storm-tracking' }
        ]
      case 'city-government':
        return [
          ...baseItems,
          { icon: Globe, label: 'Infrastructure', href: '/dashboard/infrastructure' },
          { icon: BarChart3, label: 'Sea Level', href: '/dashboard/sea-level' }
        ]
      case 'environmental-ngo':
        return [
          ...baseItems,
          { icon: Activity, label: 'Pollution Data', href: '/dashboard/pollution' },
          { icon: BarChart3, label: 'Trends', href: '/dashboard/trends' }
        ]
      case 'fisherfolk':
        return [
          ...baseItems,
          { icon: Activity, label: 'Fishing Zones', href: '/dashboard/fishing-zones' },
          { icon: Bell, label: 'Weather', href: '/dashboard/weather' }
        ]
      case 'civil-defence':
        return [
          ...baseItems,
          { icon: Users, label: 'Task Management', href: '/dashboard/tasks' },
          { icon: Activity, label: 'Communication', href: '/dashboard/communication' }
        ]
      default:
        return baseItems
    }
  }

  const menuItems = getMenuItems(user?.role)

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-coastal-500 to-ocean-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              {!isCollapsed && (
                <span className="text-lg font-semibold text-gray-900">CTAS</span>
              )}
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-coastal-500 to-ocean-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              {!isCollapsed && (
                <div>
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.roleName}</div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && <span>{item.label}</span>}
              </a>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-2">
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <Settings className="w-5 h-5" />
                {!isCollapsed && <span>Settings</span>}
              </a>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
                {!isCollapsed && <span>Sign Out</span>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>
    </>
  )
}

export default Sidebar
