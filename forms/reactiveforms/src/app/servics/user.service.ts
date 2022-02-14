import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private saveUserUrl = environment.apiUrl
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  options = { headers: this.headers };

  messgae: any
  constructor(private http: HttpClient) {
  }
  saveRegisterData(value: any) {
    return this.http.post(this.saveUserUrl + 'users/createUser', value)
  }
  saveLoginData(value: any) {
    return this.http.post(this.saveUserUrl + 'users/login', value)
  }

  DisplayUserData(data: any) {
    console.log('data', data)
    return this.http.get(this.saveUserUrl + 'users/getUserById', { ...this.options, params: data });
  }

  foodUserData(data: any) {
    console.log('data', data)
    return this.http.get(this.saveUserUrl + 'food/getAllfood', { ...this.options, params: data });
  }

  DisplayFoodGroup(data: any) {
    console.log('data', data)
    return this.http.get(this.saveUserUrl + 'food/getFoodGroupByName', { params: data });
  }
  savefoodData(value: any) {
    return this.http.post(this.saveUserUrl + 'food/saveFoodData', value)
  }


  activityUserData(data: any) {
    console.log('data', data)
    return this.http.get(this.saveUserUrl + 'activity/getAllActivity', { ...this.options, params: data });
  }

  displayActivityName(data: any) {
    console.log('data', data)
    return this.http.get(this.saveUserUrl + 'activity/getDescriptionByName', { params: data });
  }

  saveActivityData(value: any) {
    return this.http.post(this.saveUserUrl + 'activity/saveActivityData', value)
  }

    //   getCalorieOut(value:any){
    //   return this.http.post(this.saveUserUrl + 'activity/getAllActivityData', {...this.options,params : value} )
    //  }
    // displayActivityData(data:any){
    //   return this.http.get(this.saveUserUrl + 'activity/diplayActivityData',{params:data})
    // }

  

  getAllUserList(){
    return this.http.get(this.saveUserUrl + 'users/getAllUser', { ...this.options });
  }


  displayActivitydata(data: any) {
    console.log('data', data)
    return this.http.get(this.saveUserUrl + 'activity/diplayActivityData', { ...this.options, params: data });
  }
  displayFoodData(data: any) {
    console.log('data', data)
    return this.http.get(this.saveUserUrl + 'food/diplayFoodData', { ...this.options, params: data });
  }

  deleteData(data:any){
    return this.http.delete(this.saveUserUrl + 'users/deleteData', { ...this.options,params:data });
  }

}