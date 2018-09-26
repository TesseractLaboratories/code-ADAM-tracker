import { Component, OnInit } from '@angular/core';
import { Code } from '../code';
import { MOCK_CODES } from '../mock-codes';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['../app.component.css', './codes.component.css']
})
export class CodesComponent implements OnInit {

  constructor() { }
    codes = MOCK_CODES;
    selectedCode: Code;

    onSelect(code: Code): void {
      this.selectedCode = code;
    }

  ngOnInit() {
  }

}

