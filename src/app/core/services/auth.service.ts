import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: any;
  readonly authState$ = this.fireAuth.authState;

  constructor(private fireAuth: AngularFireAuth, private injector: Injector) {}

  login(credentials: Credentials) {
    return runInInjectionContext(this.injector, () =>
      this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((userCredential: any) => this.userData = userCredential.user)
    );
  }

  isLoggedIn() {
    return !!this.userData;
  }
  
  register(credentials: Credentials) {
    return runInInjectionContext(this.injector, () =>
      this.fireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)
    );
  }

  logout() {
    return runInInjectionContext(this.injector, () =>
      this.fireAuth.signOut()
    );
  }

  get user() {
    return this.userData;
  }
}
