import {Pipe, PipeTransform} from '@angular/core';

export interface WeatherStatus {
  text: string;
  icon: string;
}

@Pipe({
  name: 'weatherStatusPipe',
  standalone: true
})
export class WeatherStatusPipe implements PipeTransform {
  transform(code: number | undefined): WeatherStatus {
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
}
