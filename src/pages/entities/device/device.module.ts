import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { DevicePage } from './device';
import { DeviceService } from './device.provider';

@NgModule({
    declarations: [
        DevicePage
    ],
    imports: [
        IonicPageModule.forChild(DevicePage),
        TranslateModule.forChild()
    ],
    exports: [
        DevicePage
    ],
    providers: [DeviceService]
})
export class DevicePageModule {
}
