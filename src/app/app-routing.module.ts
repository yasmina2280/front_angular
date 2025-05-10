import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderfooterComponent} from "./headerfooter/headerfooter.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {ProduitsComponent} from "./produits/produits.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [

  {

  path:'acceuil', component: HeaderfooterComponent,
  children:[  {path:'', component:HomeComponent},
    {path:'produits', component:ProduitsComponent},
    {path:'users', component: UsersComponent}

  ]
},
  {path:'login', component: LoginComponent},
  {path:'**', redirectTo:'acceuil'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
