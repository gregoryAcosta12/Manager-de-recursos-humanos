import React, { useState, useEffect } from 'react';
import type { Employee } from '../../../types';
import { X, User, Mail, Phone, Briefcase, Building, Calendar, DollarSign, MapPin, AlertCircle } from 'lucide-react';

interface EmployeeFormProps {
  employee?: Employee | null;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Employee>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    hireDate: new Date().toISOString().split('T')[0],
    salary: 0,
    status: 'active',
    address: '',
    birthDate: '',
    emergencyContact: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName?.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName?.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email?.trim()) newErrors.email = 'El email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.phone?.trim()) newErrors.phone = 'El teléfono es requerido';
    if (!formData.position?.trim()) newErrors.position = 'El cargo es requerido';
    if (!formData.department?.trim()) newErrors.department = 'El departamento es requerido';
    if (!formData.hireDate) newErrors.hireDate = 'La fecha de contratación es requerida';
    if (!formData.salary || formData.salary <= 0) newErrors.salary = 'El salario debe ser mayor a 0';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const employeeData: Employee = {
      id: employee?.id || `emp_${Date.now()}`,
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      position: formData.position || '',
      department: formData.department || '',
      hireDate: formData.hireDate || new Date().toISOString().split('T')[0],
      salary: formData.salary || 0,
      status: formData.status as 'active' | 'inactive' | 'on-vacation',
      address: formData.address,
      birthDate: formData.birthDate,
      emergencyContact: formData.emergencyContact
    };
    onSave(employeeData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'salary' ? parseFloat(value) || 0 : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5 text-gray-700" />
            {employee ? 'Editar Empleado' : 'Nuevo Empleado'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors`}
                placeholder="Juan"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellido *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors`}
                placeholder="Pérez"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors`}
                  placeholder="juan@empresa.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors`}
                  placeholder="+34 612 345 678"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cargo *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  name="position"
                  value={formData.position || ''}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border ${errors.position ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors`}
                  placeholder="Desarrollador Senior"
                />
              </div>
              {errors.position && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.position}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Departamento *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  name="department"
                  value={formData.department || ''}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border ${errors.department ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors`}
                  placeholder="Tecnología"
                />
              </div>
              {errors.department && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.department}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Contratación *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  name="hireDate"
                  value={formData.hireDate || ''}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border ${errors.hireDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors`}
                />
              </div>
              {errors.hireDate && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.hireDate}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salario * (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="number"
                  name="salary"
                  value={formData.salary || ''}
                  onChange={handleChange}
                  min="0"
                  step="1000"
                  className={`w-full pl-10 pr-3 py-2 border ${errors.salary ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors`}
                  placeholder="45000"
                />
              </div>
              {errors.salary && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.salary}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              name="status"
              value={formData.status || 'active'}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors appearance-none bg-white"
            >
              <option value="active">Activo</option>
              <option value="on-vacation">En vacaciones</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors"
                placeholder="Calle Principal 123, Ciudad"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contacto de Emergencia
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors"
                placeholder="+34 699 123 456"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium order-2 sm:order-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors shadow-sm hover:shadow-md font-medium order-1 sm:order-2"
            >
              {employee ? 'Actualizar' : 'Crear'} Empleado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;