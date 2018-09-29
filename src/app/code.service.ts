import { Injectable } from '@angular/core';
import { Code } from './code';
import { MOCK_CODES } from './mock-codes';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  getCodes(): Observable<Code[]> {
    return of(MOCK_CODES);
  }

  constructor() { }
}
