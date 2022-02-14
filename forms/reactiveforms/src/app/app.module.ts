import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import{ReactiveFormsModule, FormsModule} from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { FoodDataComponent } from './food-data/food-data.component';
import { ViewComponent } from './view/view.component';
import { AllUserComponent } from './all-user/all-user.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    IndexComponent,
    ProfileComponent,
    AddActivityComponent,
    FoodDataComponent,
    ViewComponent,
    AllUserComponent,
    NavbarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
