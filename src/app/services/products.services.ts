import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { GetProductInterface, ProductInterface } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsServices {
  private productsUrl = 'https://bonnaterra-backend.vercel.app/products'; // Base URL

  constructor(private http: HttpClient) {}

  //  Get all products
  getProducts() {
    return this.http
      .get<GetProductInterface[]>(this.productsUrl)
      .pipe(catchError(this.handleError));
  }

  // Get a product by ID
  getProductByID(productId: string) {
    return this.http
      .get<ProductInterface>(`${this.productsUrl}/${productId}`)
      .pipe(catchError(this.handleError));
  }

  // Create a product with FormData
  createProduct(formData: FormData) {
    return this.http
      .post<any>(this.productsUrl, formData)
      .pipe(catchError(this.handleError));
  }

  // Method to update a product with FormData
  updateProduct(productId: string, formData: FormData) {
    return this.http
      .patch<any>(`${this.productsUrl}/${productId}`, formData)
      .pipe(catchError(this.handleError));
  }

  // Delete a product by ID
  deleteProduct(productId: string) {
    return this.http
      .delete<any>(`${this.productsUrl}/${productId}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling method
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
