import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfWeek',
})
export class DayOfWeekPipe implements PipeTransform {
  transform(value: string | Date | undefined | null): string {
    if (!value) return '';

    const date = new Date(value);

    if (isNaN(date.getTime())) return '';

    const dayName = date.toLocaleDateString('ru-RU', { weekday: 'long'});

    return dayName.charAt(0).toUpperCase() + dayName.slice(1);
  }
}
