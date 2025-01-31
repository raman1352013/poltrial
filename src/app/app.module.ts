/*Dependencies Start*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { Injector } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BaseService } from './services/base/base.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap'
// import { Chart } from 'chart.js';

/*Views End*/

/*Component Start*/
import { HttpErrorInterceptor } from './services/common/app-error-handler.service';
import { AppCustomPreloader } from './app-routing-loader';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialog2Component } from './components/confirmation-dialog2/confirmation-dialog2.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { PaymentComponent } from './views/payment/payment.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.component';
import { PaymentSucessComponent } from './views/payment-sucess/payment-sucess.component';
import { UserDetailsComponent } from './views/user-details/user-details.component';
import { AdmitCardComponent } from './views/admit-card/admit-card.component';
import { AttendanceComponent } from './views/attendance/attendance.component';
import { HeightComponent } from './views/height/height.component';
import { ChestComponent } from './views/chest/chest.component';
import { RaceComponent } from './views/race/race.component';
import { HighJumpComponent } from './views/high-jump/high-jump.component';
import { BroadJumpComponent } from './views/broad-jump/broad-jump.component';
import { PetDetailsComponent } from './views/pet-details/pet-details.component';
// import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { DriverComponent } from './views/driver/driver.component';
import { AppealComponent } from './views/appeal/appeal.component';
import { SummaryComponent } from './views/summary/summary.component';
import { ResultComponent } from './views/result/result.component';
import { IndividualResultComponent } from './views/individual-result/individual-result.component';
import { DailySummaryComponent } from './views/daily-summary/daily-summary.component';
import { PstPassComponent } from './views/pst-pass/pst-pass.component';
import { PstFailComponent } from './views/pst-fail/pst-fail.component';
import { PstPendingComponent } from './views/pst-pending/pst-pending.component';
import { PetPassComponent } from './views/pet-pass/pet-pass.component';
import { PetPendingComponent } from './views/pet-pending/pet-pending.component';
import { DriverPassComponent } from './views/driver-pass/driver-pass.component';
import { DriverFailComponent } from './views/driver-fail/driver-fail.component';
import { RegisteredUserComponent } from './views/registered-user/registered-user.component';
import { PetFailComponent } from './views/pet-fail/pet-fail.component';
import { AllowProvisionedComponent } from './views/allow-provisioned/allow-provisioned.component';
import { RejectedAtRegistrationComponent } from './views/rejected-at-registration/rejected-at-registration.component';
import { RejectedAfterRegistrationComponent } from './views/rejected-after-registration/rejected-after-registration.component';
import { AbsentAfterRegistrationComponent } from './views/absent-after-registration/absent-after-registration.component';
import { IndividualProfileUpdateComponent } from './views/individual-profile-update/individual-profile-update.component';
import { UploadDocumentComponent } from './views/upload-document/upload-document.component';
import { ScheduleExamComponent } from './views/schedule-exam/schedule-exam.component';
import { NewReportComponent } from './views/new-report/new-report.component';
import { AdmitCardScrutinyComponent } from './views/admit-card-scrutiny/admit-card-scrutiny.component';
import { ScrutinyDetailsComponent } from './views/scrutiny-details/scrutiny-details.component';
import { DocVerificationRegComponent } from './views/doc-verification-reg/doc-verification-reg.component';
import { DocVerificationEduQualificationComponent } from './views/doc-verification-edu-qualification/doc-verification-edu-qualification.component';
import { DocVerificationBackwardAreaComponent } from './views/doc-verification-backward-area/doc-verification-backward-area.component';
import { DocVerificationLmvComponent } from './views/doc-verification-lmv/doc-verification-lmv.component';
import { DocVerificationNccComponent } from './views/doc-verification-ncc/doc-verification-ncc.component';
import { DocVerificationDownloadResultComponent } from './views/doc-verification-download-result/doc-verification-download-result.component';
import { DocVerificationDownloadRowDataComponent } from './views/doc-verification-download-row-data/doc-verification-download-row-data.component';
import { DocVerificationScrutinySummComponent } from './views/doc-verification-scrutiny-summ/doc-verification-scrutiny-summ.component';
import { DocVerificationIndividualResultComponent } from './views/doc-verification-individual-result/doc-verification-individual-result.component';
import { DocVerificationAppealComponent } from './views/doc-verification-appeal/doc-verification-appeal.component';
import { DailySummaryScrutinyComponent } from './views/daily-summary-scrutiny/daily-summary-scrutiny.component';
import { DailySummaryScrutinyEduComponent } from './views/daily-summary-scrutiny-edu/daily-summary-scrutiny-edu.component';
import { DailySummaryScrutinyLandComponent } from './views/daily-summary-scrutiny-land/daily-summary-scrutiny-land.component';
import { DailySummaryScrutinyLmvComponent } from './views/daily-summary-scrutiny-lmv/daily-summary-scrutiny-lmv.component';
import { DailySummaryScrutinyNssComponent } from './views/daily-summary-scrutiny-nss/daily-summary-scrutiny-nss.component';
import { DailySummaryScrutinyNccComponent } from './views/daily-summary-scrutiny-ncc/daily-summary-scrutiny-ncc.component';
import { DisqualifyCandidateComponent } from './views/disqualify-candidate/disqualify-candidate.component';
// import { ExamDetailsComponent } from './views/exam-details/exam-details.component';
// import { AdmitCardExamComponent } from './views/admit-card-exam/admit-card-exam.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    ConfirmationDialogComponent,
    ConfirmationDialog2Component,
    // DisqualifyCandidateComponent,
    // DailySummaryScrutinyEduComponent,
    // DailySummaryScrutinyLandComponent,
    // DailySummaryScrutinyLmvComponent,
    // DailySummaryScrutinyNssComponent,
    // DailySummaryScrutinyNccComponent,
    // DailySummaryScrutinyComponent,
    // DocVerificationAppealComponent,
    // DocVerificationIndividualResultComponent,
    // DocVerificationDownloadResultComponent,
    // DocVerificationDownloadRowDataComponent,
    // DocVerificationScrutinySummComponent,
    // DocVerificationRegComponent,
    // DocVerificationEduQualificationComponent,
    // DocVerificationBackwardAreaComponent,
    // DocVerificationLmvComponent,
    // DocVerificationNccComponent,
    // ScrutinyDetailsComponent,
    // AdmitCardScrutinyComponent,
    // NewReportComponent,
    // ExamDetailsComponent,
    // ScheduleExamComponent,
    // AdmitCardExamComponent,
    // UploadDocumentComponent,
    // IndividualProfileUpdateComponent,
    // PetFailComponent,
    // AllowProvisionedComponent,
    // RejectedAtRegistrationComponent,
    // RejectedAfterRegistrationComponent,
    // AbsentAfterRegistrationComponent,
    // PstPassComponent,
    // PstFailComponent,
    // PstPendingComponent,
    // PetPassComponent,
    // PetPendingComponent,
    // DriverPassComponent,
    // DriverFailComponent,
    // RegisteredUserComponent,
    // DailySummaryComponent,
    // IndividualResultComponent,
    // SummaryComponent,
    // ResultComponent,
    // AppealComponent,
    // DriverComponent,
    // PetDetailsComponent,
    // BroadJumpComponent,
    // HighJumpComponent,
    // RaceComponent,
    // ChestComponent,
    // HeightComponent,
    // AttendanceComponent,
    // AdmitCardComponent,
    // UserDetailsComponent,
    // ApplicationDetailsComponent,
    // PaymentSucessComponent,
    // UserDashboardComponent,
    // PaymentComponent,
  ],
  entryComponents: [ConfirmationDialogComponent, ConfirmationDialog2Component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    BrowserAnimationsModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    // Chart,
    ToastrModule.forRoot({
      preventDuplicates: true,
      closeButton: true
    }),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    RecaptchaModule,
    BackButtonDisableModule.forRoot(
      {
        preserveScrollPosition: true
      }
    )
  ],
  providers: [BaseService, AppCustomPreloader,
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
