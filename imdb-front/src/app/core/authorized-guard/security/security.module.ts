import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {SecurityComponent} from "./security.component";
import {JwtResponseInterceptor} from "../../interceptor/jwt-response.interceptor";
import {JwtRequestInterceptor} from "../../interceptor/jwt-request.interceptor";

export interface ModuleConfig {
  storageType: string;
  jwtTokenName: string;
  userDetailsName: string;
}

@NgModule({
  declarations: [SecurityComponent],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtResponseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtRequestInterceptor,
      multi: true
    }
  ],
  exports: [SecurityComponent]
})
export class SecurityModule {
  static forRoot(config: { userDetailsName: string; storageType: string; jwtTokenName: string }): ModuleWithProviders<SecurityModule> {
    return {
      ngModule: SecurityModule,
      providers: [{provide: 'configSecurity', useValue: config}]
    };
  }
}
