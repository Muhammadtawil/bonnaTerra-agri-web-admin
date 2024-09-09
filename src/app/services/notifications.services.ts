import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationInertface, SellerInterFace } from './interfaces';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationServices {
  constructor(private http: HttpClient) {}

  private notificationURL = 'https://bonnaterra-backend.vercel.app/notifications';

  getAllNotifications() {
    return this.http
      .get<NotificationInertface[]>(`${this.notificationURL}/usernotifications`,{
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  getSellerById(sellerId: string) {
    return this.http
    .get<SellerInterFace>(`${this.notificationURL}/${sellerId}`,)
    .pipe(catchError(this.handleError));
  }

  createSeller(sellerData: {
    SellerName: string;
    sellerEmail: string;
    sellerOffer: string;
    sellerWebsite: string;
    sellerPhone: number;
  }) {
    return this.http
      .post<any>(this.notificationURL, sellerData)
      .pipe(catchError(this.handleError));
  }

  //update

  updateSeller(sellerId: string, sellerData: SellerInterFace) {
    return this.http
      .patch<any>(`${this.notificationURL}/${sellerId}`, sellerData)
      .pipe(catchError(this.handleError));
  }

    // Delete a Seller by ID
    deleteSeller(sellerId: string) {
        return this.http
          .delete<any>(`${this.notificationURL}/${sellerId}`, )
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
