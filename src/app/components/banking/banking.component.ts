import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BankingDialogComponent } from './banking-dialog.component';
import { BankAccountDetails } from 'src/app/models/bankaccountdetails';
import { BankSavingDetails } from 'src/app/models/banksavingdetails';
import { BankFixedDepositDetails } from 'src/app/models/bankfixeddepositdetails';
import { BankRecurringDepositDetails } from 'src/app/models/bankrecurringdepositdetails';
import { BankMutualFundsDetails } from 'src/app/models/bankmutualfundsdetails';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.css']
})
export class BankingComponent {
  displayedSavingsColumns: string[] = ['Index', 'BankName', 'AccountName', 'SavingsAmount', 'SavingsInterestRate', 'Actions'];
  displayedFixedDepositColumns: string[] = ['Index', 'BankName', 'AccountName', 'FixedDepositAmount', 'FixedDepositInterestRate', 'FixedDepositStartingDate', 'FixedDepositDurationInMonths', 'Actions'];
  displayedRecurringDepositColumns: string[] = ['Index', 'BankName', 'AccountName', 'RecurringDepositAmount', 'RecurringDepositInterestRate', 'RecurringDepositStartingDate', 'RecurringDepositDurationInMonths', 'Actions'];
  // displayedMutualFundsColumns: string[] = ['Index', 'BankName', 'AccountName',  'Recurring Deposit Amount', 'Recurring Deposit Interest Rate', 'Recurring Deposit Starting Date', 'Recurring Deposit Duration In Months', 'Actions'];
  emptySavingsTable: boolean = true;
  emptyFixedDepositTable: boolean = true;
  emptyRecurringDepositTable: boolean = true;
  dataLoad: boolean = false;
  dataSourceSavings: BankAccountDetails[] = [];
  dataSourceFixedDeposit: BankAccountDetails[] = [];
  dataSourceRecurringDeposit: BankAccountDetails[] = [];
  emptySavingsAccount: BankSavingDetails = {
    SavingsId: 0,
    SavingsAmount: 0,
    SavingsInterestRate: 0
  }
  emptyFixedDepositAccount: BankFixedDepositDetails = {
    FixedDepositId: 0,
    FixedDepositAmount: 0,
    FixedDepositInterestRate: 0,
    FixedDepositStartingDate: new Date(),
    FixedDepositDurationInMonths:0
  }
  emptyRecurringDepositAccount: BankRecurringDepositDetails = {
    RecurringDepositId: 0,
    RecurringDepositAmount: 0,
    RecurringDepositInterestRate: 0,
    RecurringDepositStartingDate: new Date(),
    RecurringDepositDurationInMonths:0
  }
  emptyMutualFundAccount: BankMutualFundsDetails[] = [{
    MutualFundsId: 0,
    MutualFundsAmount: 0,
    MutualFundsInterestRate: 0,
    MutualFundsStartingDate: new Date(),
    MutualFundsDurationInMonths:0,
    MutualFundName:''
  }]
  emptyAccount: BankAccountDetails = {
    AccountId: 0,
    BankId: 0,
    BankName: '',
    IsNationalisedBank: false,
    AccountTypeId: 0,
    AccountType: '',
    AccountName: '',
    BankSavingDetails: this.emptySavingsAccount,
    BankFixedDepositDetails: this.emptyFixedDepositAccount,
    BankRecurringDepositDetails: this.emptyRecurringDepositAccount,
    BankMutualFundsDetails: this.emptyMutualFundAccount
  }
  @ViewChild(MatTable, { static: true }) savingsTable: MatTable<any>;
  @ViewChild(MatTable, { static: true }) fixedDepositTable: MatTable<any>;
  @ViewChild(MatTable, { static: true }) recurringDepositTable: MatTable<any>;

  constructor(private dialog: MatDialog,
    private dashboardService: DashboardService, 
    private toastr: ToastrService){

  }

  ngOnInit() {
    this.dashboardService.getBankAccounts().subscribe({
        next:(result:BankAccountDetails[])=>{
          if(result!=null && result!=undefined && result.length>0){
            result.forEach((bankAccountDetails:BankAccountDetails)=>{
              if(bankAccountDetails.AccountTypeId == 1){
                this.dataSourceSavings.push(bankAccountDetails);
                this.emptySavingsTable = false;
                this.savingsTable.renderRows();
              }
              if(bankAccountDetails.AccountTypeId == 2){
                this.dataSourceFixedDeposit.push(bankAccountDetails);
                this.emptyFixedDepositTable = false;
              }
              if(bankAccountDetails.AccountTypeId == 3){
                this.dataSourceRecurringDeposit.push(bankAccountDetails);
                this.emptyRecurringDepositTable = false;
              }
              if(bankAccountDetails.AccountTypeId == 4){
              }
            })
          }
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

  addClick() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this.emptyAccount;

    dialogConfig.width = "500px";

    const dialogRef = this.dialog.open(BankingDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: (data: BankAccountDetails) => {
        if (data != null && data != undefined) {
          this.dashboardService.postBankAccounts(data).subscribe({
            next: (result: number) => {
              data.AccountId = result;
            },
            error: (err) => {
              this.toastr.error(err.statusText, err.status, {
                timeOut: 8000,
              })
            }
          })
        }
      },
      error:(err)=>{
        this.toastr.error(err.statusText, err.status, {
          timeOut: 8000,
        })
      }
    });
  }

  editClick(element:any){

  }

  deleteClick(element:any){

  }
}
