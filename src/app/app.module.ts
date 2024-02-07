import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WasteComponent } from './waste/waste.component';
import { PanchayatComponent } from './panchayat/panchayat.component';
import { SaleComponent } from './sale/sale.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { DailyProductionComponent } from './daily-production/daily-production.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ExpenseComponent } from './expense/expense.component';
import { EwayBillComponent } from './eway-bill/eway-bill.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AddweightComponent } from './addweight/addweight.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AddwasteComponent } from './addwaste/addwaste.component';
import { NoauthGuard } from './guard/noauth.guard';
import { AuthGuard } from './guard/auth.guard';
import { AddBagComponent } from './add-bag/add-bag.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WasteComponent,
    PanchayatComponent,
    SaleComponent,
    PurchaseComponent,
    DailyProductionComponent,
    VehicleComponent,
    ExpenseComponent,
    EwayBillComponent,
    MenuComponent,
    HomeComponent,
    AddweightComponent,
    AddwasteComponent,
    AddBagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, MatDialogModule, MatFormFieldModule,
    FormsModule, MatSelectModule, MatInputModule, MatButtonModule,MatDatepickerModule,MatNativeDateModule,MatExpansionModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },NoauthGuard,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
