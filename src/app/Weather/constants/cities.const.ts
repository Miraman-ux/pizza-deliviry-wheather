export interface City {
  slug: string;
  name: string;
  lat: number;
  lon: number;
}

export const CITIES: City[] = [
  {slug: 'homel', name: 'Гомель', lat: 52.4345, lon: 30.9754},
  {slug: 'minsk', name: 'Минск', lat: 53.9002, lon: 27.5665},
  {slug: 'grodno', name: 'Гродно', lat: 53.6287, lon: 23.8942},
  {slug: 'mogilev', name: 'Могилев', lat: 53.9088, lon: 30.3404},
]
