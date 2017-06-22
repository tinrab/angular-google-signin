import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  signIn(): void {
    this.authService.signIn().then(user => {
      this.router.navigate(['/home']);
    }).catch(error => {
      console.log(error);
    });
  }

}
