import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';


export const routes: Routes = [
  { path: 'addemployee', component: AddEmployeeComponent },
  { path: 'addemployee/:id', component: AddEmployeeComponent },
  { path: '**', component: EmployeeListComponent },
];