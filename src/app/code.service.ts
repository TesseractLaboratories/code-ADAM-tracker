import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Code } from './code';
import {Observable, of} from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    Headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  // TODO:: config this based on env
  private codesUrl = 'api/codes';



  getCodes(): Observable<Code[]> {
      this.log('Requesting codes...');
      // TODO:: sort return by timestamp
    return this.http.get<Code[]>(this.codesUrl)
        .pipe(
            tap(codes => this.log('Fetched codes')),
            catchError(this.handleError('getCodes', []))
        );
  }

  getUnresolvedCodes(): Observable<Code[]> {
    this.log('Requesting unresolved codes...');
      return this.http.get<Code[]>(this.codesUrl)
          .pipe(
              // Return only unresolved codes
              // TODO:: replace with ES query
              map(codes => codes.filter(code => !code.resolved))
          )
          .pipe(
              tap(codes => this.log('Fetched codes')),
              catchError(this.handleError('getUnresolvedCodes', []))
          );
  }

  getCode(id: number): Observable<Code> {
    const url = `${this.codesUrl}/${id}`;
    return this.http.get<Code>(url).pipe(
        tap(_ => this.log(`fetched code id=${id}`),
        catchError(this.handleError<Code>(`getCode id=${id}`)))
    );
  }

  updateCode(code: Code): Observable<any> {
    return this.http.put(this.codesUrl, code,  httpOptions).pipe(
      tap(_ => this.log(`updated code id=${code.id}`)),
      catchError(this.handleError<any>('updateCode'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {

      // TODO:: send the error to remote logging infrasttructure
        console.error(error);

        // TODO:: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`CodeService: ${message}`);
  }

  constructor(private http: HttpClient,
              private messageService: MessageService) { }


}
