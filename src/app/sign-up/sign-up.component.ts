import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SignService } from '../sign.service';
import { saveUserSession } from 'src/utils';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  signUpForm: FormGroup;
  errText:string = "";
  statusInscription:boolean = false;
  roles = ["guerrier", "alchimiste", "sorcier", "espions", "enchanteur"];

  constructor(private signService:SignService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      nom: new FormControl("", Validators.required),
      motDePasse: new FormControl("", Validators.required),
      reMotDePasse: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
    });
  }
  
  private setErrorText(text:string) {
    this.errText = text;
  } ;

  onSubmit() {
    // console.log(this.signUpForm.valid)
    const { nom, motDePasse, reMotDePasse, role} = this.signUpForm.value;
    
    if(nom === "" || motDePasse=== "" || reMotDePasse === "" || role === "") {
      console.log("merci de remplir tous les champs")
      this.setErrorText("Merci de remplir tous les champs");
      this.statusInscription = false;
      return;
    } else if(motDePasse !== reMotDePasse) {
      console.log("Les mots de passe ne correspondent pas !")
      this.statusInscription = false;
      this.setErrorText("Les mots de passe ne correspondent pas !")
      return 
    }

    if(this.signUpForm.valid) {

      this.signService.submitSignUp(nom, motDePasse, reMotDePasse, role)
        .subscribe((res:{token:string, expiresIn:string}) => {
          const { expiresIn, token } = res;
          saveUserSession(expiresIn,token);
          this.statusInscription = true;
        }, (err: HttpErrorResponse) => {
          console.log(err.error.error)
          this.statusInscription = false;
          this.setErrorText(err.error.error);
        })
      
      console.log("GOTTA HANDLE REDIRECTION")
    } else {
      console.log("le formulaire n'est pas valide !")
      this.statusInscription = false;
      this.setErrorText("le formulaire n'est pas valide !")
      return 
    }
  }

}
