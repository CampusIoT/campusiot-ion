import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import L from "leaflet";

//Coordinates, PositionError
import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation';

const GEOLOCATION_OPTIONS: GeolocationOptions = {
   maximumAge: 3000, timeout: 5000, enableHighAccuracy: true
};

// TODO
// ====
// Add Devices positions
// Add Gateways positions
// Add Messages positions (lines with SNR/RSSI between devices and gateways)
// Add Devices tracks
// Add GeoJSON per user
// Edit Device position
// Edit Gateway position

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: L.Map;
  center: L.PointTuple;
  following: Boolean;
  positionMarker: L.Marker;
  positionAccuracyCircle: L.Circle;

  private geolocationSubscription;

  private marker: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public toastCtrl: ToastController
  ) {
    console.log('constructor MapPage', navParams.data);
    let marker = navParams.get("marker");
    if(marker) {
      this.marker = marker;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    //set map center
    if(this.marker) {
      this.center = this.marker.ll;
    } else {
      this.center = [45.1985564,5.7601739]; //Campus
    }

    //setup leaflet map
    this.initMap();

    //Show Toast how to enable geolocation
    let toast = this.toastCtrl.create({
      message: 'To locate your position, press icon button in top right corner ',
      position: 'middle',
      duration: 3000
      //showCloseButton: true
    });
    toast.present();
  }

  initMap() {
    this.map = L.map('map', {
      center: this.center,
      zoom: 12
    });

    //Add OSM Layer
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);

    if(this.marker) {
      // TODO add different icons (m.setIcon)
      var m = L.marker(this.marker.ll).addTo(this.map);
      m.bindPopup(this.marker.title).openPopup();

      if(this.marker.radius){
        var circle = L.circle(this.marker.ll, {
          color: 'blue',
          fillColor: '#aae1f0',
          fillOpacity: 0.4,
          radius: this.marker.radius
        }).addTo(this.map);
      }

      if(this.marker.zoom){
        this.map.setZoom(this.marker.zoom);
      }

    }

  }

  toggleFollow() {
    this.following = !this.following;

    if (this.following) {
      this.startFollow();
    } else {
      this.stopFollow();
    }
  }

  startFollow() {
    this.geolocationSubscription = this.geolocation.watchPosition(GEOLOCATION_OPTIONS)
      //.filter((p) => p.coords !== undefined) //Filter Out Errors
      .subscribe(position => {
        this.updateGeoposition(position);
      });
  }

  stopFollow() {
    this.geolocationSubscription.unsubscribe();
  }

  updateGeoposition(position: Geoposition) {
    if((!position) || (!position.coords)) return;

    var zoom = this.map.getZoom();

    console.log(position.coords.longitude + ' ' + position.coords.latitude);

    //create Point
    let latlng = {lat: position.coords.latitude, lng: position.coords.longitude, date: new Date()};

    if (this.positionMarker) {
      this.positionMarker.setLatLng(latlng);
      this.positionAccuracyCircle.setLatLng(latlng).setRadius(position.coords.accuracy);
    } else {
      this.positionMarker = L.marker(latlng).addTo(this.map);
      this.positionAccuracyCircle = L.circle(latlng, {radius: position.coords.accuracy}).addTo(this.map);
    }

    //Set Center
    this.map.setView(latlng, zoom);
  }

}
