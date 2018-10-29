import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, NavController, ToastController } from 'ionic-angular';
import { Device } from './device.model';
import { DeviceService } from './device.provider';

@IonicPage({
    segment: 'device-detail/:id',
    defaultHistory: ['EntityPage', 'devicePage']
})
@Component({
    selector: 'page-device-detail',
    templateUrl: 'device-detail.html'
})
export class DeviceDetailPage {
    device: Device;

    constructor(private navCtrl: NavController, private modalCtrl: ModalController, params: NavParams,
                private deviceService: DeviceService, private toastCtrl: ToastController) {
        this.device = new Device();
        this.device.id = params.get('id');
    }

    ionViewDidLoad() {
        this.deviceService.find(this.device.id).subscribe(data => this.device = data);
    }

    open(item: Device) {
        let modal = this.modalCtrl.create('DeviceDialogPage', {item: item});
        modal.onDidDismiss(device => {
            if (device) {
                this.deviceService.update(device).subscribe(data => {
                    this.device = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Device updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

    openMessage(deveui: string) {
        this.navCtrl.push('MessagePage', {deveui: deveui});
    }

    map(device: Device) {
      let marker = {
        title: "Device: "+device.deveui + "<br/>" + device.name,
        radius: 100,
        zoom: 17,
        ll: [device.latitude, device.longitude]
      };
      this.navCtrl.push('MapPage', {marker: marker});
    }
}
