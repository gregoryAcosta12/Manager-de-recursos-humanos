import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Employee, Vacation, Attendance, DepartmentStats, EmployeeStats, Notification } from '../types';
import { mockEmployees, mockVacations, mockAttendance, mockNotifications } from '../data/mockData';

interface EmployeeContextType {
  employees: Employee[];
  vacations: Vacation[];
  attendance: Attendance[];
  notifications: Notification[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;
  addVacation: (vacation: Vacation) => void;
  updateVacation: (vacation: Vacation) => void;
  deleteVacation: (id: string) => void;
  addAttendance: (attendance: Attendance) => void;
  updateAttendance: (attendance: Attendance) => void;
  deleteAttendance: (id: string) => void;
  getEmployeeStats: () => EmployeeStats;
  getDepartmentStats: () => DepartmentStats[];
  getEmployeeById: (id: string) => Employee | undefined;
  getEmployeeVacations: (employeeId: string) => Vacation[];
  getEmployeeAttendance: (employeeId: string) => Attendance[];
  markNotificationAsRead: (id: string) => void;
  getUnreadNotifications: () => Notification[];
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [vacations, setVacations] = useState<Vacation[]>(mockVacations);
  const [attendance, setAttendance] = useState<Attendance[]>(mockAttendance);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const addEmployee = useCallback((employee: Employee) => {
    setEmployees(prev => [...prev, employee]);
    // Add notification
    setNotifications(prev => [{
      id: `not_${Date.now()}`,
      type: 'success',
      message: `Nuevo empleado registrado: ${employee.firstName} ${employee.lastName}`,
      date: new Date().toISOString(),
      read: false
    }, ...prev]);
  }, []);

  const updateEmployee = useCallback((updatedEmployee: Employee) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
    setNotifications(prev => [{
      id: `not_${Date.now()}`,
      type: 'info',
      message: `Empleado actualizado: ${updatedEmployee.firstName} ${updatedEmployee.lastName}`,
      date: new Date().toISOString(),
      read: false
    }, ...prev]);
  }, []);

  const deleteEmployee = useCallback((id: string) => {
    const employee = employees.find(emp => emp.id === id);
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    if (employee) {
      setNotifications(prev => [{
        id: `not_${Date.now()}`,
        type: 'warning',
        message: `Empleado eliminado: ${employee.firstName} ${employee.lastName}`,
        date: new Date().toISOString(),
        read: false
      }, ...prev]);
    }
  }, [employees]);

  const addVacation = useCallback((vacation: Vacation) => {
    setVacations(prev => [...prev, vacation]);
  }, []);

  const updateVacation = useCallback((updatedVacation: Vacation) => {
    setVacations(prev => prev.map(v => 
      v.id === updatedVacation.id ? updatedVacation : v
    ));
  }, []);

  const deleteVacation = useCallback((id: string) => {
    setVacations(prev => prev.filter(v => v.id !== id));
  }, []);

  const addAttendance = useCallback((attendanceRecord: Attendance) => {
    setAttendance(prev => [...prev, attendanceRecord]);
  }, []);

  const updateAttendance = useCallback((updatedAttendance: Attendance) => {
    setAttendance(prev => prev.map(a => 
      a.id === updatedAttendance.id ? updatedAttendance : a
    ));
  }, []);

  const deleteAttendance = useCallback((id: string) => {
    setAttendance(prev => prev.filter(a => a.id !== id));
  }, []);

  const getEmployeeStats = useCallback((): EmployeeStats => {
    const total = employees.length;
    const active = employees.filter(e => e.status === 'active').length;
    const inactive = employees.filter(e => e.status === 'inactive').length;
    const onVacation = employees.filter(e => e.status === 'on-vacation').length;
    return { total, active, inactive, onVacation };
  }, [employees]);

  const getDepartmentStats = useCallback((): DepartmentStats[] => {
    const departments = [...new Set(employees.map(e => e.department))];
    return departments.map(dept => {
      const deptEmployees = employees.filter(e => e.department === dept);
      return {
        department: dept,
        totalEmployees: deptEmployees.length,
        activeEmployees: deptEmployees.filter(e => e.status === 'active').length
      };
    });
  }, [employees]);

  const getEmployeeById = useCallback((id: string) => {
    return employees.find(emp => emp.id === id);
  }, [employees]);

  const getEmployeeVacations = useCallback((employeeId: string) => {
    return vacations.filter(v => v.employeeId === employeeId);
  }, [vacations]);

  const getEmployeeAttendance = useCallback((employeeId: string) => {
    return attendance.filter(a => a.employeeId === employeeId);
  }, [attendance]);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  }, []);

  const getUnreadNotifications = useCallback(() => {
    return notifications.filter(n => !n.read);
  }, [notifications]);

  const value: EmployeeContextType = {
    employees,
    vacations,
    attendance,
    notifications,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addVacation,
    updateVacation,
    deleteVacation,
    addAttendance,
    updateAttendance,
    deleteAttendance,
    getEmployeeStats,
    getDepartmentStats,
    getEmployeeById,
    getEmployeeVacations,
    getEmployeeAttendance,
    markNotificationAsRead,
    getUnreadNotifications
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};