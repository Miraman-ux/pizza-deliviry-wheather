import {Injectable, inject} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import { WeatherResponse } from '../models/weather.interface';


@Injectable({
  providedIn: 'root'
})
export class WheatherService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.open-meteo.com/v1/forecast';

  public getWeather(latitude: number, longitude: number): Observable<WeatherResponse> {
    const myParams = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude)
    return this.http.get<WeatherResponse>(this.apiUrl, {params: myParams});
  }
}
