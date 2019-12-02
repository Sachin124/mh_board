import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { StudentService } from '../../student.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../../alert/validation.service';

@Component({
  selector: 'add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  studentForm: FormGroup;
  subjectsData: any;
  @Output() saveStudent = new EventEmitter < any > ();
  namePattern = ValidationService.namePattern;
  numbersOnly = ValidationService.numericOnly;

  constructor(private fb: FormBuilder, private studentService: StudentService) { }

  ngOnInit() {
    this.createForm();

    this.studentService.getSubjects().subscribe(res=>{
      this.subjectsData = res.data;
      console.log( this.subjectsData);

      for (let index = 0; index < this.subjectsData.length; index++) {
      const control = <FormArray>this.studentForm.controls['subjects'];
      control.push(this.initSubjects(this.subjectsData[index].subject_id));
      }
    
    },error=>{
      console.log(error);      
    })

  }


  createForm(){

    this.studentForm = this.fb.group({
      student_name:[],
      subjects: this.fb.array([
        // this.initSubjects()    
        ])
    });
  }

  initSubjects(subject_ids){
    return this.fb.group({
      subject_id: [subject_ids],
      marks_obtained:[]
    })
  };


  save(model: any) {
    // call API to save
    // ... 
    console.log(model);
    

    if (model.valid) {
   this.saveStudent.emit(model.value);
      
    }
   
}

}
