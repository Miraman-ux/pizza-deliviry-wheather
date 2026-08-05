import { WeatherStatusPipe } from './weather-status.pipe';

describe('WeatherStatusPipePipe', () => {
  it('create an instance', () => {
    const pipe = new WeatherStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
