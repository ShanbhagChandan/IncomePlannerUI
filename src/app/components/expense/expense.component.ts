import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ItemPriceData } from 'src/app/models/itempricedata';
import { ExpensedialogComponent } from './expensedialog.component';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { DeletedialogComponent } from '../common/deletedialog/deletedialog.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {
  displayedColumns: string[] = ['Index', 'ItemName', 'BaseCost', 'AdditionalCost', 'TotalCost', 'Actions'];
  dataSource: ItemPriceData[] = [];
  //count: number = 0;
  @Input() activeTableId: number;
  @Input() activeTableName: string;
  emptyTable: boolean = false;
  dataLoad: boolean = false;
  emptyElement: ItemPriceData = {
    Id: 0,
    ItemName: "",
    BaseCost: 0,
    AdditionalCost: 0,
    TotalCost: 0
  }
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(private dialog: MatDialog, 
    private dashboardService: DashboardService, 
    private toastr: ToastrService) {

  }

  ngOnInit() {
    this.dashboardService.getItemsTableDetails(this.activeTableId).subscribe({
      next: (response: ItemPriceData[]) => {
        if (response != null && response != undefined && response.length > 0) {
          this.dataSource = response;
          //this.count = response.length;
          this.emptyTable = false;
          this.table.renderRows();
        }
        else {
          this.emptyTable = true;
          this.table.renderRows();
        }
      },
      error: (err) => {
        this.toastr.error(err.statusText, err.status, {
          timeOut: 8000,
        })
      },
      complete: () => {
        this.dataLoad = true;
      }
    })
  }

  ngOnChanges() {
    this.emptyTable = false;
    this.dashboardService.getItemsTableDetails(this.activeTableId).subscribe({
      next: (response: ItemPriceData[]) => {
        if (response != null && response != undefined && response.length > 0) {
          this.dataSource = response;
          //this.count = response.length;
          this.emptyTable = false;
          this.table.renderRows();
        }
        else {
          this.emptyTable = true;
          this.dataSource = [];
          this.table.renderRows();
        }
      },
      error: (err) => {
        this.toastr.error(err.statusText, err.status, {
          timeOut: 8000,
        })
      },
      complete: () => {
        this.dataLoad = true;
      }
    })
  }

  getTotalBaseCost() {
    if (this.dataSource != null && this.dataSource != undefined) {
      return this.dataSource.map(t => t.BaseCost).reduce((acc, value) => acc + value, 0);
    }
    return 0;
  }

  getTotalAdditionalCost() {
    if (this.dataSource != null && this.dataSource != undefined) {
      return this.dataSource.map(t => t.AdditionalCost).reduce((acc, value) => acc + value, 0);
    }
    return 0;
  }

  getGrandTotalCost() {
    if (this.dataSource != null && this.dataSource != undefined) {
      return this.dataSource.map(t => t.TotalCost).reduce((acc, value) => acc + value, 0);
    }
    return 0;
  }

  addClick() {
    const dialogConfig = new MatDialogConfig();
    //this.emptyElement.Id = this.count + 1;

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this.emptyElement;

    dialogConfig.width = "500px";

    const dialogRef = this.dialog.open(ExpensedialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: ItemPriceData) => {
        if (data != null && data != undefined) {
          this.emptyTable = false;
          this.dashboardService.postExpensesItemDetails(this.activeTableId, data).subscribe({
            next: (result: number) => {
              //this.count = this.count + 1;
              data.Id = result;
              this.dataSource.push(data);
              this.emptyTable = false;
              this.table.renderRows();
            },
            error: (err) => {
              this.toastr.error(err.statusText, err.status, {
                timeOut: 8000,
              })
            },
            complete: () => {
              this.dataLoad = true;
            }
          })
        }
      }
    );
  }

  editClick(element: ItemPriceData) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = element;

    dialogConfig.width = "500px";

    const dialogRef = this.dialog.open(ExpensedialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data != null && data != undefined) {
          this.emptyTable = false;
          let editedElementIndex = this.dataSource.findIndex(x => x.Id == data.Id);
          this.dashboardService.postExpensesItemDetails(this.activeTableId, data).subscribe({
            next: (result: number) => {
              data.Id = result;
              this.dataSource[editedElementIndex] = data;
              this.emptyTable = false;
              this.table.renderRows();
            },
            error: (err) => {
              this.toastr.error(err.statusText, err.status, {
                timeOut: 8000,
              })
            },
            complete: () => {
              this.dataLoad = true;
            }
          })
        }
      }
    );
  }

  deleteClick(element: ItemPriceData) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {top: '25px'} ;

    dialogConfig.width = "500px";

    const dialogRef = this.dialog.open(DeletedialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: boolean) => {
        if (data) {
          this.dataLoad = false;
          this.dashboardService.deleteExpensesItemDetails(element.Id)
            .subscribe({
              next: (result: number) => {
                //this.count = this.count - 1;
                let editedElementIndex = this.dataSource.findIndex(x => x.Id == result);
                this.dataSource.splice(editedElementIndex, 1);

                if (this.dataSource.length > 0) {
                  this.emptyTable = false;
                }
                else {
                  this.emptyTable = true;
                }
                this.table.renderRows();
              },
              error: (err) => {
                this.toastr.error(err.statusText, err.status, {
                  timeOut: 8000,
                })
              },
              complete: () => {
                this.dataLoad = true;
              }
            });
        }
      }
    );
  }
}
