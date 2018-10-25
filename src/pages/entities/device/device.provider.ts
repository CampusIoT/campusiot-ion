import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { Device } from './device.model';

@Injectable()
export class DeviceService {
    private resourceUrl = Api.API_URL + '/devices';

    constructor(private http: HttpClient) { }

    create(device: Device): Observable<Device> {
        return this.http.post(this.resourceUrl, device);
    }

    update(device: Device): Observable<Device> {
        return this.http.put(this.resourceUrl, device);
    }

    find(id: number): Observable<Device> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
