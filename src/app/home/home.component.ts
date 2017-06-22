import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.user;
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

}
