import { Component, OnInit } from '@angular/core';
import { Employee } from './../../models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AppState } from '../../store/store';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as EmployeeActions from './../../store/actions';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  newEmployee: Employee = {
    id: 0,
    name: '',
    createdDate: null,
  };
  employee$: Observable<Employee> = new Observable<Employee>();
  submitBtnText: string = 'Create';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private _actions$: Actions
  ) {
    this.employee$ = this.store.select((state) => state.employee.employee);
  }

  ngOnInit(): void {
    const employeeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (employeeId) {
      this.employee$.subscribe((employee) => {
        this.newEmployee = { ...employee } as Employee;
      });
      this.getEmployee(Number(employeeId));
    }

    this._actions$
      .pipe(ofType(EmployeeActions.addEmployeeSuccess))
      .subscribe((data: any) => {
        this.router.navigate(['/']);
      });
    this._actions$
      .pipe(ofType(EmployeeActions.updateEmployeeSuccess))
      .subscribe((data: any) => {
        this.router.navigate(['/']);
      });
  }

  getEmployee(employeeId: number) {
    this.store.dispatch(EmployeeActions.loadEmployee({ id: employeeId }));
    this.submitBtnText = 'Edit';
  }

  saveEmployee() {
    if (!this.newEmployee.name) return;
    if (this.newEmployee.id === 0) {
      this.store.dispatch(
        EmployeeActions.addEmployee({ employee: { ...this.newEmployee } })
      );
    } else {
      this.store.dispatch(
        EmployeeActions.updateEmployee({ employee: { ...this.newEmployee } })
      );
    }
  }
}
