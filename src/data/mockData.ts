import type { Employee, Vacation, Attendance, Notification } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: 'emp_001',
    firstName: 'Ana',
    lastName: 'García',
    email: 'ana.garcia@empresa.com',
    phone: '+34 612 345 678',
    position: 'Desarrolladora Senior',
    department: 'Tecnología',
    hireDate: '2020-03-15',
    salary: 45000,
    status: 'active',
    address: 'Calle Mayor 123, Madrid',
    birthDate: '1990-05-20',
    emergencyContact: '+34 699 123 456',
    profileImage: 'https://images.unsplash.com/photo-1494790108378-be9c29b29330'
  },
  {
    id: 'emp_002',
    firstName: 'Carlos',
    lastName: 'Martínez',
    email: 'carlos.martinez@empresa.com',
    phone: '+34 623 456 789',
    position: 'Diseñador UX/UI',
    department: 'Tecnología',
    hireDate: '2021-07-10',
    salary: 38000,
    status: 'active',
    address: 'Calle Gran Vía 45, Madrid',
    birthDate: '1992-11-15',
    emergencyContact: '+34 688 789 012'
  },
  {
    id: 'emp_003',
    firstName: 'María',
    lastName: 'López',
    email: 'maria.lopez@empresa.com',
    phone: '+34 634 567 890',
    position: 'Directora de Marketing',
    department: 'Marketing',
    hireDate: '2019-01-20',
    salary: 52000,
    status: 'on-vacation',
    address: 'Calle Serrano 78, Madrid',
    birthDate: '1988-08-30',
    emergencyContact: '+34 677 234 567',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
  },
  {
    id: 'emp_004',
    firstName: 'David',
    lastName: 'Sánchez',
    email: 'david.sanchez@empresa.com',
    phone: '+34 645 678 901',
    position: 'Analista de Datos',
    department: 'Tecnología',
    hireDate: '2022-05-12',
    salary: 35000,
    status: 'active',
    address: 'Calle Alcalá 200, Madrid',
    birthDate: '1995-02-25',
    emergencyContact: '+34 655 345 678'
  },
  {
    id: 'emp_005',
    firstName: 'Laura',
    lastName: 'Fernández',
    email: 'laura.fernandez@empresa.com',
    phone: '+34 656 789 012',
    position: 'Especialista en RRHH',
    department: 'Recursos Humanos',
    hireDate: '2020-09-01',
    salary: 40000,
    status: 'active',
    address: 'Calle Velázquez 150, Madrid',
    birthDate: '1991-12-10',
    emergencyContact: '+34 644 456 789'
  },
  {
    id: 'emp_006',
    firstName: 'Javier',
    lastName: 'Romero',
    email: 'javier.romero@empresa.com',
    phone: '+34 667 890 123',
    position: 'Gerente de Proyectos',
    department: 'Operaciones',
    hireDate: '2018-11-01',
    salary: 48000,
    status: 'active',
    address: 'Calle Princesa 67, Madrid',
    birthDate: '1986-07-12',
    emergencyContact: '+34 633 567 890'
  },
  {
    id: 'emp_007',
    firstName: 'Elena',
    lastName: 'Morales',
    email: 'elena.morales@empresa.com',
    phone: '+34 678 901 234',
    position: 'Contadora',
    department: 'Finanzas',
    hireDate: '2021-02-14',
    salary: 42000,
    status: 'inactive',
    address: 'Calle Fuencarral 89, Madrid',
    birthDate: '1989-09-05',
    emergencyContact: '+34 677 890 123'
  }
];

export const mockVacations: Vacation[] = [
  {
    id: 'vac_001',
    employeeId: 'emp_003',
    startDate: '2026-07-01',
    endDate: '2026-07-15',
    type: 'vacation',
    status: 'approved',
    reason: 'Vacaciones de verano'
  },
  {
    id: 'vac_002',
    employeeId: 'emp_001',
    startDate: '2026-08-01',
    endDate: '2026-08-10',
    type: 'vacation',
    status: 'pending',
    reason: 'Vacaciones familiares'
  },
  {
    id: 'vac_003',
    employeeId: 'emp_005',
    startDate: '2026-06-15',
    endDate: '2026-06-16',
    type: 'personal',
    status: 'approved',
    reason: 'Asuntos personales'
  },
  {
    id: 'vac_004',
    employeeId: 'emp_002',
    startDate: '2026-09-20',
    endDate: '2026-09-22',
    type: 'sick',
    status: 'pending',
    reason: 'Procedimiento médico'
  },
  {
    id: 'vac_005',
    employeeId: 'emp_006',
    startDate: '2026-12-24',
    endDate: '2026-12-28',
    type: 'holiday',
    status: 'approved',
    reason: 'Vacaciones de Navidad'
  }
];

export const mockAttendance: Attendance[] = [
  {
    id: 'att_001',
    employeeId: 'emp_001',
    date: '2026-06-28',
    checkIn: '09:00',
    checkOut: '18:00',
    status: 'present',
    hoursWorked: 8,
    overtime: 0
  },
  {
    id: 'att_002',
    employeeId: 'emp_002',
    date: '2026-06-28',
    checkIn: '09:15',
    checkOut: '18:00',
    status: 'late',
    hoursWorked: 7.75,
    overtime: 0
  },
  {
    id: 'att_003',
    employeeId: 'emp_004',
    date: '2026-06-28',
    checkIn: '09:00',
    checkOut: '17:30',
    status: 'present',
    hoursWorked: 7.5,
    overtime: 0
  },
  {
    id: 'att_004',
    employeeId: 'emp_001',
    date: '2026-06-27',
    checkIn: '08:45',
    checkOut: '18:15',
    status: 'present',
    hoursWorked: 8.5,
    overtime: 0.5
  },
  {
    id: 'att_005',
    employeeId: 'emp_003',
    date: '2026-06-27',
    checkIn: '09:00',
    checkOut: '18:00',
    status: 'present',
    hoursWorked: 8,
    overtime: 0
  },
  {
    id: 'att_006',
    employeeId: 'emp_005',
    date: '2026-06-27',
    checkIn: '09:30',
    checkOut: '17:45',
    status: 'late',
    hoursWorked: 7.25,
    overtime: 0
  },
  {
    id: 'att_007',
    employeeId: 'emp_007',
    date: '2026-06-27',
    checkIn: '00:00',
    checkOut: '00:00',
    status: 'absent',
    hoursWorked: 0,
    overtime: 0
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'not_001',
    type: 'success',
    message: 'Vacaciones aprobadas para María López',
    date: '2026-06-28T10:30:00',
    read: false
  },
  {
    id: 'not_002',
    type: 'warning',
    message: 'David Sánchez ha llegado tarde (3 veces esta semana)',
    date: '2026-06-28T09:15:00',
    read: false
  },
  {
    id: 'not_003',
    type: 'info',
    message: 'Nuevo empleado registrado: Carlos Martínez',
    date: '2026-06-27T16:00:00',
    read: true
  },
  {
    id: 'not_004',
    type: 'error',
    message: 'Error al sincronizar asistencia de Elena Morales',
    date: '2026-06-27T14:20:00',
    read: true
  },
  {
    id: 'not_005',
    type: 'success',
    message: 'Reporte mensual generado correctamente',
    date: '2026-06-26T23:59:00',
    read: true
  }
];