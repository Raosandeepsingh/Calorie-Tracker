import { Component, OnInit } from '@angular/core';
import { UserService } from '../servics/user.service';
import { FormGroup, FormControl, FormBuilder, } from '@angular/forms'

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  activitytyData: any[] = [];
  activityDescription: any
  addactivity: FormGroup;
  selectActivityData: any;
  ActivityUserName: any
  met: any;
  aTime: any;
  caloriesOut: any;
  saveActivityData: any
  loginDataParse: any
  constructor(private userservics: UserService,
    private formbuilder: FormBuilder) {
    this.addactivity = this.formbuilder.group({
      date: new FormControl(''),
      activityName: new FormControl(''),
      activityDescription: new FormControl(''),
      time: new FormControl(''),
      metValue: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.userservics.activityUserData({}).subscribe((res: any) => {
      // console.log(res)
      this.activitytyData = res

      let loginData: any = localStorage.getItem('logindata');
      let loginDataParse = JSON.parse(loginData);
      // console.log(loginData)
      if (loginDataParse && loginDataParse._id) {
        this.userservics.DisplayUserData({ _id: loginDataParse._id }).subscribe((data) => {
          // console.log('dataid', data)
          this.ActivityUserName = data;
          // console.log('UserName', this.ActivityUserName._id)
        })
      }

    })
  }

  userData() {
    let fGroup = this.addactivity.controls['date'].value;
    this.userservics.DisplayFoodGroup({ fGroup }).subscribe((res) => {
      //  this.foodName = res;
      console.log(res)
    })
  }
  activityNameChange() {
    let aName = this.addactivity.controls['activityName'].value;
    this.userservics.displayActivityName({ aName }).subscribe((res) => {
      this.activityDescription = res;
      // console.log(this.activityDescription)
    })
  }
  activityDescriptionChange() {
    let aDescription = this.addactivity.controls['activityDescription'].value;
    // console.log(aDescription)
    this.selectActivityData = this.activityDescription.find((a: any) => a._id === aDescription)
    // console.log(this.selectActivityData)
    // console.log(aDescription)
  }

  activitytimeChange() {
    this.aTime = this.addactivity.controls['time'].value;
    // console.log(this.aTime, this.selectActivityData)
    let metVal = Number(this.aTime) * Number(this.selectActivityData.METs);
    // console.log(metVal)
    this.met = metVal
    this.addactivity.controls['metValue'].setValue(metVal)
  }

  onSubmit() {
    let loginData: any = localStorage.getItem('logindata');
    let loginDataParse = JSON.parse(loginData);
    // let met = loginDataParse.METs;
    let weight = loginDataParse.Weight;
    // let duration = loginDataParse.time
    let bmr = loginDataParse.bmr;
    this.caloriesOut = Number(this.met) * Number(weight) * Number(this.aTime);
    // console.log(this.caloriesOut)
    this.userservics.saveActivityData({ ...this.addactivity.value, calorieOut: this.caloriesOut, userId: loginDataParse._id, }).subscribe((res) => {
      // console.log(res);
      this.saveActivityData = res

    })

  }
}
