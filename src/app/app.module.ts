import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WeatherService } from './weather.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartistModule } from 'ng-chartist';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { Routes, RouterModule } from '@angular/router';
import { D3Component } from './d3/d3.component';
import { ChartlistComponent } from './chartlist/chartlist.component';

const appRoutes: Routes = [
  { path: '', component: D3Component },
  { path: 'chart', component: ChartComponent },
  { path: 'chartlist', component: ChartlistComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    D3Component,
    ChartlistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ChartistModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
