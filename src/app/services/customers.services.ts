import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellerInterFace } from './interfaces';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerServices {
  constructor(private http: HttpClient) {}

  private customersURL = 'https://bonnaterra-backend.vercel.app/customers';

  getAllCustomers() {
    return this.http
      .get<SellerInterFace[]>(this.customersURL)
      .pipe(catchError(this.handleError));
  }

  createCustomer(customerData: {
    customerName: string;
    customerJob: string;
    customerPhone: string;
    customerEmail: string;
      customerAge: number;
      nationality: string;
  }) {
    return this.http
      .post<any>(this.customersURL, customerData)
      .pipe(catchError(this.handleError));
  }

  //update

  updateCustomer(customerId: string, sellerData: SellerInterFace) {
    return this.http
      .patch<any>(`${this.customersURL}/${customerId}`, sellerData)
      .pipe(catchError(this.handleError));
  }

    // Delete a Customer by ID
    deleteCustomer(customerId: string) {
        return this.http
          .delete<any>(`${this.customersURL}/${customerId}`, )
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
