import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceDetailPage } from './device-detail';
import { DeviceService } from './device.provider';

@NgModule({
    declarations: [
        DeviceDetailPage
    ],
    imports: [
        IonicPageModule.forChild(DeviceDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        DeviceDetailPage
    ],
    providers: [DeviceService]
})
export class DeviceDetailPageModule {
}
