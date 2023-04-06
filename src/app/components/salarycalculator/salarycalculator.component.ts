import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-salarycalculator',
  templateUrl: './salarycalculator.component.html',
  styleUrls: ['./salarycalculator.component.css']
})
export class SalarycalculatorComponent implements OnInit {
  salaryDetails: FormGroup;
  investmentDetails:FormGroup
  salaryPanelOpenState = false;
  investmentPanelOpenState = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.salaryDetails = this.fb.group({

    })
    this.investmentDetails = this.fb.group({

    })
  }

  OnSalarySubmit(formSalaryDirective: FormGroupDirective){

  }

  OnInvestmentSubmit(formInvestmentDirective: FormGroupDirective){
    
  }
}
