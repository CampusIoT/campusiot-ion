import { BaseEntity } from './../../../models';

export const enum DeviceModel {
    'SICONIA',
    'ADENUIS_TEMP',
    'ADEUNIS_SENSOR',
    'ASCOEL_IR',
    'ASCOEL_PB',
    'ELSYS_ERS',
    'ELSYS_ELT',
    'UNKNOWN'
}

export const enum Network {
    'CAMPUSIOT',
    'TTN',
    'ORANGE',
    'OBJETNIOUS'
}

export const enum MessageType {
    'JOIN',
    'DTUP',
    'DTDN'
}

export class Device implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public location?: string,
        public model?: DeviceModel,
        public network?: Network,
        public deveui?: string,
        public appeui?: string,
        public appkey?: string,
        public delayBeforeOffline?: number,
        public createdAt?: any,
        public registeredAt?: any,
        public lastMessageAt?: any,
        public type?: MessageType,
        public fcnt?: number,
        public latitude?: number,
        public longitude?: number,
        public altitude?: number,
        public batteryLevel?: number,
        public createdById?: number,
    ) {
    }
}
