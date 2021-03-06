import { DeviceService } from '../device';
import { User as UserService } from '../../../providers/user/user';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageDialogPage } from './message-dialog';
import { MessageService } from './message.provider';

@NgModule({
    declarations: [
        MessageDialogPage
    ],
    imports: [
        IonicPageModule.forChild(MessageDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        MessageDialogPage
    ],
    providers: [
        MessageService,
        DeviceService,
        UserService,
    ]
})
export class MessageDialogPageModule {
}
