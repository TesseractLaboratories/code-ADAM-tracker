import { Component, OnInit, Input } from '@angular/core';
import { Code } from '../code';

@Component({
  selector: 'app-code-detail',
  templateUrl: './code-detail.component.html',
  styleUrls: ['../app.component.css', './code-detail.component.css']
})

export class CodeDetailComponent implements OnInit {
  @Input() code: Code;
  imageDisplay = false;

  showImage(): void {
    this.imageDisplay = !this.imageDisplay;
  }

  styleCode(code: Code): string {
    return Code.getTimeMissingCss(code,  false);
  }

  codeTimeMissing(code: Code): string {
    return Code.getTimeMissing(code);
  }

  updateFound(code: Code): void {
    Code.toggleFound(code);
  }

  constructor() { }

  ngOnInit() {
  }

}
