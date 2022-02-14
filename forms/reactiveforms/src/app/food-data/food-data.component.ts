import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../servics/user.service';
import { FormGroup, FormControl, FormBuilder, } from '@angular/forms'
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
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
  
  constructor(private userservics: UserService,
    private formbuilder: FormBuilder,
    private router:Router) {
    this.addfood = this.formbuilder.group({
      date:new FormControl(''),
      group: new FormControl(''),
      name: new FormControl(''),
      serving: new FormControl(''),
      calorie: new FormControl(''),
    })
    //  this.userName=this.userservics.getUserName('')
    //  console.log( 'name',this.userName)
  }
  ngOnInit(): void {
    this.userservics.foodUserData({}).subscribe((res: any) => {
      // console.log(res)
      this.foodGroup = res;
    
    });
  }
  userData(){
    let fGroup = this.addfood.controls['date'].value;
    this.userservics.DisplayFoodGroup({ fGroup }).subscribe((res) => {
  //  this.foodName = res;
  //  console.log(res)
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
    // console.log(this.selectFoodData)
    // console.log(fGroup)
  }

  foodServingChange() {
    let fServing = this.addfood.controls['serving'].value;
    console.log(fServing, this.selectFoodData)
    let calorie = Number(fServing) * Number(this.selectFoodData.Calories);
    // console.log(calorie)
    this.cal = calorie
    this.addfood.controls['calorie'].setValue(calorie)
  }
  
onSubmit() {
    let loginData: any = localStorage.getItem('logindata');
    let loginDataParse = JSON.parse(loginData);
    this.bmr = loginDataParse.bmr
    this.userservics.savefoodData({ ...this.addfood.value, userId: loginDataParse._id }).subscribe((res) => {
      // console.log(res);
    })


  }

  logOutUser(){
    let loginData: any = localStorage.getItem('oldLogindata');
    localStorage.setItem('logindata',loginData);
    localStorage.removeItem('oldLogindata');
    this.router.navigate(['/alluser']);
  }

}
