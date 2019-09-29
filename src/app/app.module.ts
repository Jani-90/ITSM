import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MakemodelComponent } from './makemodel/makemodel.component';

import { MakeService } from './services/make.service';
import { PagerService } from './services/pager.service';
import { ModelService } from './services/model.service';
import { TypeService } from './services/type.service';
import { LocationService } from './services/location.service';
import { BranchService } from './services/branch.service';
import { EmployeeService } from './services/employee.service';
import { AssetService } from './services/asset.service';
import { TicketService } from './services/ticket.service';
import { TicketSubmittedService } from './services/ticketSubmitted.service';
import { TicketReceivedService } from './services/ticketReceived.service';
import { JobService } from './services/job.service';
import { VendorService } from './services/vendor.service';
import { LogService } from './services/log.service';

import { MakeEditComponent } from './make-edit/make-edit.component';
import { ModelEditComponent } from './model-edit/model-edit.component';
import { CodeGeneratorComponent } from './code-generator/code-generator.component';
import { AssetCategoryEditComponent } from './asset-category-edit/asset-category-edit.component';
import { AssetTypeEditComponent } from './asset-type-edit/asset-type-edit.component';
import { AssetLocationComponent } from './asset-location/asset-location.component';
import { AssetLocationEditComponent } from './asset-location-edit/asset-location-edit.component';
import { BranchEditComponent } from './branch-edit/branch-edit.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { AssetRegistrationComponent } from './asset-registration/asset-registration.component';
import { LoginComponent } from './login/login.component';
import { DataService } from './services/data.service';
import { JwtModule } from '@auth0/angular-jwt';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TicketSubmittedComponent } from './ticket-submitted/ticket-submitted.component';
import { TicketSubmittedUpdateComponent } from './ticket-submitted-update/ticket-submitted-update.component';
import { TicketReceivedComponent } from './ticket-received/ticket-received.component';
import { TicketReceivedUpdateComponent } from './ticket-received-update/ticket-received-update.component';
import { TicketOpenedComponent } from './ticket-opened/ticket-opened.component';
import { VendorComponent } from './vendor/vendor.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobProcessComponent } from './job-process/job-process.component';
import { TicketClosedUpdateComponent } from './ticket-closed-update/ticket-closed-update.component';
import { TicketClosedComponent } from './ticket-closed/ticket-closed.component';
import { SupervisorDashboardComponent } from './supervisor-dashboard/supervisor-dashboard.component';
import { LogEnteringComponent } from './log-entering/log-entering.component';
import { VendorEditComponent } from './vendor-edit/vendor-edit.component';
import { LogDetailComponent } from './log-detail/log-detail.component';
import { AgreementComponent } from './agreement/agreement.component';
import { AgreementService } from './services/agreement.service';
import { AgreementEditComponent } from './agreement-edit/agreement-edit.component';
import { VendorRatingService } from './services/vendorRating.service';
import { AgreementRenewalService } from './services/agreementRenewal.service';
import { AssetRegisterReportComponent } from './asset-register-report/asset-register-report.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { AssetModificationComponent } from './asset-modification/asset-modification.component';
import { AssetEditComponent } from './asset-edit/asset-edit.component';
import { ActivityLogService } from './services/activityLog.service';
import { JobProcessInhouseComponent } from './job-process-inhouse/job-process-inhouse.component';
import { AssetAuditTrailService } from './services/assetAuditTrail.service';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { TicketReportComponent } from './ticket-report/ticket-report.component';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
//import { MdRadioModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    MakemodelComponent,
    MakeEditComponent,
    ModelEditComponent,
    CodeGeneratorComponent,
    AssetCategoryEditComponent,
    AssetTypeEditComponent,
    AssetLocationComponent,
    AssetLocationEditComponent,
    BranchEditComponent,
    EmployeeComponent,
    EmployeeEditComponent,
    AssetRegistrationComponent,
    LoginComponent,
    CreateTicketComponent,
    TicketSubmittedComponent,
    TicketSubmittedUpdateComponent,
    TicketReceivedComponent,
    TicketReceivedUpdateComponent,
    TicketOpenedComponent,
    VendorComponent,
    JobListComponent,
    JobProcessComponent,
    TicketClosedUpdateComponent,
    TicketClosedComponent,
    SupervisorDashboardComponent,
    LogEnteringComponent,
    VendorEditComponent,
    LogDetailComponent,
    AgreementComponent,
    AgreementEditComponent,
    AssetRegisterReportComponent,
    UserRoleComponent,
    AssetModificationComponent,
    AssetEditComponent,
    JobProcessInhouseComponent,
    AuditTrailComponent,
    TicketReportComponent,
    EmployeeReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SlimLoadingBarModule,
    //MdRadioModule,
    
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('access_token');},
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['http://localhost:4200/login']
      }
    })

  ],
  providers: [ MakeService, PagerService, ModelService, TypeService, LocationService, 
    BranchService, EmployeeService, AssetService, DataService, TicketService, TicketSubmittedService,
    TicketReceivedService, JobService, VendorService, LogService, AgreementService, VendorRatingService,
    AgreementRenewalService, ActivityLogService, AssetAuditTrailService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
