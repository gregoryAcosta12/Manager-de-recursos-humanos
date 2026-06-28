import React, { useState } from 'react';
import { Bell, Search, Settings, User, LogOut, ChevronDown } from 'lucide-react';
import { useEmployeeContext } from '../../contexts/EmployeeContext';

interface NavbarProps {
  onSearch?: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const { getUnreadNotifications, markNotificationAsRead, notifications } = useEmployeeContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const unreadCount = getUnreadNotifications().length;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar empleados, departamentos..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="p-3 border-b border-gray-100">
                  <h4 className="font-semibold text-gray-900">Notificaciones</h4>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-sm text-gray-500 text-center">No hay notificaciones</p>
                  ) : (
                    notifications.slice(0, 5).map(notification => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification.id)}
                        className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                          !notification.read ? 'bg-gray-50' : ''
                        }`}
                      >
                        <p className="text-sm text-gray-700">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.date).toLocaleString('es-ES')}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 5 && (
                  <div className="p-2 border-t border-gray-100 text-center">
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      Ver todas
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 border-l border-gray-200 pl-4 hover:bg-gray-50 rounded-lg p-2 transition-colors"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                JD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">Juan Díaz</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="p-4 border-b border-gray-100">
                  <p className="font-medium text-gray-900">Juan Díaz</p>
                  <p className="text-sm text-gray-500">juan.diaz@empresa.com</p>
                </div>
                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                    <User className="w-4 h-4" />
                    Mi Perfil
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                    <Settings className="w-4 h-4" />
                    Configuración
                  </button>
                  <hr className="my-1" />
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;