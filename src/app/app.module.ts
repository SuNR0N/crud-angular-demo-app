import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NavigationBarComponent,
  ProfileComponent,
  SignInComponent,
} from './components/common';
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
    ToastrModule.forRoot(),
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
