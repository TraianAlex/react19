import { use } from 'react';
import { slowComponentCache } from './SuspenseDemo';

// Component that simulates slow loading with error possibility
export function SlowComponent({ shouldError }: { shouldError: boolean }) {
  const cacheKey = `slow-component-${shouldError}`;

  console.log(
    'SlowComponent render with shouldError:',
    shouldError,
    'cacheKey:',
    cacheKey
  );

  // Create promise only if not in cache
  if (!slowComponentCache.has(cacheKey)) {
    console.log('Creating new promise for cacheKey:', cacheKey);
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => {
        console.log(
          'Promise resolving for cacheKey:',
          cacheKey,
          'shouldError:',
          shouldError
        );
        if (shouldError) {
          resolve('ERROR_STATE'); // Special marker for error
        } else {
          resolve('Slow component loaded successfully!');
        }
      }, 3000);
    });

    slowComponentCache.set(cacheKey, promise);
  }

  const result = use(slowComponentCache.get(cacheKey)!);

  console.log('Component got result:', result);

  // Handle the error case by throwing an error that Error Boundary can catch
  if (result === 'ERROR_STATE') {
    console.log('Throwing error for Error Boundary to catch');
    throw new Error('Simulated error in slow component');
  }

  return (
    <div className='alert alert-success'>
      <h6 className='alert-heading'>Slow Component Result:</h6>
      <p className='mb-0'>{result}</p>
    </div>
  );
}
