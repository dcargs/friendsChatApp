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
   public user: String;

  constructor(public navCtrl: NavController, public authData: AuthProvider, public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController, public afDatabase: AngularFireDatabase) {
      // create instance of message form and add validators
      this.messageForm = this.formBuilder.group({
        data: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      });

      // connect data to live changes from server
      this.messageList = afDatabase.list('Messages',
      ref => ref.orderByChild('order')).valueChanges()
  }

  sendMessage(){
    if (!this.messageForm.valid){
      console.log(this.messageForm.value)
    } else {
      var today = new Date();
      var newMessageRef = this.afDatabase.list('Messages').push({});
      newMessageRef.set({
          data: this.messageForm.value.data,
          user: localStorage.getItem("active-user"),
          time: (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear() +
          " @ " + (today.getHours()<10?'0':'') + today.getHours() + ":" + (today.getMinutes()<10?'0':'') + today.getMinutes() + ":" + (today.getSeconds()<10?'0':'') + today.getSeconds(),
          order: (-1 * Date.now())
      })
      .then ( newMessageRef => {
        this.messageForm.reset()
      });
    }
  }//end login user


  logoutHome(): void {
    this.navCtrl.setRoot('LoginPage')
      .then ( navCtrl => {
        this.authData.logoutUser()
      })
  }

}
