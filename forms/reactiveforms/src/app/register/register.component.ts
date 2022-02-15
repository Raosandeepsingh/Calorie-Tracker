import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms'
import { UserService } from '../servics/user.service'
import { CommonvalidationService } from '../common/commonvalidation.service'


@Component({

  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {


  register: FormGroup;
  constructor(private formbuilder: FormBuilder,
    private userservics: UserService,

    private commonvalidationService: CommonvalidationService) {
    this.register = this.formbuilder.group({

      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Weight: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      Height: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(7), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"),this.commonvalidationService.ConfirmPasswordMatch('password')],),
      cpassword: new FormControl('', [Validators.required, this.commonvalidationService.ConfirmPasswordMatch('cpassword')]),
      gender: new FormControl('M', [Validators.required]),

    })
  }

  ngOnInit(): void { }

  dataobj: any
  onSubmit() {
    // console.log(this.register); 
    this.userservics.saveRegisterData(this.register.value).subscribe((result) => {
      // console.log(result);
  })
this.resetformData();
  
  }
  resetformData() {
    this.register.reset();
  }

  commonValidation(valErr: any, fieldName: string, type?: string) {
    console.log(valErr, fieldName)
    if (valErr.required) return fieldName + " is required";
   else if (valErr.minlength) return "value should be greater than min length";
    else if (valErr.min) return "value should be greater than min value";
    else if (valErr.maxlength) return "value should be greater than max length";
    else if (valErr.max) return "value should be greater than min value";
    else if (type == "number" && valErr.pattern) return "value should be a valid number"
    else if (type == "date" && valErr.pattern) return "value should be a valid date"
    else if (fieldName == 'email' && valErr.pattern) return "Email is not vaild"
    else if (fieldName == 'password' && valErr.pattern) return "Password Should Be Alpha Numerical"
    else if (valErr.isMatch) return "password is not match";
    else if (valErr.pattern) return "pattern is not match"
    else return '';
  }
}



