import { Injectable } from '@angular/core';
import { Code } from './code';
import { MOCK_CODES } from './mock-codes';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  getCodes(): Code[] {
    return MOCK_CODES;
  }

  constructor() { }
}
