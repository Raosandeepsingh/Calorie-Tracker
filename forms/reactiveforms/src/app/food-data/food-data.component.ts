import { Component, OnInit } from '@angular/core';
import { UserService } from '../servics/user.service';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-data',
  templateUrl: './food-data.component.html',
  styleUrls: ['./food-data.component.css']
})
export class FoodDataComponent implements OnInit {
  foodData: any = []
  foodGroup: any[] = [];
  foodName: any = []
  foodGroupName: any = []
  addfood: FormGroup;
  selectFoodData: any;
  userName: any;
  foodUserData: any;
  foodUserId: any;
  cal: any;
  bmr: any;
  netCalorie: any
  fServing: any

  constructor(private userservics: UserService,
    private formbuilder: FormBuilder,
    private router: Router) {
    this.addfood = this.formbuilder.group({
      date: new FormControl('', [Validators.required]),
      group: new FormControl('', [Validators.required]),
      mealType: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      serving: new FormControl('', [Validators.required]),
      calorie: new FormControl('', [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.userservics.foodUserData({}).subscribe((res: any) => {
      this.foodGroup = res;

    });
  }

  userData() {
    let fGroup = this.addfood.controls['date'].value;
    this.userservics.DisplayFoodGroup({ fGroup }).subscribe((res) => {
    })
  }
  foodGroupChange() {
    let fGroup = this.addfood.controls['group'].value;
    this.userservics.DisplayFoodGroup({ fGroup }).subscribe((res) => {
      this.foodName = res;
    })
  }
  foodNameChange() {
    let fGroup = this.addfood.controls['name'].value;
    this.selectFoodData = this.foodName.find((a: any) => a._id === fGroup)
  }

  foodServingChange() {
    this.fServing = this.addfood.controls['serving'].value;
    // console.log(this.fServing, this.selectFoodData)
    let calorie = Number(this.fServing) * Number(this.selectFoodData.Calories);
    this.cal = calorie
    this.addfood.controls['calorie'].setValue(calorie)

  }

  onSubmit() {
    let loginData: any = localStorage.getItem('logindata');
    let loginDataParse = JSON.parse(loginData);
    this.bmr = loginDataParse.bmr
    this.userservics.savefoodData({ ...this.addfood.value, userId: loginDataParse._id }).subscribe((res) => {
    })
    this.resetformData()
  }

  resetformData() {
    this.addfood.reset();
  }

  logOutUser() {
    let loginData: any = localStorage.getItem('oldLogindata');
    localStorage.setItem('logindata', loginData);
    localStorage.removeItem('oldLogindata');
    this.router.navigate(['/alluser']);
  }

}
