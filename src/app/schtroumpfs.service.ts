import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchtroumpfsService {

  constructor(private http: HttpClient) { }

  headerGeneric = new HttpHeaders({
    Authorization: sessionStorage.getItem("id_token")
  });

  fetchSchtroumpfs(): Observable<{}[]> | any {
    return this.http.get<any>('http://localhost:5000/get-all')
  }

  fetchUtilisateur(): Observable<any>  {
    return this.http.get<any>('http://localhost:5000/user', { headers: this.headerGeneric })
  }

  ajouterAmi(nom: string): Observable<any> {
    return this.http.post<any>('http://localhost:5000/ajout-ami', { nomAmi: nom } , { headers: this.headerGeneric })
  }

  enleverAmi(nom: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/enlever-ami/${nom}`, { headers: this.headerGeneric })
  }
}
