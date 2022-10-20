import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schtroumpfs, Utilisateur, AModifier } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class SchtroumpfsService {

  constructor(private http: HttpClient) { }

  headerGeneric = new HttpHeaders({
    Authorization: sessionStorage.getItem("id_token")
  });

  fetchSchtroumpfs(): Observable<{schtroumpf: [Schtroumpfs]}> {
    return this.http.get<{schtroumpf: [Schtroumpfs]}>('http://localhost:5000/all')
  }
  
  fetchUtilisateur(): Observable<Utilisateur>  {
    return this.http.get<Utilisateur>('http://localhost:5000/user', { headers: this.headerGeneric })
  }
  
  modifierUtilisateur(data: AModifier ): Observable<any> {
    return this.http.post<Utilisateur>("http://localhost:5000/user/modifier", data, { headers: this.headerGeneric })
  }

  ajouterAmi(nom: string): Observable<Utilisateur> {
    return this.http.post<Utilisateur>('http://localhost:5000/ami/', { nomAmi: nom } , { headers: this.headerGeneric })
  }

  enleverAmi(nom: string): Observable<{ }> {
    return this.http.delete<Utilisateur>(`http://localhost:5000/ami/${nom}`, { headers: this.headerGeneric })
  }

}
