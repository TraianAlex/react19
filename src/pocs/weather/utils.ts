import { mockDelay } from '../../shared/utils/utils';

export async function getWeather() {
  await mockDelay(3000);
  const res = await fetch(
    'https://apis.scrimba.com/openweathermap/data/2.5/weather?q=Salt+Lake+City&units=imperial'
  );
  if (!res.ok) {
    throw {
      error: 'Problem getting weather info',
    };
  }
  const data = await res.json();
  return data;
}
