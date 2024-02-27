import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemPriceData } from 'src/app/models/itempricedata';

@Component({
  selector: 'app-expensedialog',
  templateUrl: './expensedialog.component.html',
  styleUrls: ['./expensedialog.component.css']
})
export class ExpensedialogComponent {
  form: FormGroup;
  itemPriceData: ItemPriceData;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExpensedialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.itemPriceData = data;
  }

  ngOnInit() {
    this.form = this.fb.group({
      Id: [{ value: this.itemPriceData.Id, disabled: true }, Validators.required],
      ItemName: [{ value: this.itemPriceData.ItemName, disabled: false }, Validators.required],
      BaseCost: [{ value: this.itemPriceData.BaseCost, disabled: false }, Validators.required],
      AdditionalCost: [{ value: this.itemPriceData.AdditionalCost, disabled: false }, Validators.required],
      TotalCost: [{ value: this.itemPriceData.TotalCost, disabled: true }, Validators.required]
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

  sum() {
    if (this.form.value != null && String(this.form.value.BaseCost) != "" && String(this.form.value.AdditionalCost) != "") {
      this.form.patchValue({
        TotalCost: parseInt(this.form.value.BaseCost) + parseInt(this.form.value.AdditionalCost)
      })
    }
  }
}
