import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ItemTableData } from 'src/app/models/itemtabledata';
import { ExpensetabledialogComponent } from './expensetabledialog.component';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { CommonService } from 'src/app/services/common/common.service';
import { FinancialYears } from 'src/app/models/financialyears';
import { ToastrService } from 'ngx-toastr';
import { DeletedialogComponent } from '../common/deletedialog/deletedialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-expensetables',
  templateUrl: './expensetables.component.html',
  styleUrls: ['./expensetables.component.css']
})
export class ExpensetablesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['index', 'tablename', 'financialyear', 'actions'];
  //dataSource: ItemTableData[] = [];
  dataSource = new MatTableDataSource<ItemTableData>();
  //count: number = 0;
  emptyTable: boolean = true;
  dataLoad: boolean = false;
  emptyElement: ItemTableData = {
    Id: 0,
    TableName: "",
    FinancialYear: 0
  }
  selectedTableId: number = 0;
  selectedTableName: string = "";
  financialYears: FinancialYears[];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private dialog: MatDialog,
    private dashboardService: DashboardService,
    private commonService: CommonService,
    private toastr: ToastrService) {

  }

  ngOnInit() {
    this.dashboardService.getExpensesTableDetails().subscribe({
      next: (response: ItemTableData[]) => {
        if (response != null && response != undefined && response.length > 0) {
          this.dataSource.data = response;
          //this.count = response.length;
          this.emptyTable = false;
        }
        else {
          this.emptyTable = true;
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
    });

    this.commonService.GetFinacialYears().subscribe((response: FinancialYears[]) => {
      this.financialYears = response;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addClick() {
    const dialogConfig = new MatDialogConfig();
    //this.emptyElement.Id = this.count + 1;

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this.emptyElement;

    dialogConfig.width = "500px";

    const dialogRef = this.dialog.open(ExpensetabledialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: ItemTableData) => {
        if (data != null && data != undefined) {
          this.dataLoad = false;
          this.dashboardService.postExpensesTableDetails(data).subscribe({
            next: (result: number) => {
              //this.count = this.count + 1;
              data.Id = result;
              this.dataSource.data.push(data);
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

  editClick(element: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = element;

    dialogConfig.width = "500px";

    const dialogRef = this.dialog.open(ExpensetabledialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: ItemTableData) => {
        if (data != null && data != undefined) {
          this.dataLoad = false;
          let editedElementIndex = this.dataSource.data.findIndex(x => x.Id == data.Id);
          this.dashboardService.postExpensesTableDetails(data).subscribe({
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

  deleteClick(element: ItemTableData) {
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
          this.dashboardService.deleteExpensesTableDetails(element.Id)
            .subscribe({
              next: (result: number) => {
                //this.count = this.count - 1;
                let editedElementIndex = this.dataSource.data.findIndex(x => x.Id == result);
                this.dataSource.data.splice(editedElementIndex, 1);

                if (this.dataSource.data.length > 0) {
                  this.emptyTable = false;
                }
                else {
                  this.emptyTable = true;
                }
                this.table.renderRows();

                if (this.selectedTableId == element.Id) {
                  this.selectedTableId = 0;
                  this.selectedTableName = "";
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
            });
        }
      }
    );
  }

  getFinancialYear(yearNo: number) {
    if (this.financialYears != null && this.financialYears != undefined && this.financialYears.length > 0) {
      let financialYear = this.financialYears.find(x => x.Id == yearNo);
      return financialYear.Year;
    }
    return '';
  }

  viewExpenses(element: any) {
    this.selectedTableId = element.Id;
    this.selectedTableName = element.TableName
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
