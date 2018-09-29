import { Injectable } from '@angular/core';
import { Code } from './code';
import { MOCK_CODES } from './mock-codes';
import {Observable, of} from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  getCodes(): Observable<Code[]> {
    // TODO:: send the message _after_ fetching codes
      this.messageService.add('CodeService: Fetched codes');
      // TODO:: sort return by timestamp
    return of(MOCK_CODES);
  }

  getUnresolvedCodes(): Observable<Code[]> {
    this.messageService.add('CodeService: Fetching unresolved codes');
    return of(MOCK_CODES.filter(code => !code.resolved));
  }

  constructor(private messageService: MessageService) { }
}
