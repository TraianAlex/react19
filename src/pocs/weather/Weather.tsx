import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { getWeather } from './utils';
import styles from './Weather.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export function loader() {
  return { weather: getWeather() };
}

export default function Weather() {
  const { weather } = useLoaderData();

  return (
    <section className={cx('weather-container')}>
      <h1>Weather in Salt Lake City</h1>
      <Suspense fallback={<h3>Loading weather...</h3>}>
        <Await resolve={weather}>
          {(weather) => {
            const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
            return (
              <>
                <h3>{weather.main.temp}ºF</h3>
                <img src={iconUrl} alt='weather icon' />
              </>
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
}
// http://openweathermap.org/img/wn/04d@2x.png
