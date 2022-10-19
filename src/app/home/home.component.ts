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
    // const headers = new HttpHeaders({})
    // this.http.get<any>('http://localhost:5000/get-all')
    //   .subscribe(res => this.tousSchtroumpfs = res.schtroumpf);
    this.schtroumpfsService.fetchSchtroumpfs()
      .subscribe(res => this.tousSchtroumpfs = res.schtroumpf);
  }

  fetchUtilisateur() {
    // const idToken = sessionStorage.getItem("id_token");
    // const expiresAt:string = sessionStorage.getItem("expires_at"); 
    
    // const config = {
    //   headers: { Authorization: sessionStorage.getItem("id_token") }
    // };

    // const headers = new HttpHeaders({
    //    Authorization: sessionStorage.getItem("id_token")
    // });

      if(!checkToken()) {
        console.log("no token or expired")
        return
      }
      // this.http.get<any>('http://localhost:5000/user', config)
      // // .catch(err => console.log(err))
      // .subscribe(res => {console.log(res); return this.utilisateur = res});
      //  this.http.get<any>('http://localhost:5000/user', { headers })
      // // .catch(err => console.log(err))
      // .subscribe(res => {console.log(res); return this.utilisateur = res});

      this.schtroumpfsService.fetchUtilisateur()
        .subscribe(res => this.utilisateur = res)

    // } else {
    //   console.log("no token or expired")
    // }
  }

  ajoutAmi(nom: string) {

    console.log("==> ", nom)

    const idToken = sessionStorage.getItem("id_token");
    const expiresAt = sessionStorage.getItem("expires_at"); 


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
    const idToken = sessionStorage.getItem("id_token");
    const expiresAt = sessionStorage.getItem("expires_at"); 
    // const nomAmi = ami;
    // const config = {
    //   headers: { Authorization: sessionStorage.getItem("id_token") }
    // };


    if(!checkToken()) {
      console.log("no token or expired")
      return
    }
      // this.http.delete(`http://localhost:5000/enlever-ami/${nomAmi}`, config)
      //   .subscribe(res => {
      //     console.log(res); 
      //     // return this.utilisateur = res
      //     this.fetchUtilisateur();
      //   })
      this.schtroumpfsService.enleverAmi(ami)
        .subscribe(res => {
          console.log(res)
          this.schtroumpfsService.fetchUtilisateur()
          .subscribe(res => this.utilisateur = res);
        })

    // } else {
    //   console.log("no token or expired")
    // }
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
