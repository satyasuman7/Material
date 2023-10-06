import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  title = 'MaterialUIProject';
  ismenurequired=false;
  constructor(private _router:Router){}

  ngDoCheck(): void {
    let currentUrl = this._router.url;
    if(currentUrl=='/login' || currentUrl=='/register'){
      this.ismenurequired=false;
    }
    else{
      this.ismenurequired=true;
    }
  }
}
