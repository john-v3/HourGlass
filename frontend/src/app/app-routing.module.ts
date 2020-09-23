import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import a component when ready to be routed
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  //{ path: 'detail/:id', component: HeroDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




