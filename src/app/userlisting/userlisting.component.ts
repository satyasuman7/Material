import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.scss']
})
export class UserlistingComponent {
  userlist:any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private _service:AuthService, private _dialog:MatDialog){
    this.LoadUser();
  }

  LoadUser(){
    this._service.getData().subscribe(res =>{
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }

  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'status', 'action'];

  UpdateUser(code:any){
    const popup = this._dialog.open(UpdatepopupComponent,{
      width:'50%',
      data:{
        usercode:code
      }
    })
    popup.afterClosed().subscribe(res =>{
      this.LoadUser();
    });
  }

  // opendialog(){
  //   // this.LoadUser();
  // }
}
