import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, LogOut } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold">Chess App</h2>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 hover:bg-gray-700 ${
                isActive ? 'bg-gray-700' : ''
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-4 left-4">
        <button className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};
