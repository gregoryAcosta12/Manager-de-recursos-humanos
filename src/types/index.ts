export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on-vacation';
  address?: string;
  birthDate?: string;
  emergencyContact?: string;
  profileImage?: string;
}

export interface Vacation {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  type: 'vacation' | 'sick' | 'personal' | 'holiday';
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  hoursWorked: number;
  overtime?: number;
}

export interface DepartmentStats {
  department: string;
  totalEmployees: number;
  activeEmployees: number;
}

export interface EmployeeStats {
  total: number;
  active: number;
  inactive: number;
  onVacation: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  date: string;
  read: boolean;
}