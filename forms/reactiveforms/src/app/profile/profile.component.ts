import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servics/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  DisplayData: any
  constructor(private userservics: UserService,private router:Router) {}
   
  ngOnInit(): void {
    let loginData: any = localStorage.getItem('logindata');
    let loginDataParse = JSON.parse(loginData);
    if (loginDataParse && loginDataParse._id) {
      this.userservics.DisplayUserData({ _id: loginDataParse._id }).subscribe((data) => {
        this.DisplayData = data;
      })
    }
  }


}
