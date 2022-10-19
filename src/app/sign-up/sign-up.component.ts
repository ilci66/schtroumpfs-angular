import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignService } from '../sign.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  signUpForm: FormGroup;
  errText:String = "";
  statusInscription:boolean = false;

  constructor(private http: HttpClient, private signService:SignService) { }


  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      nom: new FormControl("", Validators.required),
      motDePasse: new FormControl("", Validators.required),
      reMotDePasse: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
    });
  }

  onSubmit() {
    console.log(this.signUpForm.valid)
    const { nom, motDePasse, reMotDePasse, role} = this.signUpForm.value;
    
    if(nom === "" || motDePasse=== "" || reMotDePasse === "" || role === "") {
      console.log("merci de remplir tous les champs")
      this.errText = "Merci de remplir tous les champs";
      return;
    } else if(motDePasse !== reMotDePasse) {
      console.log("Les mots de passe ne correspondent pas !")
      this.errText = "Les mots de passe ne correspondent pas !"
      return 
    }

    // const postData = { nom, password:motDePasse, password2:reMotDePasse, role };

    if(this.signUpForm.valid) {

      this.signService.submitSignUp(nom, motDePasse, reMotDePasse, role)
        .subscribe((res:{token:string, expiresIn:string}) => {
          const { expiresIn, token } = res;
          sessionStorage.removeItem("id_token");
          sessionStorage.removeItem("expires_at");
          const expiresAt = Date.now() + Number.parseInt(expiresIn) * 86400 * 1000; // day
  
          sessionStorage.setItem('id_token', token);
          sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
          
          // window.location.href = '/'
          this.statusInscription = true;
        })
      
      console.log("GOTTA HANDLE REDIRECTION")

      // this.http.post('http://localhost:5000/sign-up', postData)
      //   .subscribe((res:{token:string, expiresIn:string}) => {
      //     const { expiresIn, token } = res;
      //     sessionStorage.removeItem("id_token");
      //     sessionStorage.removeItem("expires_at");
      //     const expiresAt = Date.now() + Number.parseInt(expiresIn) * 86400 * 1000; // day

      //     sessionStorage.setItem('id_token', token);
      //     sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
          
      //     window.location.href = '/'
      //   })
    } else {
      console.log("le formulaire n'est pas valide !")
      this.errText = "le formulaire n'est pas valide !"
      return 
    }
  }

}
