import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AllUserComponent } from './all-user/all-user.component';
import { AuthServicsGuard } from './auth/auth-servics.guard';
import { FoodDataComponent } from './food-data/food-data.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ViewComponent } from './view/view.component';
// import{IndexComponent} from './index/index.component'
const routes: Routes = [
  {path: '', component:IndexComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'login', component:LoginComponent },
  {path:'view' ,component:ViewComponent},  
  {path:'profile' ,component:ProfileComponent},
  // {path:'activity',component:AddActivityComponent},
  {path:'food',component:FoodDataComponent},
  {path:'alluser',component:AllUserComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
