import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(private http: HttpClient) { }

  submitSignUp(nom:string, motDePasse:string, reMotDePasse:string, role:string) {

    const postData = { nom, password:motDePasse, password2:reMotDePasse, role };

    return this.http.post('http://localhost:5000/user/sign-up', postData)
  
  }

  submitSignIn(nom:string, motDePasse: string){
   
    const postData = { nom, password: motDePasse }

    return this.http.post('http://localhost:5000/user/sign-in', postData)

  }

}
