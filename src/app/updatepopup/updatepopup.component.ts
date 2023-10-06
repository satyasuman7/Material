import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.scss']
})
export class UpdatepopupComponent implements OnInit {
  rolelist: any;
  editdata: any;

  constructor(private builder: FormBuilder, private _service: AuthService, @Inject(MAT_DIALOG_DATA) public data: any, private _toastr: ToastrService, private _dialog: MatDialogRef<UpdatepopupComponent>) { }



  ngOnInit(): void {
    this._service.getDataRole().subscribe(res => {
      this.rolelist = res;
    })
    if (this.data.usercode != null && this.data.usercode != '') {
      this._service.getDataDetails(this.data.usercode).subscribe(res => {
        this.editdata = res;
        this.registerform.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          email: this.editdata.email,
          password: this.editdata.password,
          role: this.editdata.role,
          gender: this.editdata.gender,
          isactive: this.editdata.isactive,
        })
      });
    }
  }

  registerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control(''),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false)
  });

  updateUser() {
    if (this.registerform.valid) {
      this._service.updateUser(this.registerform.value.id, this.registerform.value).subscribe(res => {
        this._toastr.success("Update successfully");
        this._dialog.close();
      });
    }
    else {
      this._toastr.warning('Please select Role');
    }
  }
}
