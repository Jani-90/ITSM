import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MakemodelComponent } from './makemodel/makemodel.component';
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
import { AgreementEditComponent } from './agreement-edit/agreement-edit.component';
import { AssetRegisterReportComponent } from './asset-register-report/asset-register-report.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { AssetModificationComponent } from './asset-modification/asset-modification.component';
import { AssetEditComponent } from './asset-edit/asset-edit.component';
import { JobProcessInhouseComponent } from './job-process-inhouse/job-process-inhouse.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { TicketReportComponent } from './ticket-report/ticket-report.component';
import { SelectivePreloadingStrategyService } from './services/selective-preloading-strategy.service';
import { EmployeeReportComponent } from './employee-report/employee-report.component';

const routes: Routes = [
  {
    path: 'makemodel',
    component: MakemodelComponent
  },
  {
    path: 'makemodel/edit/:id',
    component: MakeEditComponent
  },
  {
    path: 'makemodel/model/edit/:id',
    component: ModelEditComponent
  },
  {
    path: 'codegenerator',
    component: CodeGeneratorComponent
  },
  {
    path: 'codegenerator/edit/:id',
    component: AssetCategoryEditComponent
  },
  {
    path: 'codegenerator/type/edit/:id',
    component: AssetTypeEditComponent
  },
  {
    path: 'location',
    component: AssetLocationComponent
  },
  {
    path: 'location/edit/:id',
    component: AssetLocationEditComponent
  },
  {
    path: 'location/branch/edit/:id',
    component: BranchEditComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'employee/edit/:id',
    component: EmployeeEditComponent
  },
  {
    path: 'assetRegistration',
    component: AssetRegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'createTicket',
    component: CreateTicketComponent
  },
  {
    path: 'ticketSubmitted',
    component: TicketSubmittedComponent
  },
  {
    path: 'ticketSubmitted/view/:id',
    component: TicketSubmittedUpdateComponent
  },
  {
    path: 'ticketReceived',
    component: TicketReceivedComponent
  },
  {
    path: 'ticketReceived/view/:id',
    component: TicketReceivedUpdateComponent
  },
  {
    path: 'ticketOpened',
    component: TicketOpenedComponent
  },
  {
    path: 'vendor',
    component: VendorComponent
  },
  {
    path: 'job/view/:id',
    component: JobListComponent
  },
  {
    path: 'job/viewJob/:id',
    component: JobProcessComponent
  },
  {
    path: 'job/viewJobInhouse/:id',
    component: JobProcessInhouseComponent
  },
  {
    path: 'ticketClosed',
    component: TicketClosedComponent
  },
  {
    path: 'ticketClosed/view/:id',
    component: TicketClosedUpdateComponent
  },
  {
    path: 'superviserDashboard',
    component: SupervisorDashboardComponent,
    data: { preload: true }
  },
  {
    path: 'log',
    component: LogEnteringComponent
  },
  {
    path: 'vendor/edit/:id',
    component: VendorEditComponent
  },
  {
    path: 'logDetail',
    component: LogDetailComponent
  },
  {
    path: 'agreement',
    component: AgreementComponent
  },
  {
    path: 'agreement/edit/:id',
    component: AgreementEditComponent
  },
  {
    path: 'assetRegisterReport',
    component: AssetRegisterReportComponent
  },
  {
    path: 'userRole',
    component: UserRoleComponent
  },
  {
    path: 'assetModification',
    component: AssetModificationComponent
  },
  {
    path: 'assetRegistration/editAsset/:id',
    component: AssetEditComponent
  },
  {
    path: 'AuditTrail/:asset_serial',
    component: AuditTrailComponent
  },
  {
    path: 'ticketReport',
    component: TicketReportComponent
  },
  {
    path: 'employeeReport',
    component: EmployeeReportComponent
  },
  { path: '',   redirectTo: '/superviserDashboard', pathMatch: 'full' },
  
  
  
];



/*@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})*/


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: false, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategyService,
      }
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
