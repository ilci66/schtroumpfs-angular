import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignService } from '../sign.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  errText:String = "";
  statusConnection:boolean = false;

  constructor(private signService:SignService ) { }


  ngOnInit(): void {
    this.signInForm = new FormGroup({
      nom: new FormControl("", Validators.required),
      motDePasse: new FormControl("", Validators.required),
    });
  }

  onSubmit() {
    console.log(this.signInForm)
    if(this.signInForm.valid) {
      const { nom, motDePasse} = this.signInForm.value;

      this.signService.submitSignIn(nom, motDePasse)
        .subscribe((res:{token:string, expiresIn:string}) => {
          const { expiresIn, token } = res;
          sessionStorage.removeItem("id_token");
          sessionStorage.removeItem("expires_at");
          const expiresAt = Date.now() + Number.parseInt(expiresIn) * 86400 * 1000; // day

          sessionStorage.setItem('id_token', token);
          sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
          
          // window.location.href = '/'
          this.statusConnection =  true;
        })
      
      console.log("GOTTA HANDLE REDIRECTION")
      

      // console.log(nom, motDePasse)

      // const postData = { nom, password:motDePasse }

      // this.http.post('http://localhost:5000/sign-in', postData)
      //   .subscribe((res:{token:string, expiresIn:string}) => {
      //     const { expiresIn, token } = res;
      //     sessionStorage.removeItem("id_token");
      //     sessionStorage.removeItem("expires_at");
      //     const expiresAt = Date.now() + Number.parseInt(expiresIn) * 86400 * 1000; // day

      //     sessionStorage.setItem('id_token', token);
      //     sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
          
      //     window.location.href = '/'
      //   })
    }
  }
}
