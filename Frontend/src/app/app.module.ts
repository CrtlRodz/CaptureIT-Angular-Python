import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './Image/camera/camera.component';
import {WebcamModule} from 'ngx-webcam';
import { NavComponent } from './nav/nav.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './Image/gallery/gallery.component';
import { FooterComponent } from './footer/footer.component'


@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    NavComponent,
    HomeComponent,
    GalleryComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
