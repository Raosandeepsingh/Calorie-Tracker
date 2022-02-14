import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, EmailValidator } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CommonvalidationService {

  constructor() { }

   // Password and Confirm Password Validation
 
 
  ConfirmPasswordMatch(key:string): ValidatorFn {
    return (control: AbstractControl): { isMatch: string } | null => {
      console.log(control)
      let password: string = key == "password" ? control.value : control.parent?.value.password;
      let confirmPassword: string = key == "cpassword" ? control.value :control.parent?.value.cpassword;
      return password && confirmPassword && password !== confirmPassword ? { isMatch: "Password is not match" } : null
    }

  }

  

}
