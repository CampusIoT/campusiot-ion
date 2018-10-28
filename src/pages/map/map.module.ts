import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from './map';

@NgModule({
  declarations: [
    MapPage
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
    TranslateModule.forChild()
  ],
  exports: [
    MapPage
  ],
  providers: [Geolocation]
})
export class MapPageModule { }
