import React, { useState, useMemo } from 'react';
import { useEmployeeContext } from '../../../contexts/EmployeeContext';
import EmployeeCard from './EmployeeCard';
import EmployeeForm from './EmployeeForm';
import { Plus, Search, Filter, X, Grid, List } from 'lucide-react';
import type { Employee } from '../../../types';

const EmployeeList: React.FC = () => {
  const { employees, deleteEmployee, addEmployee, updateEmployee } = useEmployeeContext();
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const departments = useMemo(() => [...new Set(employees.map(e => e.department))], [employees]);


  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = 
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = filterDepartment ? emp.department === filterDepartment : true;
      const matchesStatus = filterStatus ? emp.status === filterStatus : true;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, filterDepartment, filterStatus]);

  const handleSaveEmployee = (employee: Employee) => {
    if (editingEmployee) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
      deleteEmployee(id);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterDepartment('');
    setFilterStatus('');
  };

  const hasActiveFilters = searchTerm || filterDepartment || filterStatus;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Empleados</h1>
          <p className="text-gray-500">Gestiona todos los empleados de la empresa</p>
        </div>
        <button
          onClick={() => {
            setEditingEmployee(null);
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all shadow-sm hover:shadow-md font-medium"
        >
          <Plus className="w-4 h-4" />
          Nuevo Empleado
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar empleados por nombre, email, cargo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[160px]">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent appearance-none text-gray-700"
            >
              <option value="">Todos los departamentos</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="relative min-w-[140px]">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent appearance-none text-gray-700"
            >
              <option value="">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="on-vacation">En vacaciones</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Limpiar
            </button>
          )}

          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Mostrando {filteredEmployees.length} de {employees.length} empleados
      </div>

      <div className={`grid gap-4 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredEmployees.map(employee => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
            onViewProfile={(id) => console.log('Ver perfil:', id)}
          />
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No se encontraron empleados</p>
          <p className="text-sm text-gray-400 mt-1">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSave={handleSaveEmployee}
          onCancel={() => {
            setShowForm(false);
            setEditingEmployee(null);
          }}
        />
      )}
    </div>
  );
};

export default EmployeeList;