import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import { WheatherService } from '../../services/wheather';
import {WeatherResponse} from '../../models/weather.interface';

export interface City {
  name: string;
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-weather',
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather {
  private readonly weatherService = inject(WheatherService);

  cities: City[] = [
    {name: 'Гомель', lat: 52.4345, lon: 30.9754},
    {name: 'Минск', lat: 53.9002, lon: 27.5665},
    {name: 'Гродно', lat: 53.6287, lon: 23.8942},
    {name: 'Могилев', lat: 53.9088, lon: 30.3404},
  ];

  public weather = signal<WeatherResponse | null>(null);
  public isLoading = signal<boolean>(false);
  public errorMessage = signal<string | null>(null);
  public selectedCity = signal<string | null>(null);

  public selectCity (city: City) {
    this.isLoading.set(true);
    this.weather.set(null);
    this.errorMessage.set(null);
    this.selectedCity.set(city.name);

    this.weatherService.getWeather(city.lat, city.lon).subscribe({
      next: (data: WeatherResponse)=> {
        this.isLoading.set(false);
        this.weather.set(data);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set('Не удалось загрузить данные о погоде.');
        console.error('Ошибка при запросе погоды:', err);
      }
    });
  }
}
