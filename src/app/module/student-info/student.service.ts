import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getSubjects():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'get-subjects');
  }

  addStudent(studentData):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'add-student', studentData);
  }

  getStudents():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'get-students');
  }

  getStudentsMarkSheet(studentId):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl+'view-student/'+studentId}`);
  }

  deleteStudent(studentId):Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl+'delete-student/'+studentId}`)
  }
}
