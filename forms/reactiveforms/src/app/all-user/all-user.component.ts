import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servics/user.service';
@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  allUser: any[] = []
  constructor(
    private userService: UserService,
    private router: Router,



  ) { }

  ngOnInit(): void {
    this.getAllUser()
  }
  getAllUser() {
    this.userService.getAllUserList().subscribe((res: any) => {
      // console.log(res)
      this.allUser = res;
      // console.log(this.allUser)
    });
  }

  deleteData(_id: any) {
    console.log(_id)
    this.userService.deleteData({ _id: _id }).subscribe((res: any) => {
      // console.log(res)
      this.getAllUser();

    })
  }

  getLogin(email: any, pass: any) {

    this.userService.saveLoginData({ email: email, password: pass }).subscribe((res: any) => {
      // console.log(res);
      let logindata: any = res.data;
      // console.log(logindata)
      this.storeLoginInfo(res.data)

    })
  }
  storeLoginInfo(userData: any) {

    let loginData: any = localStorage.getItem('logindata');
    localStorage.setItem('logindata', JSON.stringify(userData));
    localStorage.setItem('oldLogindata', loginData);
    this.router.navigate(['/view']);
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
