import { Component, OnInit } from '@angular/core';
import { Code } from '../code';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit {
    code: Code = {
      id: 1,
      name: 'Jimmy Losttot',
      age: 14,
      gender: 'M',
      cosplay: 'n/a',
      descriptionPhysical: '4\', looks very lost',
      descriptionClothing: 'green tee, jeans',
      lastSeen: 'pendulum atrium',
      timestamp: 1526920054000,
      resolved: false
    };

  constructor() { }

  ngOnInit() {
  }

}

