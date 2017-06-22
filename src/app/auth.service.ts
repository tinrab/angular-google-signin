import { Injectable } from '@angular/core';
import { User } from './user';

declare const gapi: any;

@Injectable()
export class AuthService {

  readonly clientId = '521629876903-t16rvlfe69e5kmmnvh8jlnebh9a9hmae.apps.googleusercontent.com';

  user: User;
  private auth2: any;

  constructor() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: 'profile'
      }).then((auth2) => {
        this.auth2 = auth2;
      });
    });

    this.user = <User>JSON.parse(localStorage.getItem('user'));
  }

  get isSignedIn(): boolean {
    return this.user !== null;
  }

  signIn(): Promise<User> {
    if (this.auth2.isSignedIn.get()) {
      this.user = this.extractUser(this.auth2.currentUser.get());
      return Promise.resolve(this.user);
    }

    return new Promise((resolve, reject) => {
      this.auth2.isSignedIn.listen(signedIn => {
        if (signedIn) {
          this.user = this.extractUser(this.auth2.currentUser.get());
          resolve(this.user);
        } else {
          reject('sign-in error');
        }
      });
      this.auth2.signIn();
    });
  }

  private extractUser(googleUser: any): User {
    const profile = googleUser.getBasicProfile();
    return new User(
      profile.getId(),
      profile.getName(),
      profile.getEmail(),
      profile.getImageUrl()
    );
  }

  signOut(): void {
    this.user = null;
    localStorage.removeItem('user');
    this.auth2.isSignedIn.listen(null);
    this.auth2.signOut();
  }

}
