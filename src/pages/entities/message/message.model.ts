import { BaseEntity } from './../../../models';

export const enum MessageType {
    'JOIN',
    'DTUP',
    'DTDN'
}

export const enum Network {
    'CAMPUSIOT',
    'TTN',
    'ORANGE',
    'OBJETNIOUS'
}

export class Message implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public type?: MessageType,
        public fcnt?: number,
        public network?: Network,
        public payloadContentType?: string,
        public payload?: any,
        public json?: any,
        public latitude?: number,
        public longitude?: number,
        public altitude?: number,
        public batteryLevel?: number,
        public sentById?: number,
        public deviceOwnerId?: number,
    ) {
    }
}
