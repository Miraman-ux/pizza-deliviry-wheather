import {Component, inject, signal, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {WheatherService} from '../../services/wheather.service';
import {WeatherResponse} from '../../models/weather.interface';
import {DayOfWeekPipe} from '../../pipes/day-of-week-pipe';
import {CITIES, City} from '../../constants/cities.const';

@Component({
  selector: 'app-weather',
  imports: [CommonModule, DayOfWeekPipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {

  public readonly cities: City[] = CITIES;

  public weather = signal<WeatherResponse | null>(null);
  public isLoading = signal<boolean>(false);
  public errorMessage = signal<string | null>(null);
  public selectedCity = signal<string | null>(null);
  private readonly weatherService = inject(WheatherService);
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const citySlug = params['city'];

      if (citySlug) {
        const foundCity = this.cities.find((c) => c.slug === citySlug);
        if (foundCity) {
          this.loadWeatherData(foundCity);
        }
      }
    })
  }

  public selectCity(city: City) {

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {city: city.slug},
      queryParamsHandling: 'merge',
    });
  }

  public getWeatherStatus(code: number | undefined): { text: string; icon: string } {
    if (code === undefined) return {text: 'Нет данных', icon: '❓'};

    switch (code) {
      case 0:
        return {text: 'Ясно', icon: '☀️'};
      case 1:
      case 2:
        return {text: 'Малооблачно', icon: '🌤️'};
      case 3:
        return {text: 'Пасмурно', icon: '☁️'};
      case 45:
      case 48:
        return {text: 'Туман', icon: '🌫️'};
      case 51:
      case 53:
      case 55:
        return {text: 'Морось', icon: '🌧️'};
      case 61:
      case 63:
      case 65:
        return {text: 'Дождь', icon: '🌧️'};
      case 71:
      case 73:
      case 75:
        return {text: 'Снегопад', icon: '❄️'};
      case 80:
      case 81:
      case 82:
        return {text: 'Ливень', icon: '🌩️'};
      case 95:
      case 96:
      case 99:
        return {text: 'Гроза', icon: '⚡'};
      default:
        return {text: 'Облачно', icon: '☁️'};
    }
  }

  private loadWeatherData(city: City): void {
    this.isLoading.set(true);
    this.weather.set(null);
    this.errorMessage.set(null);
    this.selectedCity.set(city.name);

    this.weatherService.getWeather(city.lat, city.lon).subscribe({
      next: (data: WeatherResponse) => {
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
