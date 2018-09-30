import { Component, OnInit } from '@angular/core';
import { Code } from '../code';
import {CodeService} from '../code.service';
import {Location} from '@angular/common';



@Component({
  selector: 'app-submit-report',
  templateUrl: './submit-report.component.html',
  styleUrls: ['../app.component.css', './submit-report.component.css']
})
export class SubmitReportComponent implements OnInit {
  code: Code;
  private location: Location;

  upload(): void {
    // TODO:: need a new method?
    this.codeService.updateCode(this.code)
        .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }


  constructor(private codeService: CodeService) { }

  ngOnInit() {
    this.code = Code.emptyCode();
  }

}
