import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
userloginRecord : any;
oldUserLoginRecord :any
  constructor(
    private router :Router
  ) { }

  ngOnInit(): void {
let newUser = localStorage.getItem('logindata');
let oldUser= localStorage.getItem('oldLogindata') ;
    this.oldUserLoginRecord = oldUser ? JSON.parse(oldUser):'';
    this.userloginRecord = newUser ? JSON.parse(newUser):'';


  }

  logOutUser() {

    let newUser: any = localStorage.getItem('logindata');
    let oldUser: any = localStorage.getItem('oldLogindata');
    let oldlogindatas = oldUser ? JSON.parse(oldUser) : '';
    let logindatas = newUser ? JSON.parse(newUser) : '';
    if (oldlogindatas) {
      localStorage.setItem('logindata', oldUser);
      localStorage.removeItem('oldLogindata')
      this.router.navigate(['/alluser']);

    } else {
      localStorage.removeItem('logindata')
      this.router.navigate(['/']);


    }


  }

}
