import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Code } from '../code';
import {CodeService} from '../code.service';
import {Location} from '@angular/common';
import {getOrCreateChangeDetectorRef} from '@angular/core/src/render3/di';



@Component({
  selector: 'app-submit-report',
  templateUrl: './submit-report.component.html',
  styleUrls: ['../app.component.css', './submit-report.component.css']
})
export class SubmitReportComponent implements OnInit {
  code: Code;
  newReport: Code;
  codes: Code[];
  id: number;
  private location: Location;
  access = 'Kumoricon2018';
  passphrase: '';

  getCodes(): void {
      this.codeService.getCodes().then(response => {
        this.codes = CodeService.processResponse(response);
        this.newReport = this.newCode();
        if (!this.code) {
          this.code = this.newReport;
        }
        this.changeDetectorRef.detectChanges();
      });
  }

  newCode(): Code {
    return Code.emptyCode();
  }

  upload(): void {
    // TODO:: need a new method?
      if (!this.code.id) {
          // New code with highest+1 ID value
          // TODO:: This is a hacky assumption and can be improved with better database handling
          this.code.id = this.codes.length ? this.codes.reduce((prev, current) => (prev.id > current.id) ? prev : current).id + 1 : 1;
      }
    this.codeService.updateCode(this.code)
         .then(() => {
           this.getCodes();
           // this.newReport = this.newCode();
           // location.reload();
         });
  }

  goBack(): void {
    this.location.back();
  }


  constructor(private codeService: CodeService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getCodes();
  }

}
