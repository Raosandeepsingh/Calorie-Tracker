import { Component, OnInit } from '@angular/core';
import { UserService } from '../servics/user.service';
import { FormGroup, FormControl, FormBuilder, } from '@angular/forms'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  activityUserData: any;
  foodUserData: any;
  getData: FormGroup;
  netCalorie: any = 0;
  selectActivityData: any = 0;
  selectFoodData: any = 0;
  bmr: any = 0;



  constructor(private userservics: UserService,
    private formbuilder: FormBuilder) {

    this.getData = this.formbuilder.group({
      date: new FormControl(''),
    })
  }

  ngOnInit(): void {
  }
  onChange() {

  }

  calculateNetCalorie() {
    let loginData: any = localStorage.getItem('logindata');
    let loginDataParse = JSON.parse(loginData);
    this.bmr = loginDataParse.bmr
    // console.log("calin", this.selectFoodData, this.bmr, this.selectActivityData)
    if (this.bmr && this.selectFoodData) {
      this.netCalorie = this.selectFoodData - this.bmr - this.selectActivityData
    } else {
      this.netCalorie = 0;
    }
    console.log(this.netCalorie)
  }
  userActivityData() {
    let loginD: any = localStorage.getItem('logindata');
    let loginDataP = JSON.parse(loginD);
    let userId = loginDataP._id
    let aData = this.getData.controls['date'].value
    let b = 0;
    this.userservics.displayActivitydata({ aData, userId }).subscribe((data) => {
      // console.log('activitydata', data)
      this.activityUserData = data
      this.activityUserData.forEach(function (a: any) { b += a["calorieOut"]; });
      this.selectActivityData = b;
      // console.log(this.selectActivityData)
      this.calculateNetCalorie()
    },
      error => console.log('Server error'),
    );
    let f = 0;
    this.userservics.displayFoodData({ aData, userId }).subscribe((data) => {
      // console.log('fooddata', data)
      this.foodUserData = data
      this.foodUserData.forEach(function (a: any) { f += a["calorie"]; });
      this.selectFoodData = f;
      console.log("calin", this.selectFoodData)
      this.calculateNetCalorie()
    },
      error => console.log('Server error'),
    );




  }

}
