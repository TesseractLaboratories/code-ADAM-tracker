import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CodesComponent } from './codes/codes.component';
import { CodeDetailComponent } from './code-detail/code-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CodesComponent,
    CodeDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
