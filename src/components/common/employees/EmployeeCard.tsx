import React from 'react';
import type { Employee } from '../../../types';
import { Mail, Phone, Briefcase, Calendar, Edit2, Trash2, MapPin, User as UserIcon } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onViewProfile: (id: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onEdit, onDelete, onViewProfile }) => {
  const statusColors = {
    active: 'bg-gray-900 text-white',
    inactive: 'bg-gray-300 text-gray-700',
    'on-vacation': 'bg-gray-500 text-white'
  };

  const statusLabels = {
    active: 'Activo',
    inactive: 'Inactivo',
    'on-vacation': 'En vacaciones'
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => onViewProfile(employee.id)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm flex-shrink-0">
              {employee.firstName[0]}{employee.lastName[0]}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm text-gray-500">{employee.position}</p>
            </div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(employee); }}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(employee.id); }}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{employee.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {employee.phone}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {employee.department}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {new Date(employee.hireDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' })}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[employee.status]}`}>
            {statusLabels[employee.status]}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              ${employee.salary.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400">/ año</span>
          </div>
        </div>

        {employee.address && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
            <MapPin className="w-3 h-3" />
            {employee.address}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;