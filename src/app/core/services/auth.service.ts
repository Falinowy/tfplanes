import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData;
  readonly authState$ = this.fireAuth.authState;

  constructor(private fireAuth: AngularFireAuth) {}

  login(credentials: Credentials) {
    return this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(userCredential => this.userData = userCredential.user);
  }

  isLoggedIn() {
    return !!this.userData;
  }
  register(credentials: Credentials) {
    return this.fireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  logout() {
    return this.fireAuth.signOut();
  }

  get user() {
    return this.userData;
  }
}
