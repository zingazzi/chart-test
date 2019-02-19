import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { WeatherService } from '../weather.service';
import 'chartjs-plugin-dragdata'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chart = [];

  constructor(private _weather: WeatherService) {}
  ngOnInit() {
    this._weather.dailyForecast()
      .subscribe(res => {

        const temp_max = [180, 200, 170]
        const temp_min = [155, 190, 160]
        const weatherDates = ["2018-10-10",  "2018-10-11", "2018-10-12"]

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: '#3cba9f',
                fill: false
              },
              {
                data: temp_min,
                borderColor: '#ffcc00',
                fill: false
              },
            ]
          },
          options: {
            dragData: true,
            dragX: false,
            dragDataRound: 0,
            onDragStart: function (event, element) {
              console.log("drag start")
            },
            onDragEnd: function (event, datasetIndex, index, value) {
              console.log("drag end")
            },
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true,
              }]
            }
          }
        })

      })
  }
}
