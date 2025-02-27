import { Component } from '@angular/core';
import { Employee } from './../../models/employee.model';
import {
  Observable,
  Subject
} from 'rxjs';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/store';
import { Actions, ofType } from '@ngrx/effects';
import * as EmployeeActions from './../../store/actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]> = new Observable<Employee[]>();
  private unsubscribe$ = new Subject<string>();
  searchText: string = '';
  public fullNameModelChanged: Subject<string> = new Subject<string>();

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
    this.employees$ = this.store.select((state) => state.employee.employees);
  }

  ngOnInit() {
    this.getEmployess();
    this.fullNameModelChanged
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((text) => {
        this.searchText = text;
        this.getEmployess();
      });
  }

  getEmployess() {
    this.store.dispatch(EmployeeActions.loadEmployees({ searchText: this.searchText }));
  }

  addEmployee() {
    this.router.navigate(['/addemployee']);
  }

  deleteEmployee(id: number) {
    this.store.dispatch(EmployeeActions.deleteEmployee({ id: id }));
  }

  editEmployee(id: number) {
    this.router.navigate(['/addemployee', id]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next('unsubscribe emit');
    this.unsubscribe$.complete();
    this.fullNameModelChanged.unsubscribe();
  }
}
