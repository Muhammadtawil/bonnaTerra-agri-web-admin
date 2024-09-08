import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private apiUrl = 'https://bonnaterra-backend.vercel.app/users'; // Base URL

  http = inject(HttpClient);

  constructor() {}

  // Method to perform login
  login(credentials: { userEmail: string; password: string }) {
    return this.http
      .post<any>(`${this.apiUrl}/login`, credentials, {
        withCredentials: true, // Ensure cookies are sent with the request
      })
      .pipe(catchError(this.handleError));
  }
  // Method to get user info based on token
  getUserInfo() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return throwError(() => new Error('User is not authenticated.'));
    }

    return this.http
      .get<any>(`${this.apiUrl}/${userId}`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }


    // Method to get user info based on token
    getUsersInfo() {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        return throwError(() => new Error('User is not authenticated.'));
      }
  
      return this.http
        .get<any>(`${this.apiUrl}/allusers`, { withCredentials: true })
        .pipe(catchError(this.handleError));
    }
  // update user
  updateUser(formData: FormData) {
    return this.http
      .patch<any>(`${this.apiUrl}/update`, formData, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong.'));
  }
}
