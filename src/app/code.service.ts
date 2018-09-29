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
    return of(MOCK_CODES);
  }

  constructor(private messageService: MessageService) { }
}
