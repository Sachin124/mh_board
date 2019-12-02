
import { Routes } from '@angular/router';
import { StudentInfoComponent } from './student-info/student-info.component';

export const StudentInfoRoutingModule:Routes =[
  {
    path: '',
    children: [ {
      path: '',
      component: StudentInfoComponent
  }]}
];