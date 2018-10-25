import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Device } from './device.model';
import { DeviceService } from './device.provider';
import { User } from '../../../models/user.model';
import { User as UserService } from '../../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-device-dialog',
    templateUrl: 'device-dialog.html'
})
export class DeviceDialogPage {

    device: Device;
    users: User[];
    createdAt: string;
    registeredAt: string;
    lastMessageAt: string;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private userService: UserService,
                private deviceService: DeviceService) {
        this.device = params.get('item');
        if (this.device && this.device.id) {
            this.deviceService.find(this.device.id).subscribe(data => {
                this.device = data;
            });
        } else {
            this.device = new Device();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.device.id : null],
            name: [params.get('item') ? this.device.name : '',  Validators.required],
            location: [params.get('item') ? this.device.location : '', ],
            model: [params.get('item') ? this.device.model : '',  Validators.required],
            network: [params.get('item') ? this.device.network : '', ],
            deveui: [params.get('item') ? this.device.deveui : '',  Validators.required],
            appeui: [params.get('item') ? this.device.appeui : '',  Validators.required],
            appkey: [params.get('item') ? this.device.appkey : '',  Validators.required],
            delayBeforeOffline: [params.get('item') ? this.device.delayBeforeOffline : '', ],
            createdAt: [params.get('item') ? this.device.createdAt : '',  Validators.required],
            registeredAt: [params.get('item') ? this.device.registeredAt : '',  Validators.required],
            lastMessageAt: [params.get('item') ? this.device.lastMessageAt : '', ],
            type: [params.get('item') ? this.device.type : '', ],
            fcnt: [params.get('item') ? this.device.fcnt : '', ],
            latitude: [params.get('item') ? this.device.latitude : '', ],
            longitude: [params.get('item') ? this.device.longitude : '', ],
            altitude: [params.get('item') ? this.device.altitude : '', ],
            batteryLevel: [params.get('item') ? this.device.batteryLevel : '', ],
            user: [params.get('item') ? this.device.createdById : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the device, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
