import { HttpInterceptorFn } from '@angular/common/http';


export const weatherInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('open-meteo.com')) {
    const modifiedReq = req.clone({
      setParams: {
        current: 'temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code',
        temperature_unit: 'celsius',
        wind_speed_unit: 'ms',
        timezone: 'auto'
      },
    });
    return next(modifiedReq);
  }
  return next(req);
}
