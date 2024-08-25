import { inject, Injectable } from '@angular/core';
import { httpInject } from './httpclient';
import { CategoryInetrface } from './interfaces';
import { catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesServices {
  http = inject(HttpClient);

  // base URL

  private categoriesURl = 'https://bonnaterra-backend.vercel.app/categories';

  // get categories
   getCategories() {
    // Return the observable directly instead of awaiting it
    return this.http
      .get<CategoryInetrface[]>(this.categoriesURl)
      .pipe(catchError(this.handleError));
  }

  // get category with id

  // create category
   createCategory(catData: {
    categoryName: string;
    categoryArabicName: string;
    categoryDescription: string;
  }) {
      return this.http.post<any>(this.categoriesURl,catData).pipe(catchError(this.handleError))
  }

  // update category

  // delete category

  //handle error
  private handleError(error: any) {
    console.log(error);
    return throwError(() => new Error('something went wrong'));
  }
}
