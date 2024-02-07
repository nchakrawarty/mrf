import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { SaleComponent } from './sale/sale.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { DailyProductionComponent } from './daily-production/daily-production.component';
import { ExpenseComponent } from './expense/expense.component';
import { PanchayatComponent } from './panchayat/panchayat.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { WasteComponent } from './waste/waste.component';
import { EwayBillComponent } from './eway-bill/eway-bill.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { NoauthGuard } from './guard/noauth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate:[NoauthGuard] },
  // { path: '', redirectTo: '/home', pathMatch: 'full',canActivate: [AuthGuard] }, // Redirect to the home page
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'sale', component: SaleComponent,canActivate: [AuthGuard] },
  { path: 'vehicle', component: VehicleComponent,canActivate: [AuthGuard] },
  { path: 'daily-production', component: DailyProductionComponent,canActivate: [AuthGuard] },
  { path: 'expense', component: ExpenseComponent,canActivate: [AuthGuard] },
  { path: 'panchayat', component: PanchayatComponent,canActivate: [AuthGuard] },
  { path: 'purchase', component: PurchaseComponent,canActivate: [AuthGuard] },
  { path: 'waste', component: WasteComponent,canActivate: [AuthGuard] },
  { path: 'eway-bill', component: EwayBillComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
