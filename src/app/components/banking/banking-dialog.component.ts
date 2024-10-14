import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountTypes } from 'src/app/models/accounttypes';
import { BankAccountDetails } from 'src/app/models/bankaccountdetails';
import { Banks } from 'src/app/models/banks';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-banking-dialog',
  templateUrl: './banking-dialog.component.html',
  styleUrls: ['./banking-dialog.component.css']
})
export class BankingDialogComponent {
  form: FormGroup;
  banks:Banks[];
  accountTypes: AccountTypes[];
  emptyAccount: BankAccountDetails;
  selectedTypeId: number;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<BankingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private commonService: CommonService,
    private toastr: ToastrService){
      this.emptyAccount = data;
  }

  ngOnInit() {
    this.form = this.fb.group({
      AccountId: [{ value: this.emptyAccount.AccountId, disabled: true }, Validators.required],
      AccountName: [{ value: this.emptyAccount.AccountName, disabled: false }, Validators.required],
      BankId: [{ value: this.emptyAccount.BankId, disabled: false }, Validators.min(1)],
      AccountTypeId: [{ value: this.emptyAccount.AccountTypeId, disabled: false }, Validators.min(1)],
      BankSavingDetails: this.fb.group({
        SavingsId: [{ value: this.emptyAccount.BankSavingDetails.SavingsId, disabled: true }, Validators.required],
        SavingsAmount: [{ value: this.emptyAccount.BankSavingDetails.SavingsAmount, disabled: false }, Validators.required],
        SavingsInterestRate: [{ value: this.emptyAccount.BankSavingDetails.SavingsInterestRate, disabled: false }, Validators.required]
      }),
      BankFixedDepositDetails: this.fb.group({
        FixedDepositId: [{ value: this.emptyAccount.BankFixedDepositDetails.FixedDepositId, disabled: true }, Validators.required],
        FixedDepositAmount: [{ value: this.emptyAccount.BankFixedDepositDetails.FixedDepositAmount, disabled: false }, Validators.required],
        FixedDepositInterestRate: [{ value: this.emptyAccount.BankFixedDepositDetails.FixedDepositInterestRate, disabled: false }, Validators.required],
        FixedDepositStartingDate: [{ value: this.emptyAccount.BankFixedDepositDetails.FixedDepositStartingDate, disabled: false }, Validators.required],
        FixedDepositDurationInMonths: [{ value: this.emptyAccount.BankFixedDepositDetails.FixedDepositDurationInMonths, disabled: false }, Validators.required]
      }),
      BankRecurringDepositDetails: this.fb.group({
        RecurringDepositId: [{ value: this.emptyAccount.BankRecurringDepositDetails.RecurringDepositId, disabled: true }, Validators.required],
        RecurringDepositAmount: [{ value: this.emptyAccount.BankRecurringDepositDetails.RecurringDepositAmount, disabled: false }, Validators.required],
        RecurringDepositInterestRate: [{ value: this.emptyAccount.BankRecurringDepositDetails.RecurringDepositInterestRate, disabled: false }, Validators.required],
        RecurringDepositStartingDate: [{ value: this.emptyAccount.BankRecurringDepositDetails.RecurringDepositStartingDate, disabled: false }, Validators.required],
        RecurringDepositDurationInMonths: [{ value: this.emptyAccount.BankRecurringDepositDetails.RecurringDepositDurationInMonths, disabled: false }, Validators.required]
      }),
      // BankMutualFundsDetails: this.fb.group({
      //   MutualFundsId: [{ value: this.emptyAccount.BankMutualFundsDetails.MutualFundsId, disabled: true }, Validators.required],
      //   MutualFundsAmount: [{ value: this.emptyAccount.BankMutualFundsDetails.RecurringDepositAmount, disabled: false }, Validators.required],
      //   MutualFundsInterestRate: [{ value: this.emptyAccount.BankMutualFundsDetails.RecurringDepositAmount, disabled: false }, Validators.required],
      //   MutualFundsStartingDate: [{ value: this.emptyAccount.BankMutualFundsDetails.RecurringDepositInterestRate, disabled: false }, Validators.required],
      //   MutualFundsDurationInMonths: [{ value: this.emptyAccount.BankMutualFundsDetails.RecurringDepositDurationInMonths, disabled: false }, Validators.required],
      //   MutualFundName: [{ value: this.emptyAccount.BankMutualFundsDetails.RecurringDepositDurationInMonths, disabled: false }, Validators.required]
      // }),
    });
    this.commonService.GetBanks().subscribe({
      next:(result:Banks[])=>{
        this.banks = result;
      },
      error:(err)=>{
        this.toastr.error(err.statusText, err.status, {
          timeOut: 8000,
        })
      }
    });

    this.commonService.GetAccountTypes().subscribe({
      next:(result:AccountTypes[])=>{
        this.accountTypes = result;
      },
      error:(err)=>{
        this.toastr.error(err.statusText, err.status, {
          timeOut: 8000,
        })
      }
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  close() {
    this.dialogRef.close();
  }

  onAccountTypeChange(typeId:number){
    this.selectedTypeId = typeId;
  }
}
