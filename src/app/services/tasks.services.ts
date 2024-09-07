import { TaskInterface } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TaskServices {
  private tasksUrl = 'https://bonnaterra-backend.vercel.app/tasks'; // Base URL

  constructor(private http: HttpClient) {}

  //  Get all tasks related to user
  getTasks() {
    return this.http
        .get<TaskInterface[]>(`${this.tasksUrl}/createdbyme`,{
          withCredentials:true
      })
      .pipe(catchError(this.handleError));
  }
  // GEt all assigned Taks by the user 
  getTasksAssignedByUser() {
    return this.http
    .get<TaskInterface[]>(`${this.tasksUrl}/assigned/by/me`,{
      withCredentials:true
  })
  .pipe(catchError(this.handleError));
  }

    // GEt all assigned Taks by the user 
    getTasksAssignedToUser() {
      return this.http
      .get<TaskInterface[]>(`${this.tasksUrl}/assigned/to/me`,{
        withCredentials:true
    })
    .pipe(catchError(this.handleError));
    }
  
  // Get a task by ID
  getTaskByID(taskId: string) {
    return this.http
      .get<TaskInterface>(`${this.tasksUrl}/${taskId}`)
      .pipe(catchError(this.handleError));
  }



  // Create a task with FormData
  createTask(formData: FormData) {
    return this.http
      .post<any>(this.tasksUrl, formData)
      .pipe(catchError(this.handleError));
  }

  // Method to update a task with FormData
  updateTask(taskId: string, formData: FormData) {
    return this.http
      .patch<any>(`${this.tasksUrl}/${taskId}`, formData)
      .pipe(catchError(this.handleError));
  }

  // Delete a task by ID
  deleteTask(taskId: string) {
    return this.http
      .delete<any>(`${this.tasksUrl}/${taskId}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling method
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
