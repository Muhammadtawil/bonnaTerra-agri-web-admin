import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class PostServices{
    constructor() { }
    
    private apiUrl = 'https://bonnaterra-backend.vercel.app/sellers'
    
    http = inject(HttpClient)
    $posts = this.getPosts();

    getPosts() {
        return this.http.get<any>(this.apiUrl).pipe(catchError(this.handleError))
    }

    private handleError(error: any){
        console.log(error);
        return throwError(()=>new Error('something went wrong'));
    }
}
