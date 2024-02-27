import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ExpensesCharts } from 'src/app/models/expensescharts';

@Component({
  selector: 'app-expense-charts',
  templateUrl: './expense-charts.component.html',
  styleUrls: ['./expense-charts.component.css']
})
export class ExpenseChartsComponent {
  Highcharts: typeof Highcharts = Highcharts;
  @Input() expensesChart: ExpensesCharts;
  categories: string[]=[];
  series: any[] = [];
  chartOptions: Highcharts.Options = {};

  constructor() {

  }

  ngOnInit() {
    if (this.expensesChart != null && this.expensesChart != undefined) {
      this.expensesChart.ExpensesChartsData.forEach(element => {
        this.categories.push(element.ChartItemName);

        element.DataSeries.forEach(data => {
          let obj = {};
          if (this.series.length > 0) {
            obj = this.series.find(x => x.name == data.Name);
            if (obj != null || obj != undefined) {
              obj['data'].push(data.Value);
            }
            else {
              obj = {
                data: [data.Value],
                name: [data.Name],
                type: 'column'
              }
              this.series.push(obj);
            }
          }
          else {
            obj = {
              data: [data.Value],
              name: [data.Name],
              type: 'column'
            }
            this.series.push(obj);
          }
        });
      });

      this.chartOptions = {
        chart: {
          type: 'column'
        },
        title: {
          text: this.expensesChart.ChartTitle,
          align: 'center'
        },
        subtitle: {
          text: this.expensesChart.ChartSubTitle,
          align: 'center'
        },
        xAxis: {
          categories: this.categories,
          crosshair: true,
          accessibility: {
            description: 'Items'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Indian Rupees (Rupees)'
          }
        },
        tooltip: {
          valueSuffix: '(Rupees)'
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: this.series,
        credits: {
          enabled: false
        }
      };
    }
  }
}
