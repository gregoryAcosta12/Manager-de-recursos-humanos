import React, { useState } from 'react';
import { EmployeeProvider } from './contexts/EmployeeContext';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import EmployeeList from './components/common/employees/EmployeeList';
import { useEmployeeContext } from './contexts/EmployeeContext';
import Card from './components/common/Card';
import { Users, UserCheck, UserX, Calendar, Clock, BarChart3, TrendingUp, TrendingDown, Briefcase } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { getEmployeeStats, getDepartmentStats, employees, vacations, attendance } = useEmployeeContext();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = getEmployeeStats();
  const departmentStats = getDepartmentStats();

  // Attendance stats for today
  const todayAttendance = attendance.filter(a => a.date === new Date().toISOString().split('T')[0]);
  const presentToday = todayAttendance.filter(a => a.status === 'present').length;
  const lateToday = todayAttendance.filter(a => a.status === 'late').length;
  const absentToday = todayAttendance.filter(a => a.status === 'absent').length;

  // Pending vacations
  const pendingVacations = vacations.filter(v => v.status === 'pending').length;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500">Resumen general de la empresa</p>
              </div>
              <div className="text-sm text-gray-400">
                Última actualización: {new Date().toLocaleString('es-ES')}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="elevated">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Users className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Empleados</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-xs text-gray-400 mt-1">+{stats.active} activos</p>
                  </div>
                </div>
              </Card>
              <Card variant="elevated">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Activos</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {Math.round((stats.active / stats.total) * 100)}% del total
                    </p>
                  </div>
                </div>
              </Card>
              <Card variant="elevated">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-400 rounded-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">En Vacaciones</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.onVacation}</p>
                    <p className="text-xs text-gray-400 mt-1">{pendingVacations} pendientes</p>
                  </div>
                </div>
              </Card>
              <Card variant="elevated">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-200 rounded-lg">
                    <UserX className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Inactivos</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
                    <p className="text-xs text-gray-400 mt-1">+{absentToday} ausentes hoy</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Attendance Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card title="Asistencia Hoy" icon={<Clock className="w-4 h-4" />}>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">{presentToday}</p>
                      <p className="text-xs text-gray-500">Presentes</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">{lateToday}</p>
                      <p className="text-xs text-gray-500">Tardes</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{absentToday}</p>
                      <p className="text-xs text-gray-500">Ausentes</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
                    <span>Total registrados: {todayAttendance.length}</span>
                    <span>Eficiencia: {Math.round((presentToday / (todayAttendance.length || 1)) * 100)}%</span>
                  </div>
                </div>
              </Card>

              <Card title="Estadísticas por Departamento" icon={<Briefcase className="w-4 h-4" />}>
                <div className="space-y-3">
                  {departmentStats.map(dept => (
                    <div key={dept.department} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <span className="text-sm font-medium text-gray-700">{dept.department}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                          {dept.activeEmployees} activos
                        </span>
                        <span className="text-sm font-semibold text-gray-900 w-8 text-right">
                          {dept.totalEmployees}
                        </span>
                      </div>
                    </div>
                  ))}
                  {departmentStats.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">No hay departamentos</p>
                  )}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card title="Acciones Rápidas" icon={<TrendingUp className="w-4 h-4" />}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button 
                  onClick={() => setActiveTab('employees')}
                  className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all text-center border border-gray-200 hover:border-gray-300"
                >
                  <Users className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Ver Empleados</span>
                </button>
                <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all text-center border border-gray-200 hover:border-gray-300">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Marcar Asistencia</span>
                </button>
                <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all text-center border border-gray-200 hover:border-gray-300">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Solicitar Vacaciones</span>
                </button>
                <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all text-center border border-gray-200 hover:border-gray-300">
                  <BarChart3 className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Ver Reportes</span>
                </button>
              </div>
            </Card>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card title="Próximas Vacaciones" variant="bordered">
                <div className="space-y-2">
                  {vacations.filter(v => v.status === 'approved').slice(0, 3).map(v => {
                    const employee = employees.find(e => e.id === v.employeeId);
                    return (
                      <div key={v.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {employee ? `${employee.firstName} ${employee.lastName}` : 'Desconocido'}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(v.startDate).toLocaleDateString('es-ES')} - {new Date(v.endDate).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">{v.type}</span>
                      </div>
                    );
                  })}
                  {vacations.filter(v => v.status === 'approved').length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">No hay vacaciones programadas</p>
                  )}
                </div>
              </Card>

              <Card title="Distribución de Empleados" variant="bordered">
                <div className="space-y-2">
                  {departmentStats.map(dept => {
                    const percentage = Math.round((dept.totalEmployees / stats.total) * 100);
                    return (
                      <div key={dept.department}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{dept.department}</span>
                          <span className="text-gray-900 font-medium">{dept.totalEmployees} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-gray-800 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {departmentStats.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">No hay datos disponibles</p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        );
      
      case 'employees':
        return <EmployeeList />;
      
      default:
        return (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">Contenido en construcción</p>
            <p className="text-sm text-gray-400 mt-1">Esta sección estará disponible pronto</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 min-w-0">
        <Navbar onSearch={setSearchTerm} />
        <main className="p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <EmployeeProvider>
      <DashboardContent />
    </EmployeeProvider>
  );
}

export default App;