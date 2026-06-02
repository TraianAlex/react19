import { useEffect } from 'react';

export const useComplete = (completeRequest: (data: any) => void) => {
  useEffect(() => {
    // network request
    completeRequest('test');
  }, [completeRequest]);
};
