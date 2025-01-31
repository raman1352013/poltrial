import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppCustomPreloader } from './app-routing-loader';

const routes: Routes = [
  {
    path: '', redirectTo: '/Login', pathMatch: 'full'
  },

  {
    path: 'Login',
    loadChildren: './modules/login/login.module#LoginModule',
    // component: LoginComponent
  }, {
    path: 'Home',
    data: { preload: false },
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
  }, {
    path: 'Profile',
    data: { preload: false },
    loadChildren: './modules/profile/profile.module#ProfileModule'
  }, {
    path: 'Registration',
    data: { preload: false },
    loadChildren: './modules/registration/registration.module#RegistrationModule'
  }, {
    path: 'Payment',
    data: { preload: false },
    loadChildren: './modules/payment/payment.module#PaymentModule'
  }, {
    path: 'UserDashboard',
    data: { preload: false },
    loadChildren: './modules/user-dashboard/user-dashboard.module#UserDashboardModule'
  }, {
    path: 'PaymentSuccess',
    data: { preload: false },
    loadChildren: './modules/payment-success/payment-success.module#PaymentSuccessModule'
  }, {
    path: 'PaymentFail',
    data: { preload: false },
    loadChildren: './modules/payment-fail/payment-fail.module#PaymentFailModule'
  }, {
    path: 'ApplicationDetails',
    data: { preload: false },
    loadChildren: './modules/application-details/application-details.module#ApplicationDetailsModule'
  }, {
    path: 'UserDetails',
    data: { preload: false },
    loadChildren: './modules/user-details/user-details.module#UserDetailsModule'
  }, {
    path: 'AdmitCard',
    data: { preload: false },
    loadChildren: './modules/admit-card/admit-card.module#AdmitCardModule'
  }, {
    path: 'AdmitCardExam',
    data: { preload: false },
    loadChildren: './modules/admit-card-exam/admit-card-exam.module#AdmitCardExamModule'
  }, {
    path: 'Attendance',
    data: { preload: false },
    loadChildren: './modules/attendance/attendance.module#AttendanceModule'
  }, {
    path: 'Height',
    data: { preload: false },
    loadChildren: './modules/height/height.module#HeightModule'
  }, {
    path: 'Chest',
    data: { preload: false },
    loadChildren: './modules/chest/chest.module#ChestModule'
  }, {
    path: 'Race',
    data: { preload: false },
    loadChildren: './modules/race/race.module#RaceModule'
  }, {
    path: 'HighJump',
    data: { preload: false },
    loadChildren: './modules/high-jump/high-jump.module#HighJumpModule'
  }, {
    path: 'BroadJump',
    data: { preload: false },
    loadChildren: './modules/broad-jump/broad-jump.module#BroadJumpModule'
  }, {
    path: 'PetDetails',
    data: { preload: false },
    loadChildren: './modules/pet-details/pet-details.module#PetDetailsModule'
  }, {
    path: 'Driver',
    data: { preload: false },
    loadChildren: './modules/driver/driver.module#DriverModule'
  }, {
    path: 'Appeal',
    data: { preload: false },
    loadChildren: './modules/appeal/appeal.module#AppealModule'
  }, {
    path: 'Summary',
    data: { preload: false },
    loadChildren: './modules/summary/summary.module#SummaryModule'
  }, {
    path: 'Result',
    data: { preload: false },
    loadChildren: './modules/result/result.module#ResultModule'
  }, {
    path: 'IndividualResult',
    data: { preload: false },
    loadChildren: './modules/individual-result/individual-result.module#IndividualResultModule'
  }, {
    path: 'DailySummary',
    data: { preload: false },
    loadChildren: './modules/daily-summary/daily-summary.module#DailySummaryModule'
  }, {
    path: 'PstPass',
    data: { preload: false },
    loadChildren: './modules/pst-pass/pst-pass.module#PstPassModule'
  }, {
    path: 'PstFail',
    data: { preload: false },
    loadChildren: './modules/pst-fail/pst-fail.module#PstFailModule'
  }, {
    path: 'PstPending',
    data: { preload: false },
    loadChildren: './modules/pst-pending/pst-pending.module#PstPendingModule'
  }, {
    path: 'PetPass',
    data: { preload: false },
    loadChildren: './modules/pet-pass/pet-pass.module#PetPassModule'
  }, {
    path: 'PetPending',
    data: { preload: false },
    loadChildren: './modules/pet-pending/pet-pending.module#PetPendingModule'
  }, {
    path: 'DriverPass',
    data: { preload: false },
    loadChildren: './modules/driver-pass/driver-pass.module#DriverPassModule'
  }, {
    path: 'DriverFail',
    data: { preload: false },
    loadChildren: './modules/driver-fail/driver-fail.module#DriverFailModule'
  }, {
    path: 'RegisteredUser',
    data: { preload: false },
    loadChildren: './modules/registered-user/registered-user.module#RegisteredUserModule'
  }, {
    path: 'PetFail',
    data: { preload: false },
    loadChildren: './modules/pet-fail/pet-fail.module#PetFailModule'
  }, {
    path: 'AllowProvisioned',
    data: { preload: false },
    loadChildren: './modules/allow-provisioned/allow-provisioned.module#AllowProvisionedModule'
  }, {
    path: 'RejectedAtRegistration',
    data: { preload: false },
    loadChildren: './modules/rejected-at-registration/rejected-at-registration.module#RejectedAtRegistrationModule'
  }, {
    path: 'RejectedAfterRegistration',
    data: { preload: false },
    loadChildren: './modules/rejected-after-registration/rejected-after-registration.module#RejectedAfterRegistrationModule'
  }, {
    path: 'AbsentAfterRegistration',
    data: { preload: false },
    loadChildren: './modules/absent-after-registration/absent-after-registration.module#AbsentAfterRegistrationModule'
  }, {
    path: 'IndividualProfileUpdate',
    data: { preload: false },
    loadChildren: './modules/individual-profile-update/individual-profile-update.module#IndividualProfileUpdateModule'
  }, {
    path: 'UploadDocument',
    data: { preload: false },
    loadChildren: './modules/upload-document/upload-document.module#UploadDocumenteModule'
  },{
    path: 'ScheduleExam',
    data: { preload: false },
    loadChildren: './modules/schedule-exam/schedule-exam.module#ScheduleExamModule'
  },{
    path: 'ExamDetails',
    data: { preload: false },
    loadChildren: './modules/exam-details/exam-details.module#ExamDetailsModule'
  },{
    path: 'NewReport',
    data: { preload: false },
    loadChildren: './modules/new-report/new-report.module#NewReportModule'
  },{
    path: 'ScrutinyAdmitCard',
    data: { preload: false },
    loadChildren: './modules/admit-card-scrutiny/admit-card-scrutiny.module#AdmitCardScrutinyModule'
  },{
    path: 'ScrutinyDetails',
    data: { preload: false },
    loadChildren: './modules/scrutiny-details/scrutiny-details.module#ScrutinyDetailsModule'
  },
  // 
  {
    path: 'DocVerificationReg',
    data: { preload: false },
    loadChildren: './modules/doc-verification-reg/doc-verification-reg.module#DocVerificationRegModule'
  },
  {
    path: 'DocVerificationEduQualification',
    data: { preload: false },
    loadChildren: './modules/doc-verification-edu-qualification/doc-verification-edu-qualification.module#DocVerificationEduQualificationModule'
  },
  {
    path: 'DocVerificationBackwardArea',
    data: { preload: false },
    loadChildren: './modules/doc-verification-backward-area/doc-verification-backward-area.module#DocVerificationBackwardAreaModule'
  },
  {
    path: 'DocVerificationLmv',
    data: { preload: false },
    loadChildren: './modules/doc-verification-lmv/doc-verification-lmv.module#DocVerificationLmvModule'
  },
  {
    path: 'DocVerificationNcc',
    data: { preload: false },
    loadChildren: './modules/doc-verification-ncc/doc-verification-ncc.module#DocVerificationNccModule'
  },
  // Sid
  {
    path: 'DocVerificationDownloadResult',
    data: { preload: false },
    loadChildren: './modules/doc-verification-download-result/doc-verification-download-result.module#DocVerificationDownloadResultModule'
  },{
    path: 'DocVerificationDownloadRowData',
    data: { preload: false },
    loadChildren: './modules/doc-verification-download-row-data/doc-verification-download-row-data.module#DocVerificationDownloadRowDataModule'
  },{
    path: 'DocVerificationScrutinySumm',
    data: { preload: false },
    loadChildren: './modules/doc-verification-scrutiny-summ/doc-verification-scrutiny-summ.module#DocVerificationScrutinySummModule'
  }, {
    path: 'DocVerificationIndividualResult',
    data: { preload: false },
    loadChildren: './modules/doc-verification-individual-result/doc-verification-individual-result.module#DocVerificationIndividualResultModule'
  },{
    path: 'DocVerificationAppeal',
    data: { preload: false },
    loadChildren: './modules/doc-verification-appeal/doc-verification-appeal.module#DocVerificationAppealModule'
  },{
    path: 'DailySummaryScrutinyReg',
    data: { preload: false },
    loadChildren: './modules/daily-summary-scrutiny/daily-summary-scrutiny.module#DailySummaryScrutinyModule'
  },{
    path: 'DailySummaryScrutinyEdu',
    data: { preload: false },
    loadChildren: './modules/daily-summary-scrutiny-edu/daily-summary-scrutiny-edu.module#DailySummaryScrutinyEduModule'
  },{
    path: 'DailySummaryScrutinyLand',
    data: { preload: false },
    loadChildren: './modules/daily-summary-scrutiny-land/daily-summary-scrutiny-land.module#DailySummaryScrutinyLandModule'
  },{
    path: 'DailySummaryScrutinyLmv',
    data: { preload: false },
    loadChildren: './modules/daily-summary-scrutiny-lmv/daily-summary-scrutiny-lmv.module#DailySummaryScrutinyLmvModule'
  },{
    path: 'DailySummaryScrutinyNss',
    data: { preload: false },
    loadChildren: './modules/daily-summary-scrutiny-nss/daily-summary-scrutiny-nss.module#DailySummaryScrutinyNssModule'
  },{
    path: 'DailySummaryScrutinyNcc',
    data: { preload: false },
    loadChildren: './modules/daily-summary-scrutiny-ncc/daily-summary-scrutiny-ncc.module#DailySummaryScrutinyNccModule'
  },{
    path: 'DisqualifyCandidate',
    data: { preload: false },
    loadChildren: './modules/disqualify-candidate/disqualify-candidate.module#DisqualifyCandidateModule'
  },


  // DocVerificationAppealModule



  // high-jump
  // AttendanceModule
  // ShopBookingModule
  // ShopModule
  // RoomBookingConfirmationModule
  // {
  //   path: 'Complete-Refusal',
  //   data: { preload: false },
  //   loadChildren: './modules/complete-refusal/complete-refusal.module#CompleteRefusalModule',
  // },
  // {
  //   path: 'Copyright-Noc-Reply-Not-Recieved',
  //   data: { preload: false },
  // tslint:disable-next-line:max-line-length
  //   loadChildren: './modules/copyright-noc-reply-not-recieved/copyright-noc-reply-not-recieved.module#CopyrightNocReplyNotRecievedModule',
  // },
  // {
  //   path: 'Madrid-All-Application',
  //   data: { preload: false },
  //   loadChildren: './modules/madrid-all-application/madrid-all-application.module#MadridAllApplicationModule',
  // },
  // {
  //   path: 'Certification-International-Application',
  //   data: { preload: false },
  // tslint:disable-next-line:max-line-length
  //   loadChildren: './modules/certification-international-application/certification-international-application.module#CertificationInternationalApplicationModule',
  // },
  // {
  //   path: 'Madrid-Upload-International-Application',
  //   data: { preload: false },
  // tslint:disable-next-line:max-line-length
  //   loadChildren: './modules/madrid-upload-international-application/madrid-upload-international-application.module#MadridUploadInternationalApplicationModule',
  // },
  // {
  //   path: 'Madrid-Ceasing-Effects',
  //   data: { preload: false },
  //   loadChildren: './modules/madrid-ceasing-effects/madrid-ceasing-effects.module#MadridCeasingEffectsModule',
  // },
  // {
  //   path: 'Madrid-Forwarded-Mm2-Application',
  //   data: { preload: false },
  // tslint:disable-next-line:max-line-length
  //   loadChildren: './modules/madrid-forwarded-mm2-application/madrid-forwarded-mm2-application.module#MadridForwardedMm2ApplicationModule',
  // },
  // {
  //   path: 'Madrid-Filed-Mm2-Application',
  //   data: { preload: false },
  //   loadChildren: './modules/madrid-filed-mm2-application/madrid-filed-mm2-application.module#MadridFiledMm2ApplicationModule',
  // },
  // {
  //   path: 'Madrid-Pending-Irregularities',
  //   data: { preload: false },
  //   loadChildren: './modules/madrid-pending-irregularities/madrid-pending-irregularities.module#MadridPendingIrregularitiesModule',
  // },
  // {
  //   path: 'IOAI-Irregularities-Disposed',
  //   data: { preload: false },
  //   loadChildren: './modules/complete-refusal/complete-refusal.module#CompleteRefusalModule',
  // },
  // {
  //   path: 'iaoi-irregularties-disposed',
  //   data: { preload: false },
  //   loadChildren: './modules/iaoi-irregularties-disposed/iaoi-irregularties-disposed.module#IaoiIrregulartiesDisposedModule',
  // },
  // {
  //   path: 'Indian-Designation-Import',
  //   data: { preload: false },
  //   loadChildren: './modules/indian-designation-import/indian-designation-import.module#IndianDesignationImportModule',
  // },
  // {
  //   path: 'Process-Application',
  //   data: { preload: false },
  //   loadChildren: './modules/process-application/process-application.module#ProcessApplicationModule',
  // },
  // {
  //   path: 'Process-Irregularities',
  //   data: { preload: false },
  //   loadChildren: './modules/process-irregularities/process-irregularities.module#ProcessIrregularitiesModule',
  // },
  // {
  //   path: 'Grant-of-Protection',
  //   data: { preload: false },
  //   loadChildren: './modules/grant-of-protection/grant-of-protection.module#GrantOfProtectionModule',
  // },
  // {
  //   path: 'Notice-Possible-Opposition',
  //   data: { preload: false },
  //   loadChildren: './modules/notice-possible-opposition/notice-possible-opposition.module#NoticePossibleOppositionModule',
  // },
  // {
  //   path: 'PR-Bases-Opposition',
  //   data: { preload: false },
  //   loadChildren: './modules/pr-based-opposition/pr-based-opposition.module#PrBasedOppositionModule',
  // },
  {
    path: '**', redirectTo: '/Login', pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: AppCustomPreloader }//{useHash: true}
    )]
  ],
  declarations: [],
})
export class AppRoutingModule {

}
