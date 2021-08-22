import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { IStudent } from './scores/student';

@Injectable({
  providedIn: 'root'
})
export class StudentScoresService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getStudentsAndScores(): Observable<IStudent[]>{
    return this.http.get<IStudent[]>(this.baseUrl + 'api/Students')
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
