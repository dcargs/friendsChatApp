import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   public messageForm : FormGroup;
   public messageList: Observable<any[]>;

  constructor(public navCtrl: NavController, public authData: AuthProvider, public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController, public afDatabase: AngularFireDatabase) {
      // create instance of message form and add validators
      this.messageForm = this.formBuilder.group({
        message: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      });

      // connect data to live changes from server
      //this.messageList = afDatabase.list<AngularFireList>('/Messages').valueChanges()
      this.messageList = afDatabase.list('Messages').valueChanges()

      console.log(this.messageList);
  }

  sendMessage(){
    if (!this.messageForm.valid){
      console.log(this.messageForm.value)
    } else {
      // this.messageList.push(this.messageForm.value)
      this.afDatabase.list('Messages').push(this.messageForm.value)
    }
  }//end login user


  logoutHome(): void {
    this.navCtrl.setRoot('LoginPage')
      .then ( navCtrl => {
        this.authData.logoutUser()
      })
  }

}
