import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StudentService } from '../student.service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'app/alert/alert.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
  modalRef: BsModalRef;
  rows: any;
  studentData: any;
  constructor(private modalService: BsModalService,private alertService: AlertService, private toastr: ToastrService,private studentService: StudentService) {}
 
 
  ngOnInit() {
    this.getData();
  }

  getData(){
    this.studentService.getStudents().subscribe(res=>{
      this.rows = res.data;
    },error=>{
      console.log(error);      
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  viewStudent(template1: TemplateRef<any>, student_id) {
    this.modalRef = this.modalService.show(template1);
    this.studentService.getStudentsMarkSheet(student_id).subscribe(res=>{
      this.studentData = res;

    },error=>{
      console.log(error);      
    })
  }

  close(){
    this.modalRef.hide();
  }

  saveStudent(event){
    this.studentService.addStudent(event).subscribe(res=>{
      if (res.status == 1) {
        this.toastr.success('Success', res.message);
        this.getData();
        this.close();
      }
    }, error=>{
      console.log(error);
     
        this.toastr.error('Error', error);
    })
  }

  deleteStudent(studentId: number) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#dc2265",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger"
    }).then(result => {
      if (result.value) {
        this.studentService.deleteStudent(studentId).subscribe(
          res => {
            this.alertService.showNotification("bottom", "right", 'Student Deleted');
            this.getData();
          },
          error => {
            this.alertService.actionAlert(
              error.error.message,
              "Student Not Deleted",
              "error"
            );
          }
        );
      }
    });
  }
}
