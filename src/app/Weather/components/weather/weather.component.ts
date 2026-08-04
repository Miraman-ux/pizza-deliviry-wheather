import {Component, inject, signal, OnInit, DestroyRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WheatherService} from '../../services/wheather.service';
import {WeatherResponse} from '../../models/weather.interface';
import {DayOfWeekPipe} from '../../pipes/day-of-week-pipe';
import {CITIES, City} from '../../constants/cities.const';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {WeatherStatusPipe} from '../../pipes/weather-status.pipe';
import {Observable, switchMap, of} from 'rxjs';

@Component({
  selector: 'app-weather',
  imports: [CommonModule, DayOfWeekPipe, WeatherStatusPipe],
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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.listenQueryParamsChanges();
  }

  public async selectCity(city: City): Promise<void> {
    const success = await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {city: city.slug},
      queryParamsHandling: 'merge',
    });

    if (!success) {
      console.warn('Навигация не состоялась');
    }
  }

  private listenQueryParamsChanges(): void {
    this.route.queryParams.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((params) => this.fetchWeatherByParams(params))
    ).subscribe({
      next: (data) => {
        this.isLoading.set(false);
        if (data) {
          this.weather.set(data);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set('Не удалось загрузить данные о погоде.');
        console.error('Ошибка при запросе погоды:', err);
      }
    });
  }

  private fetchWeatherByParams(params: Params): Observable<WeatherResponse | null> {
    const citySlug = params['city'];
    if (!citySlug) return of(null);

    const foundCity = this.cities.find((c) => c.slug === citySlug);
    if (!foundCity) return of(null);

    this.isLoading.set(true);
    this.weather.set(null);
    this.errorMessage.set(null);
    this.selectedCity.set(foundCity.name);

    return this.weatherService.getWeather(foundCity.lat, foundCity.lon);
  }
}
