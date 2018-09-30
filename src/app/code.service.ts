import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Code } from './code';
import {Observable, of} from 'rxjs';
import { MessageService } from './message.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  // TODO:: config this based on env
  private codesUrl = 'api/codes';

  getCodes(): Observable<Code[]> {
    // TODO:: send the message _after_ fetching codes
      this.log('Fetched codes');
      // TODO:: sort return by timestamp
    return this.http.get<Code[]>(this.codesUrl);
  }

  getUnresolvedCodes(): Observable<Code[]> {
    this.log('Fetching unresolved codes');
      return this.http.get<Code[]>(this.codesUrl)
          .pipe(
              // Return only unresolved codes
              // TODO:: replace with ES query
              map(codes => codes.filter(code => !code.resolved))
          );
  }

  private log(message: string) {
    this.messageService.add(`CodeService: ${message}`);
  }

  constructor(private http: HttpClient,
              private messageService: MessageService) { }


}
