import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthguardGuard } from './guard/authguard.guard';
import { TokeninterceptorService } from './services/authenticate/tokeninterceptor.service';
import { HomeComponent } from './components/home/home.component';
import { SalarycalculatorComponent } from './components/salarycalculator/salarycalculator.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { ExpensedialogComponent } from './components/expense/expensedialog.component';
import { ExpensetablesComponent } from './components/expense/expensetables.component';
import { ExpensetabledialogComponent } from './components/expense/expensetabledialog.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ToastrModule } from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DeletedialogComponent } from './components/common/deletedialog/deletedialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ExpenseChartsComponent } from './components/home/expense-charts/expense-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    SalarycalculatorComponent,
    ExpenseComponent,
    ExpensedialogComponent,
    ExpensetablesComponent,
    ExpensetabledialogComponent,
    DeletedialogComponent,
    ExpenseChartsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'Login', component: LoginComponent },
      { path: 'Register', component: RegisterComponent },
      {
        path: 'Dashboard', 
        component: DashboardComponent,
        children: [
          {path:'Home',component:HomeComponent},
          {path:'SalaryCalculator',component:SalarycalculatorComponent},
          {path:'Expenses',component:ExpensetablesComponent},
          { path: '', redirectTo: 'Home', pathMatch: 'full' },
          { path: '**', redirectTo: 'Home', pathMatch: 'full' }
        ],
        // canActivate:[AuthguardGuard]
      },
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'Dashboard', pathMatch: 'full' }
    ]),
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatRippleModule,
    MatListModule,
    MatMenuModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    HighchartsChartModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ToastrModule.forRoot(), 
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokeninterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  // entryComponents: [ExpensedialogComponent]
})
export class AppModule { }
