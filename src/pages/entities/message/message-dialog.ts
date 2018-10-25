import { Component } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Message } from './message.model';
import { MessageService } from './message.provider';
import { Device, DeviceService } from '../device';
import { User } from '../../../models/user.model';
import { User as UserService } from '../../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-message-dialog',
    templateUrl: 'message-dialog.html'
})
export class MessageDialogPage {

    message: Message;
    devices: Device[];
    users: User[];
    date: string;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private dataUtils: JhiDataUtils,                 private deviceService: DeviceService,
                private userService: UserService,
                private messageService: MessageService) {
        this.message = params.get('item');
        if (this.message && this.message.id) {
            this.messageService.find(this.message.id).subscribe(data => {
                this.message = data;
            });
        } else {
            this.message = new Message();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.message.id : null],
            date: [params.get('item') ? this.message.date : '',  Validators.required],
            type: [params.get('item') ? this.message.type : '',  Validators.required],
            fcnt: [params.get('item') ? this.message.fcnt : '',  Validators.required],
            network: [params.get('item') ? this.message.network : '',  Validators.required],
            payload: [params.get('item') ? this.message.payload : '',  Validators.required],
            payloadContentType: [params.get('item') ? this.message.payloadContentType : ''],
            json: [params.get('item') ? this.message.json : '', ],
            latitude: [params.get('item') ? this.message.latitude : '', ],
            longitude: [params.get('item') ? this.message.longitude : '', ],
            altitude: [params.get('item') ? this.message.altitude : '', ],
            batteryLevel: [params.get('item') ? this.message.batteryLevel : '', ],
            device: [params.get('item') ? this.message.sentById : '',],
            user: [params.get('item') ? this.message.deviceOwnerId : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.deviceService.query()
            .subscribe(data => { this.devices = data; }, (error) => this.onError(error));
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the message, so return it
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

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);

    }

    compareDevice(first: Device, second: Device): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackDeviceById(index: number, item: Device) {
        return item.id;
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }


}
