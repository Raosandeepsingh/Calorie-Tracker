import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../servics/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private login: UserService,
    private router: Router) { }

  Error: any;
  massage: any

  ngOnInit(): void {
  }
  Login: any = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(7)]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)]),
  });

  onSubmit() {
    // console.log(this.Login.value)
    let userNameKey = this.validateEmail(this.Login.value.username)
    let userLoginDetail: any = { "password": this.Login.value.password }
    if (userNameKey) userLoginDetail.email = this.Login.value.username;
    else userLoginDetail.username = this.Login.value.username;
    // console.log(userLoginDetail)

    this.login.saveLoginData(userLoginDetail).subscribe((res: any) => {
      // console.log(res);
      let logindata: any = res.data;
      // console.log()
      this.saveLoginData(logindata);
    })
  }
  saveLoginData(data: any) {
    console.log(data)
    localStorage.removeItem('logindata');
    if (data) {
      localStorage.setItem('logindata', JSON.stringify(data));
      this.router.navigate(['/profile']);
    } else {
      this.Error = true;
      this.massage = " *User id /password wrong"
    }
  }


  validateEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) ? true : false;
  };
}
