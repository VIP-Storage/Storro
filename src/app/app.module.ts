import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "./modules/shared/shared.module";
import {IMqttServiceOptions, MqttModule} from "ngx-mqtt";
import {environment} from "../environments/environment";
import {AuthInterceptor} from "./modules/shared/interceptors/auth.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgxStripeModule} from "ngx-stripe";
import {HttpErrorInterceptor} from "./modules/shared/interceptors/http.interceptor";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogsModule} from "./modules/shared/dialogs/dialogs.module";
import {NgxMaskModule} from "ngx-mask";
import {DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS} from "@angular/material/core";
import {FormDateAdapter} from "./modules/shared/adapters/form-date.adapter";
import {AlertWrapperComponent} from "./modules/shared/components/alert-wrapper/alert-wrapper.component";

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.mqtt.server,
  port: environment.mqtt.port,
  protocol: (environment.mqtt.protocol === "wss") ? "wss" : "ws",
  path: '/ws',
  username: 'storro',
  password: 'storro',
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    SharedModule,
    DialogsModule,
    NgxStripeModule.forRoot(environment.stripeKey),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    NgxMaskModule.forRoot({validation: true}),
  ],
  providers: [
    {
      provide: DateAdapter, useClass: FormDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent, AlertWrapperComponent]
})
export class AppModule {
}
