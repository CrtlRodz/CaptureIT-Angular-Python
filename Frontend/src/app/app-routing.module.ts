import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CameraComponent } from './Image/camera/camera.component';
import { GalleryComponent } from './Image/gallery/gallery.component';
const routes: Routes = [{
  path:'camera',
  component:CameraComponent,
},
{
  path:'home',
  component:HomeComponent,
},
{
  path:'gallery',
  component:GalleryComponent,
},
{
  path:'',
  redirectTo:'/home',
  pathMatch:'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
