import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    // this.dashboardService.GetWeatherForcast().subscribe((data: any) => {
    //     if(data !=null){
    //       console.log(data);
    //     }
    //     else{
    //       console.log(data);
    //     }
    // })
  }

}
