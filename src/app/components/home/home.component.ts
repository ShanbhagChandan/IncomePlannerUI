import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ToastrService } from 'ngx-toastr';
import { ExpensesCharts } from 'src/app/models/expensescharts';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  dataLoad: boolean = false;
  expenseCharts: ExpensesCharts[];
  isEmptyData:boolean = true;

  constructor(private dashboardService: DashboardService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.dashboardService.getExpensesCharts().subscribe({
      next:(result:ExpensesCharts[])=>{
        if(result!=null && result!=undefined && result.length>0){
          this.expenseCharts = result;
          this.isEmptyData = false;
        }
        console.log(result);
      },
      error:(err)=>{
        this.toastr.error(err.statusText, err.status, {
          timeOut: 8000,
        })
      },
      complete:()=>{
        this.dataLoad = true;
      }
    })
  }
}
