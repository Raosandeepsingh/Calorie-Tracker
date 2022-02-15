import { Component, OnInit } from '@angular/core';
import { UserService } from '../servics/user.service';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms'
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
      date: new FormControl('', [Validators.required]),
      activityName: new FormControl('', [Validators.required]),
      activityDescription: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      metValue: new FormControl('', [Validators.required]),
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
          this.ActivityUserName = data;
        })
      }

    })
  }

  userData() {
    let fGroup = this.addactivity.controls['date'].value;
    this.userservics.DisplayFoodGroup({ fGroup }).subscribe((res) => { })
  }
  activityNameChange() {
    let aName = this.addactivity.controls['activityName'].value;
    this.userservics.displayActivityName({ aName }).subscribe((res) => {
      this.activityDescription = res;
    })
  }
  activityDescriptionChange() {
    let aDescription = this.addactivity.controls['activityDescription'].value;
    this.selectActivityData = this.activityDescription.find((a: any) => a._id === aDescription)

  }

  activitytimeChange() {
    this.aTime = this.addactivity.controls['time'].value;
    let metVal = Number(this.aTime) * Number(this.selectActivityData.METs);
    this.met = metVal
    this.addactivity.controls['metValue'].setValue(metVal)
  }

  onSubmit() {
    let loginData: any = localStorage.getItem('logindata');
    let loginDataParse = JSON.parse(loginData);
    let weight = loginDataParse.Weight;
    let bmr = loginDataParse.bmr;
    this.caloriesOut = Number(this.met) * Number(weight) * Number(this.aTime);
    this.userservics.saveActivityData({ ...this.addactivity.value, calorieOut: this.caloriesOut, userId: loginDataParse._id, }).subscribe((res) => {
      this.saveActivityData = res
    })

    this.resetformData()
  }


  resetformData() {
    this.addactivity.reset();
  }
}
