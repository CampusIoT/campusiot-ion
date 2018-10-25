import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Device } from './device.model';
import { DeviceService } from './device.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-device',
    templateUrl: 'device.html'
})
export class DevicePage {
    devices: Device[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private deviceService: DeviceService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.devices = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.deviceService.query().subscribe(
            (response) => {
                this.devices = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Device) {
        return item.id;
    }

    open(slidingItem: any, item: Device) {
        let modal = this.modalCtrl.create('DeviceDialogPage', {item: item});
        modal.onDidDismiss(device => {
            if (device) {
                if (device.id) {
                    this.deviceService.update(device).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Device updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.deviceService.create(device).subscribe(data => {
                        this.devices.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Device added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(device) {
        this.deviceService.delete(device.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Device deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(device: Device) {
        this.navCtrl.push('DeviceDetailPage', {id: device.id});
    }
}
