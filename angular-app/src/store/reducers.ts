import { createReducer, on } from '@ngrx/store';
import { Employee } from '../models/employee.model';
import * as EmployeeActions from './actions';

export interface EmployeeState {
  employees: Employee[];
  employee: Employee;
  loading: boolean;
  error: string;
}
export const initialState: EmployeeState = {
  employees: [],
  employee: { id: 0, name: '', createdDate: null },
  loading: false,
  error: '',
};
export const employeeReducer = createReducer(
  initialState,

  on(EmployeeActions.loadEmployees, (state) => ({
    ...state,
    loading: true
  })),
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    loading: false,
  })),
  on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(EmployeeActions.loadEmployee, (state) => ({
    ...state,
    loading: true
  })),
  on(EmployeeActions.loadEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employee,
    loading: false,
  })),
  on(EmployeeActions.loadEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(EmployeeActions.addEmployee, (state, { employee }) => ({
    ...state,
    loading: true
  })),
  on(EmployeeActions.addEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    loading: false
  })),
  on(EmployeeActions.addEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(EmployeeActions.updateEmployee, (state, { employee }) => ({
    ...state,
    loading: true
  })),
  on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: state.employees.map((t) => (t.id === employee.id ? { ...employee } : t)),
    employee: { ...initialState.employee },
    loading: false
  })),
  on(EmployeeActions.updateEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(EmployeeActions.deleteEmployee, (state, { id }) => ({
    ...state,
    loading: true
  })),
  on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) => ({
    ...state,
    employees: state.employees.filter((t) => t.id !== id),
    employee: { ...initialState.employee },
    loading: false
  })),
  on(EmployeeActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);
