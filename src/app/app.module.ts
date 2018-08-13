import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NavigationBarComponent,
  ProfileComponent,
  SignInComponent,
} from './components/common';
import { TOASTR_TIMEOUT } from './config/config';
import { PendingRequestInterceptor } from './interceptors/pending-request.interceptor';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SignInComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: TOASTR_TIMEOUT,
    }),
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PendingRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
