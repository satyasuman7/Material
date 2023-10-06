import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private builder: FormBuilder, private _toastr:ToastrService, private _service:AuthService, private _router:Router) {}

  registerform = this.builder.group({
    id:this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name:this.builder.control('',Validators.required),
    password:this.builder.control('',  Validators.compose([Validators.required, Validators.minLength(8)])),
    email:this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender:this.builder.control('', Validators.required),
    role:this.builder.control(''),
    isactive:this.builder.control(false)
  });

  proceedRegistration() {
    if(this.registerform.valid){
      this._service.proceedRegister(this.registerform.value).subscribe(res =>{
        this._toastr.success('Registered Successfully');
        this._router.navigate(['login']);
      });
    }
    else{
      this._toastr.warning('Please enter valid data !');
    }
  }
}
