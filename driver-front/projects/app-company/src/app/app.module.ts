import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { EmailComposer } from'@ionic-native/email-composer/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx'
import { from } from 'rxjs';
import { AuthModule } from './auth/auth.module';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxQRCodeModule,
    AuthModule,
    IonicStorageModule.forRoot({
      // name: '__local_driver_db',
      // driverOrder: [ 'localstorage','indexeddb', 'sqlite', 'websql']
    }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    FileOpener,
    BarcodeScanner,
    Base64ToGallery,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
