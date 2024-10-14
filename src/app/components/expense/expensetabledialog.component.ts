import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FinancialYears } from 'src/app/models/financialyears';
import { ItemTableData } from 'src/app/models/itemtabledata';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-expensetabledialog',
  templateUrl: './expensetabledialog.component.html',
  styleUrls: ['./expensetabledialog.component.css']
})
export class ExpensetabledialogComponent {
  form: FormGroup;
  itemTableData: ItemTableData;
  financialYears: FinancialYears[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExpensetabledialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private commonService: CommonService,
    private toastr: ToastrService) {
    this.itemTableData = data;
  }

  ngOnInit() {
    this.form = this.fb.group({
      Id: [{ value: this.itemTableData.Id, disabled: true }, Validators.required],
      TableName: [{ value: this.itemTableData.TableName, disabled: false }, Validators.required],
      FinancialYear: [{ value: this.itemTableData.FinancialYear, disabled: false }, Validators.min(1)],
    });
    this.commonService.GetFinacialYears().subscribe({
      next: (response: FinancialYears[])=>{
        this.financialYears = response;
      },
      error:(err)=>{
        this.toastr.error(err.statusText, err.status, {
          timeOut: 8000,
        })
      }
    })
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  close() {
    this.dialogRef.close();
  }
}
