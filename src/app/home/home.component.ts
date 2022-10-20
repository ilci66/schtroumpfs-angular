import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SchtroumpfsService } from '../schtroumpfs.service';
import { checkToken } from 'src/utils';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private schtroumpfsService: SchtroumpfsService) { }

  tousSchtroumpfs = [];
  errText: string = "";
  utilisateur: {nom:string, role: string, friends: [string]};
  editForm: FormGroup;
  editMode: boolean = false;
  statusEditForm: boolean = false;
  schtroumpfs: {}[] | any = []
  roles = ["guerrier", "alchimiste", "sorcier", "espions", "enchanteur"];

  ngOnInit(): void {
    this.fetchSchtroumpfs();
    if(sessionStorage.getItem("id_token")) {
      this.fetchUtilisateur();
    } else {
      this.fetchUtilisateur = undefined
    }
    
    this.editForm = new FormGroup({
      nom: new FormControl("", Validators.required),
      motDePasse: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
    });
  }

  private setErrorText(text:string) {
    this.errText = text;
  } ;

  activateEdit() { this.editMode = true };

  onSubmit() {
    console.log(this.editForm.value)
    const { nom, motDePasse, role } = this.editForm.value;

    if(nom === "" || motDePasse === "" || role === "") {
      this.setErrorText("merci de remplir tous les champs");
      return;
    } if(this.editForm.valid) {
      const data = { nomAModifier : nom, password: motDePasse,
role };
      this.schtroumpfsService.modifierUtilisateur(data)
        .subscribe((res: {nom:string, role:string, friends:[string]}) => {
          this.utilisateur = res;
          this.statusEditForm = true;
          this.editMode = false;
        }, (err: HttpErrorResponse) => {
          console.log(err.error.error)
          this.statusEditForm = false;
          this.setErrorText(err.error.error);
        })
    }

  }

  fetchSchtroumpfs() {
    this.schtroumpfsService.fetchSchtroumpfs()
      .subscribe(res => this.tousSchtroumpfs = res.schtroumpf);
  }

  fetchUtilisateur() {
    if(!checkToken()) {
      console.log("no token or expired")
      this.setErrorText("Le jeton expiré")
      return
    }

    this.schtroumpfsService.fetchUtilisateur()
      .subscribe(res => this.utilisateur = res)
  }

  ajoutAmi(nom: string) {
    if(!checkToken()) {
      console.log("no token or expired")
      this.setErrorText("Le jeton expiré")
      return
    } 
    if(this.utilisateur.friends.indexOf(nom) >= 0) {
      this.setErrorText("Ami déjà dans la liste");
      return
    }

    
    this.schtroumpfsService.ajouterAmi(nom)
      .subscribe(res => {
        console.log(res);
        this.schtroumpfsService.fetchUtilisateur()
          .subscribe((res: {nom:string, role: string, friends: [string]}) => {
            this.setErrorText("");
            this.utilisateur = res
            return
          }, (err: HttpErrorResponse) => {
            this.setErrorText(err.error.error);
          });
      })

  }

  enleverAmi(ami: string) {  

    if(!checkToken()) {
      console.log("no token or expired")
      return
    };

    this.schtroumpfsService.enleverAmi(ami)
      .subscribe(res => {
        console.log(res)
        this.schtroumpfsService.fetchUtilisateur()
        .subscribe(res => {
          this.utilisateur = res
        }, (err: HttpErrorResponse) => {
          console.log(err.error.error)
          this.setErrorText(err.error.error);
        });
      })
  }
}
