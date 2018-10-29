import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { MainPage } from '../pages/pages';
import { Settings } from '../providers/providers';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          <ion-icon name="{{p.icon}}" start-item></ion-icon>
          {{p.title.toUpperCase() | translate }}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = MainPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'HOME', component: 'WelcomePage', icon: 'home' },
    { title: 'Tabs', component: 'TabsPage', icon: 'home' },
    { title: 'Login', component: 'LoginPage', icon: 'log-in' },
    { title: 'Signup', component: 'SignupPage', icon: 'person-add' },
    { title: 'Menu', component: 'MenuPage', icon: 'menu' },
//    { title: 'Entities', component: 'EntityPage', icon: 'logo-buffer' },
    { title: 'Devices', component: 'DevicePage', icon: 'cube' },
    { title: 'Messages', component: 'MessagePage', icon: 'mail' },
    { title: 'Map', component: 'MapPage', icon: 'map' },
    { title: 'Settings', component: 'SettingsPage', icon: 'cog' },
    { title: 'Contact', component: 'ContactPage', icon: 'contact' },
    { title: 'About', component: 'AboutPage', icon: 'information' }
  ];

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config,
              private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
