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

let newUser: any = localStorage.getItem('logindata');
let oldUser: any = localStorage.getItem('oldLogindata');
let oldlogindatas = oldUser ? JSON.parse(oldUser) : '';
let logindatas = newUser ? JSON.parse(newUser) : '';



let routes: Routes = [];




  // { path: 'register', component: RegisterComponent },
console.log(newUser)
 // if(newUser){

    routes.push({ path: 'login', component:LoginComponent });
    routes.push({path:'view' ,component:ViewComponent});  
    routes.push({path:'profile' ,component:ProfileComponent});
    // {path:'activity',component:AddActivityComponent},
    routes.push( {path:'food',component:FoodDataComponent});

   // if(newUser && newUser.role == 0){
    routes.push({path:'alluser',component:AllUserComponent});
   // }
  //}
  //else{
    routes.push({path: '', component:IndexComponent });
 // }
  



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
