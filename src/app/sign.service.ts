import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(private http: HttpClient) { }

  submitSignUp(nom:string, motDePasse:string, reMotDePasse:string, role:string) {

    const postData = { nom, password:motDePasse, password2:reMotDePasse, role };

    return this.http.post('http://localhost:5000/sign-up', postData)
      // .subscribe((res:{token:string, expiresIn:string}):boolean => {
      //   const { expiresIn, token } = res;
      //   sessionStorage.removeItem("id_token");
      //   sessionStorage.removeItem("expires_at");
      //   const expiresAt = Date.now() + Number.parseInt(expiresIn) * 86400 * 1000; // day

      //   sessionStorage.setItem('id_token', token);
      //   sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
        
      //   // window.location.href = '/'
      //   return true;
      // })
  
  }

  submitSignIn(nom:string, motDePasse: string){
   
    const postData = { nom, password: motDePasse }

    return this.http.post('http://localhost:5000/sign-in', postData)

  }

}
