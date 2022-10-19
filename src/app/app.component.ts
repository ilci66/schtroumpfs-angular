import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  deconnecter() {
    sessionStorage.removeItem('expires_at')
    sessionStorage.removeItem('id_token')

    window.location.href = '/sign-in'
  }
  title = 'schtroumpfs-angular';
}
