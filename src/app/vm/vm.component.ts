import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { VmService } from '../shared/vm.service';
import { Vm } from '../shared/vm.model';

declare var M: any;

@Component({
  selector: 'app-Vm',
  templateUrl: './Vm.component.html',
  styleUrls: ['./Vm.component.css'],
  providers: [VmService]
})
export class VmComponent implements OnInit {
   message:string="Démarrer"
  constructor(private VmService: VmService) { }
  couleur:boolean=true;
  ngOnInit() {
    this.resetForm();
    this.refreshVmList();
  }

  onClick(event: any){
    this.couleur=!this.couleur;
    if(this.couleur){
      this.message="démarrer";
    }
    else{
      this.message="arreter";
    }    
  };

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.VmService.selectedVm = {
      _id: "",
      name: "",
      adresse: "",
      état: ""
    }
  }
  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.VmService.postVm(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshVmList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.VmService.putVm(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshVmList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshVmList() {
    this.VmService.getVmList().subscribe((res) => {
      this.VmService.Vms = res as Vm[];
    });
  }

  onEdit(vm: Vm) {
    this.VmService.selectedVm = vm;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.VmService.deleteVm(_id).subscribe((res) => {
        this.refreshVmList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
