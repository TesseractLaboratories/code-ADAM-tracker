import { Component, OnInit, Input } from '@angular/core';
import { Code } from '../code';

@Component({
  selector: 'app-code-detail',
  templateUrl: './code-detail.component.html',
  styleUrls: ['../app.component.css', './code-detail.component.css']
})

export class CodeDetailComponent implements OnInit {
  @Input() code: Code;

  constructor() { }

  ngOnInit() {
  }

}
