import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from "./inventory/inventory.component";
import { ProductComponent } from './inventory/product/product.component';
import { CategoryComponent } from './inventory/category/category.component';
import { AuthGuard } from './guards/auth.guard';
import { PresentationComponent } from './inventory/presentation/presentation.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home', canActivate: [ AuthGuard ]},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ]},
  { path: 'inventory', component: InventoryComponent, children: [
    { path: '', component: ProductComponent, outlet: 'products' },
    { path: '', component: CategoryComponent, outlet: 'categories' },
    { path: '', component: PresentationComponent, outlet: 'presentations'}
  ], canActivate: [ AuthGuard ]},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
