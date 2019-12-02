import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StudentInfoRoutingModule } from './student-info-routing.module';
import { StudentInfoComponent } from './student-info/student-info.component';
import { AddStudentComponent } from './student-info/add-student/add-student.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ViewMarksComponent } from './student-info/view-marks/view-marks.component';
import { MaterialModule } from 'app/app.module';
import { TagInputModule } from 'ngx-chips';
import { NouisliderModule } from 'ng2-nouislider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AlertService } from 'app/alert/alert.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StudentInfoRoutingModule),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    MatTooltipModule,
    TagInputModule,
    MaterialModule
  ],
  declarations: [StudentInfoComponent, AddStudentComponent, ViewMarksComponent],
  providers:[AlertService]
})
export class StudentInfoModule { }
