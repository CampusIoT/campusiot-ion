import { User as UserService } from '../../../providers/user/user';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceDialogPage } from './device-dialog';
import { DeviceService } from './device.provider';

@NgModule({
    declarations: [
        DeviceDialogPage
    ],
    imports: [
        IonicPageModule.forChild(DeviceDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        DeviceDialogPage
    ],
    providers: [
        DeviceService,
        UserService,
    ]
})
export class DeviceDialogPageModule {
}
