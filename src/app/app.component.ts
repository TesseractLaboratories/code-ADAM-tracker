import {ChangeDetectorRef, Component} from '@angular/core';
import {CodeService} from './code.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Code Adam Tracker';

  // ****** Temporary implementation of simple password barrier for the 2018 proof-of-concept
    constructor(private cookieService: CookieService) { }
    access = 'Kumoricon2018';
    dispatch = 'DispatchDave';
    passphrase: '';
    auth = false;
    submit() {
        if (this.passphrase === this.access) {
            this.auth = true;
            this.cookieService.set('kumoOps', 'true');
        } else if (this.passphrase === this.dispatch) {
            this.auth = true;
            this.cookieService.set('kumoDispatch', 'true');
        }
    }

    ngOnInit() {
        this.auth = this.cookieService.check('kumOps') || this.cookieService.check('kumoDispatch');
    }
    // **************************
}
