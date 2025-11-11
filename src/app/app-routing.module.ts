import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodesComponent } from './codes/codes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CodeDetailComponent } from './code-detail/code-detail.component';
import {SubmitReportComponent} from './submit-report/submit-report.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'codes', component: CodesComponent },
    { path: 'dispatch', component: SubmitReportComponent },
    { path: 'detail/:id', component: CodeDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
