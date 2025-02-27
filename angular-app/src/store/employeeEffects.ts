import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import * as EmployeeActions from './actions';
import { EmployeeService } from '../services/employee.service';

@Injectable()
export class EmployeeEffects {
  constructor(private actions$: Actions, private employeeService: EmployeeService) { }

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      switchMap((action) =>
        this.employeeService.getAllEmployee(action.searchText).pipe(
          map((employees: any) =>
            EmployeeActions.loadEmployeesSuccess({ employees })),
          catchError((error) =>
            of(EmployeeActions.loadEmployeesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployee),
      switchMap((action) =>
        this.employeeService.getEmployeeById(action.id).pipe(
          map((employee: any) =>
            EmployeeActions.loadEmployeeSuccess({ employee })),
          catchError((error) =>
            of(EmployeeActions.loadEmployeeFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addEmployee),
      switchMap((action) =>
        this.employeeService.createEmployee(action.employee).pipe(
          map(() => EmployeeActions.addEmployeeSuccess({ employee: action.employee })),
          catchError((error) =>
            of(EmployeeActions.addEmployeeFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      switchMap((action) =>
        this.employeeService.updateEmployee(action.employee).pipe(
          map(() =>
            EmployeeActions.updateEmployeeSuccess({ employee: action.employee })
          ),
          catchError((error) =>
            of(EmployeeActions.updateEmployeeFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      switchMap((action) =>
        this.employeeService.deleteEmployeeById(action.id).pipe(
          map(() => EmployeeActions.deleteEmployeeSuccess({ id: action.id })),
          catchError((error) =>
            of(EmployeeActions.deleteEmployeeFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
