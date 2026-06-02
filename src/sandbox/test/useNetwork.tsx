import { useEffect, useState } from 'react';

export const useNetwork = ({ url }: { url: string }) => {
  const [state, setState] = useState<{ data: any; error: any; loading: boolean }>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    setState({ ...state, loading: true });

    const makeRequest = async () => {
      try {
        const response = await fetch(url);
        // const data = await response.json();
        const data = {
          url: response.url,
          title: `Photo for ${url}`,
          explanation: 'Random photo from Picsum (seeded by date).',
        };
        setState({ ...state, data, loading: false });
      } catch (error) {
        setState({ ...state, data: null, error, loading: false });
      }
    };
    makeRequest();
  }, [url]);

  return state;
};
