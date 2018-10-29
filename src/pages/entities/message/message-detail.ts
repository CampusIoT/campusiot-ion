import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Message } from './message.model';
import { MessageService } from './message.provider';
//  import { HexstringPipe } from './hexstring.pipe';

@IonicPage({
    segment: 'message-detail/:id',
    defaultHistory: ['EntityPage', 'messagePage']
})
@Component({
    selector: 'page-message-detail',
    templateUrl: 'message-detail.html'
})
export class MessageDetailPage {
    message: Message;

    constructor(private dataUtils: JhiDataUtils, private navCtrl: NavController,
                private modalCtrl: ModalController, params: NavParams,
                private messageService: MessageService, private toastCtrl: ToastController) {
        this.message = new Message();
        this.message.id = params.get('id');
    }

    ionViewDidLoad() {
        this.messageService.find(this.message.id).subscribe(data => this.message = data);
    }

    open(item: Message) {
        let modal = this.modalCtrl.create('MessageDialogPage', {item: item});
        modal.onDidDismiss(message => {
            if (message) {
                this.messageService.update(message).subscribe(data => {
                    this.message = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Message updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    detailDevice(id: number) {
        this.navCtrl.push('DeviceDetailPage', {id: id});
    }

    toHexstring(base64: string) {
        if (base64) {
          var buf = Buffer.from(base64, 'base64');
          return buf.toString('hex');
        } else {
          return base64;
        }
    }

    map(message: Message) {
      let marker = {
        title: "Device: "+message.sentByDeveui + "<br/>" + message.date,
        radius: 100,
        zoom: 17,
        ll: [message.latitude, message.longitude]
      };
      this.navCtrl.push('MapPage', {marker: marker});
    }
}
