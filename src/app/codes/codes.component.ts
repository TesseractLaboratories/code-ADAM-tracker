import { Component, OnInit } from '@angular/core';
import { Code } from '../code';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['../app.component.css', './codes.component.css']
})
export class CodesComponent implements OnInit {

  constructor(private codeService: CodeService) { }

  codes: Code[];
  selectedCode: Code;

  getCodes(): void {
    this.codeService.getCodes()
        .subscribe(retrievedCodes => this.codes = retrievedCodes);
  }

  onSelect(code: Code): void {
    this.selectedCode = code;
  }

  ngOnInit() {
    this.getCodes();
  }

}

