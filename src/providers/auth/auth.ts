import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {


  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {

  }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  signupUser(newEmail: string, newPassword: string): Promise<any> {
    localStorage.setItem("active-user", newEmail);
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

  signupUserInfo(newEmail: string, newDisplayName: string): Promise<any> {
    return this.afAuth.auth.currentUser.updateProfile({
      displayName: newDisplayName,
      photoURL: undefined
    });
  }

  getUserInfo() {
    return this.afAuth.auth.currentUser.displayName;
  }


}
