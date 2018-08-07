import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationBarComponent } from './components/common/navigation-bar/navigation-bar.component';
import { CommonComponentsModule } from './components/common/common-components.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    CommonComponentsModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
