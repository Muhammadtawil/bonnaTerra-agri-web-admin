import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellerInterFace } from './interfaces';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerServices {
  constructor(private http: HttpClient) {}

  private sellersURL = 'https://bonnaterra-backend.vercel.app/sellers';

  getAllSellers() {
    return this.http
      .get<SellerInterFace[]>(this.sellersURL)
      .pipe(catchError(this.handleError));
  }

  getSellerById(sellerId: string) {
    return this.http
    .get<SellerInterFace>(`${this.sellersURL}/${sellerId}`,)
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
      .post<any>(this.sellersURL, sellerData)
      .pipe(catchError(this.handleError));
  }

  //update

  updateSeller(sellerId: string, sellerData: SellerInterFace) {
    return this.http
      .patch<any>(`${this.sellersURL}/${sellerId}`, sellerData)
      .pipe(catchError(this.handleError));
  }

    // Delete a Seller by ID
    deleteSeller(sellerId: string) {
        return this.http
          .delete<any>(`${this.sellersURL}/${sellerId}`, )
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
