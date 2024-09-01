import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { TestimonialInterface } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class TestimonialsServices {
  private testimonialsUrl = 'https://bonnaterra-backend.vercel.app/testimonials'; // Base URL
  // Retrieve the token from local storage
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders({
    Authorization: this.token ? `Bearer ${this.token}` : '',
  });
  constructor(private http: HttpClient) {}

  getAllTestiminials() {
    // Set up the headers including the Bearer token if it exists

    // Make the HTTP GET request with headers
    return this.http
      .get<TestimonialInterface[]>(this.testimonialsUrl, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  getTestiminialByUd(testimonialId: string) {
    return this.http
      .get<TestimonialInterface>(`${this.testimonialsUrl}/${testimonialId}`, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  // Create a Testiminial
  createTestiminial(formData:FormData) {
    return this.http
      .post<any>(this.testimonialsUrl, formData, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Update Testiminial
  updateTestiminial(testimonialId: string,formData:FormData) {
    return this.http
      .patch<any>(`${this.testimonialsUrl}/${testimonialId}`, formData, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  // Delete a Testiminial by ID
  deleteTestiminial(testimonialId: string) {
    return this.http
      .delete<any>(`${this.testimonialsUrl}/${testimonialId}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  // Error handling method
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
