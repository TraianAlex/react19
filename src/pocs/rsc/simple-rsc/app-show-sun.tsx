'use client';

export default function AppShowSun({
  isoDateString,
}: {
  isoDateString: string;
}) {
  function getSunBrightness(isoDateString: string) {
    const date = new Date(isoDateString);
    const totalMinutes = date.getHours() * 60 + date.getMinutes();
    const noonInMinutes = 12 * 60;
    if (totalMinutes >= 7 * 60 && totalMinutes < 18 * 60) {
      const minutesFromNoon = Math.abs(totalMinutes - noonInMinutes);
      const brightnessRatio = 1 - minutesFromNoon / noonInMinutes;
      return 100.0 - brightnessRatio * 100.0;
    }
    return 100.0;
  }

  const sunBrightnessGrayScale = getSunBrightness(isoDateString);

  const visibility: 'hidden' | 'visible' =
    sunBrightnessGrayScale === 100.0 ? 'hidden' : 'visible';

  const style: React.CSSProperties = {
    filter: `grayscale(${sunBrightnessGrayScale}%)`,
    visibility,
  };

  return (
    <div>
      <img src='/images/sun.png' style={style} />
    </div>
  );
}
