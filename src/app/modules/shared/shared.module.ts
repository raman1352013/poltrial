import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadCrumbComponent } from '../../components/bread-crumb/bread-crumb.component';
import { FooterComponent } from '../../components/footer/footer.component';
// import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';
// import { HeaderComponent } from '../../components/header/header.component';
// import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { HeaderTitleComponent } from '../../components/header-title/header-title.component'
import { PhoneMasksDirective } from '../../services/common/phone-mask-directive'
// import { TimepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    // TimepickerModule
    // RecaptchaModule,
    // RecaptchaFormsModule
  ],
  declarations: [
    // FooterComponent,
    // NavbarComponent,
    // SideBarComponent,
    // ConfirmationDialogComponent
    BreadCrumbComponent,
    MainHeaderComponent,
    HeaderTitleComponent,
    PhoneMasksDirective
    // HeaderComponent
  ],
  exports: [
    HttpModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // FooterComponent,
    // NavbarComponent,
    // SideBarComponent,
    // ConfirmationDialogComponent
    BreadCrumbComponent,
    MainHeaderComponent,
    HeaderTitleComponent,
    PhoneMasksDirective
    // HeaderComponent
  ]
})
export class SharedModule { }
