import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RegisterPageModule} from "./content/register-page/register-page.module";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {SearchComponent} from './core/search/search.component';
import {FlexModule} from "@angular/flex-layout";
import {MatDialogModule} from "@angular/material/dialog";
import {FooterComponent} from './core/footer/footer.component';
import {FaConfig, FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {LoaderComponent} from "./core/loader/loader.component";
import {HttpResponseInterceptor} from "./core/interceptor/http-response.interceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatBadgeModule} from "@angular/material/badge";
import {MatMenuModule} from "@angular/material/menu";
import {ToolBarComponent} from "./core/tool-bar/tool-bar.component";
import {TrailerDialogComponent} from './core/trailer-dialog/trailer-dialog.component';
import {SharedModule} from "./shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SecurityModule} from './core/authorized-guard/security/security.module';
import {LoginModule} from "./content/login/login.module";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {MatListModule} from "@angular/material/list";
import {faFacebook} from "@fortawesome/free-brands-svg-icons/faFacebook";
import {faTwitter} from "@fortawesome/free-brands-svg-icons/faTwitter";
import {MatChipsModule} from "@angular/material/chips";
import {NavigationListModule} from "./core/navigation-list/navigation-list.module";
import {ToastrModule} from "ngx-toastr";
import {ConfirmDialogComponent} from './core/confirm-dialog/confirm-dialog.component';
import {CarouselModule} from "primeng/carousel";
import {ButtonModule} from "primeng/button";
import { TermsDialogComponent } from './core/terms-dialog/terms-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    SearchComponent,
    FooterComponent,
    LoaderComponent,
    TrailerDialogComponent,
    ConfirmDialogComponent,
    TermsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RegisterPageModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatOptionModule,
    FlexModule,
    SecurityModule.forRoot({
      storageType: 'sessionStorage',
      jwtTokenName: 'AUTH-TOKEN',
      userDetailsName: 'USER_DETAILS_NAME'
    }),
    MatDialogModule,
    FontAwesomeModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule,
    CarouselModule,
    ButtonModule,
    MatBadgeModule,
    MatMenuModule,
    SharedModule,
    LoginModule,
    MatListModule,
    MatChipsModule,
    NavigationListModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    })],
  providers: [{provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true
    }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary, faConfig: FaConfig) {
    library.addIcons(faFacebook, faTwitter);
    faConfig.defaultPrefix = 'fab';
  }
}
