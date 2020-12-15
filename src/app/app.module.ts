import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { BadgesComponent } from './badges/badges.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TabsComponent } from './tabs/tabs.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpDialogueComponent } from './otp-dialogue/otp-dialogue.component';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TruncateCharactersPipe } from 'ng2-truncate/dist/truncate-characters.pipe';
import { AppointmentComponent } from './appointment/appointment.component';
import { ServiceratingComponent } from './servicerating/servicerating.component';
import { TokenServiceComponent } from './token-service/token-service.component';
import { NewServiceComponent } from './new-service/new-service.component';
import { ViewtokenComponent } from './viewtoken/viewtoken.component';

@NgModule({
  declarations: [
    TruncateCharactersPipe,
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    FormsComponent,
    ButtonsComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    AlertsComponent,
    AccordionsComponent,
    BadgesComponent,
    ProgressbarComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    DropdownComponent,
    TooltipsComponent,
    CarouselComponent,
    TabsComponent,
    OtpDialogueComponent,
    TestComponent,
    AppointmentComponent,
    ServiceratingComponent,
    TokenServiceComponent,
    NewServiceComponent,
    ViewtokenComponent,
  ],
  imports: [
    NgOtpInputModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }