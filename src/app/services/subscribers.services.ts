import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SubscriberInterface } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class SubscribersServices {
  private subscribersUrl = 'https://bonnaterra-backend.vercel.app/subscribers'; // Base URL
  // Retrieve the token from local storage
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.token ? `Bearer ${this.token}` : '',
  });
  constructor(private http: HttpClient) {}

  getAllSubscribers() {
    // Set up the headers including the Bearer token if it exists

    // Make the HTTP GET request with headers
    return this.http
      .get<SubscriberInterface[]>(this.subscribersUrl, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  getSubscriberByUd(subscriberId: string) {
    return this.http
      .get<SubscriberInterface>(`${this.subscribersUrl}/${subscriberId}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  // Create a Subscriber
  createSubscriber(subscriberData: {
    subscriberEmail: string;
    subscriberName: string;
  }) {
    return this.http
      .post<any>(this.subscribersUrl, subscriberData, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Update Subscriber
  updateSubscriber(subscriberId: string, subscriberData: SubscriberInterface) {
    return this.http
      .patch<any>(`${this.subscribersUrl}/${subscriberId}`, subscriberData, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  // Delete a Subscriber by ID
  deleteSubscriber(subscriberId: string) {
    return this.http
      .delete<any>(`${this.subscribersUrl}/${subscriberId}`, {
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
