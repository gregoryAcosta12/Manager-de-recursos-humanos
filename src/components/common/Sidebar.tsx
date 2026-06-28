import React from 'react';
import { Users, User, Calendar, Clock, BarChart3, Home, Briefcase, FileText, Settings as SettingsIcon } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'employees', icon: Users, label: 'Empleados' },
    { id: 'profile', icon: User, label: 'Perfil' },
    { id: 'vacations', icon: Calendar, label: 'Vacaciones' },
    { id: 'attendance', icon: Clock, label: 'Asistencia' },
    { id: 'departments', icon: Briefcase, label: 'Departamentos' },
    { id: 'reports', icon: BarChart3, label: 'Reportes' },
    { id: 'documents', icon: FileText, label: 'Documentos' },
    { id: 'settings', icon: SettingsIcon, label: 'Configuración' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-sm">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">HR Manager</h1>
            <p className="text-xs text-gray-500 font-medium">Sistema de RRHH</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
          Menú Principal
        </p>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-gray-400'}`} />
              <span className="font-medium text-sm">{item.label}</span>
              {activeTab === item.id && (
                <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-xs font-medium text-gray-500">Versión 2.0.1</p>
          <p className="text-xs text-gray-400">© 2026 HR Manager</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;