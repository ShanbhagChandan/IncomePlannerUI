import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-salarycalculator',
  templateUrl: './salarycalculator.component.html',
  styleUrls: ['./salarycalculator.component.css']
})
export class SalarycalculatorComponent implements OnInit {
  salaryDetails: FormGroup;
  investmentDetails: FormGroup
  salaryPanelOpenState = false;
  investmentPanelOpenState = false;
  displayDiv = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.salaryDetails = this.fb.group({

    })
    this.investmentDetails = this.fb.group({

    })
  }

  OnRigmeChange(value:string) {
    if(value=="New"){
      this.displayDiv=false;
    }
    else if(value=="Old"){
      this.displayDiv=true;
    }
  }

  OnSalarySubmit(formSalaryDirective: FormGroupDirective) {

  }

  OnInvestmentSubmit(formInvestmentDirective: FormGroupDirective) {

  }
}
