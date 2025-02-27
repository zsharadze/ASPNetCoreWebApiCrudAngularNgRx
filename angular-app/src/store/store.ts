import { Action, ActionReducer } from '@ngrx/store';
import { EmployeeState, employeeReducer } from './reducers';
import { EmployeeEffects } from './employeeEffects';

export interface AppState {
  employee: EmployeeState;
}

export interface AppStore {
  employee: ActionReducer<EmployeeState, Action>;
}

export const appStore: AppStore = {
  employee: employeeReducer,
};

export const appEffects = [EmployeeEffects];
