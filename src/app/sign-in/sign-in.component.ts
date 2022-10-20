import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { saveUserSession } from 'src/utils';
import { SignService } from '../sign.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  errText:string = "";
  statusConnection:boolean = false;

  constructor(private signService:SignService ) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      nom: new FormControl("", Validators.required),
      motDePasse: new FormControl("", Validators.required),
    });
  }

  private setErrorText(text:string) {
    this.errText = text;
  } ;

  onSubmit() {
    // console.log(this.signInForm)
    const { nom, motDePasse} = this.signInForm.value;
    if(nom === "" || motDePasse === "") {
      this.setErrorText("merci de remplir tous les champs");
      return
    }
    if(this.signInForm.valid) {

      this.signService.submitSignIn(nom, motDePasse)
        .subscribe((res:{token:string, expiresIn:string}) => {
          const { expiresIn, token } = res;
          saveUserSession(expiresIn, token);
          
          // window.location.href = '/'
          this.statusConnection =  true;
          this.setErrorText("");
        }, (err: HttpErrorResponse) => {
          console.log(err.error.error)
          this.statusConnection = false;
          this.setErrorText(err.error.error);

        })
      
      console.log("GOTTA HANDLE REDIRECTION")
    }
  }
}
