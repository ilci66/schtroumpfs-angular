import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SchtroumpfsService } from '../schtroumpfs.service';
import { checkToken } from 'src/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private schtroumpfsService: SchtroumpfsService) { }

  tousSchtroumpfs = [];
  utilisateur: {nom:string, role: string, friends: []};
  editForm: FormGroup;
  schtroumpfs: {}[] | any = []

  onSubmit() {
    // console.log(this.editForm.valid)

  }

  fetchSchtroumpfs() {
    this.schtroumpfsService.fetchSchtroumpfs()
      .subscribe(res => this.tousSchtroumpfs = res.schtroumpf);
  }

  fetchUtilisateur() {
    if(!checkToken()) {
      console.log("no token or expired")
      return
    }
    this.schtroumpfsService.fetchUtilisateur()
      .subscribe(res => this.utilisateur = res)
  }

  ajoutAmi(nom: string) {

    console.log("==> ", nom)

    if(!checkToken()) {
      console.log("no token or expired")
      return
    }
      
    this.schtroumpfsService.ajouterAmi(nom)
      .subscribe(res => {
        console.log(res);
        this.schtroumpfsService.fetchUtilisateur()
          .subscribe(res => this.utilisateur = res);
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
        .subscribe(res => this.utilisateur = res);
      })
  }

  ngOnInit(): void {

    this.fetchSchtroumpfs();
    this.fetchUtilisateur();
    
    this.editForm = new FormGroup({
      nom: new FormControl("", Validators.required),
      motDePasse: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
    });
  }

}
