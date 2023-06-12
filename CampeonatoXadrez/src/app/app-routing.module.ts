import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './pages/collections/collections.component';
import { GraphicsComponent } from './pages/graphics/graphics.component';
import { HomeComponent } from './pages/home/home.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'colections', component: CollectionsComponent },
  { path: 'purchases', component:  PurchasesComponent},
  { path: 'graphics', component: GraphicsComponent },
  { path: '**', redirectTo: 'home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
