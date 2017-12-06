import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserModule } from '@angular/platform-browser';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// Import the AF2 Module
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';

// Importing AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';


// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyABXA9nfawiYhdthe7gkmjjL3r6Ryv7FwA",
  authDomain: "friends-chat-app-69.firebaseapp.com",
  databaseURL: "https://friends-chat-app-69.firebaseio.com",
  projectId: "friends-chat-app-69",
  storageBucket: "friends-chat-app-69.appspot.com",
  messagingSenderId: "825015271614"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplashScreen,
    StatusBar,
    AuthProvider
  ]
})
export class AppModule {}
