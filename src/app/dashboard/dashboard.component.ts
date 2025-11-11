import { Component, OnInit } from '@angular/core';
import {CodeService} from '../code.service';
import {Code} from '../code';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.css', './dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private codeService: CodeService) { }

    codes: Code[];
    selectedCode: Code;

    getActiveCodes(): void {
      // Display only unresolved codes in the dashboard
        this.codeService.getUnresolvedCodes().then(response => this.codes = CodeService.processResponse(response));
    }

    onSelect(code: Code): void {
        this.selectedCode = code;
    }

    close(): void {
        this.selectedCode = null;
    }

    refresh(): void {
        this.getActiveCodes();
    }

    styleGridModule(code: Code): string {
        return Code.getTimeMissingCss(code,  true);
    }
    ngOnInit() {
        this.getActiveCodes();
    }

}
