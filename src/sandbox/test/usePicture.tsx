import { useEffect, useState } from 'react';

type Picture = {
  url: string;
  title: string;
  explanation: string;
};

export const fetchPicture = async (date: string, setPicture: (picture: Picture) => void) => {
  // try {
  //   const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=painting&limit=1&page=${date}`);
  //   const data = await response.json();
  //   setPicture(data);
  // } catch (error) {
  //   console.error(error);
  // }
  const url = `https://picsum.photos/seed/${encodeURIComponent(date)}/300/200`;
  setPicture({
    url,
    title: `Photo for ${date}`,
    explanation: 'Random photo from Picsum (seeded by date).',
  });
};

export const usePicture = (date: string) => {
  const [picture, setPicture] = useState<Picture | null>(null);

  useEffect(() => {
    fetchPicture(date, setPicture);
  }, [date]);

  return picture;
};
