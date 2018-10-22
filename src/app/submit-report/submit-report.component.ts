import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Code } from '../code';
import {CodeService} from '../code.service';
import {Location} from '@angular/common';
import { CookieService } from 'ngx-cookie-service';


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
  access = 'DispatchDave';
  passphrase: '';
  auth = false;

  submit() {
    if (this.passphrase === this.access) {
      this.auth = true;
      this.cookieService.set('kumoDispatch', 'true');
    }
  }

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
         });
  }

  goBack(): void {
    this.location.back();
  }


  constructor(private codeService: CodeService, private changeDetectorRef: ChangeDetectorRef, private cookieService: CookieService) { }

  ngOnInit() {
    this.getCodes();
    this.auth = this.cookieService.check('kumoDispatch');

    // Any time we're building a new report, keep the Time Reported current
    setInterval(() => {
      if (!this.code.id) {
        this.code.timestampLogged = (new Date).getTime();
      }
    }, 1000);
  }

// ***Transplanted from Code Detail
    styleCode(code: Code): string {
        return Code.getTimeMissingCss(code,  false);
    }

    codeTimeMissing(code: Code): string {
        return Code.getTimeMissing(code);
    }

    updateFound(code: Code): void {
        Code.toggleFound(code);
    }
}
