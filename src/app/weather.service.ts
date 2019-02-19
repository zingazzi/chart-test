import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class WeatherService {

  constructor(private _http: HttpClient) { }

  dailyForecast() {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?id=2172797&APPID=aa9985b871307c286d1b628e35550374')
    .map(result => result);
  }

}
