import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Vm } from './vm.model';

@Injectable()
export class VmService {
  selectedVm: Vm;
  Vms: Vm[];
  readonly baseURL = 'http://localhost:3000/Vms';

  constructor(private http: HttpClient) { }

  postVm(vm: Vm) {
    return this.http.post(this.baseURL, vm);
  }

  getVmList() {
    return this.http.get(this.baseURL);
  }

  putVm(vm: Vm) {
    return this.http.put(this.baseURL + `/${vm._id}`, vm);
  }

  deleteVm(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
