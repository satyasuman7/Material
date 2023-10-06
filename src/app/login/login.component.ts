import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    userData:any;

  constructor(private builder: FormBuilder, private _toastr:ToastrService, private service:AuthService, private router:Router) {
    sessionStorage.clear();
  }

  loginForm = this.builder.group({
    name:this.builder.control('', Validators.required),
    password:this.builder.control('', Validators.required)
  })

  proceedLogin() {
    this.service.getDataDetails(this.loginForm.value.name).subscribe(res =>{
      this.userData = res;
      console.log(this.userData);
      if(this.userData.password === this.loginForm.value.password){
        if(this.userData.isactive){
          sessionStorage.setItem('username', this.userData.name);
          sessionStorage.setItem('userrole', this.userData.role);
          this.router.navigate(['']);
          this._toastr.success("Login Succesfully!");
        }else{
          this._toastr.error("Please contact admin", 'In Active User');
        }
      }else{
        this._toastr.error("User not found");
      }
    });
  }
}
