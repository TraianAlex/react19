import { useEffect, useState } from 'react';

export default function useEffectOnUpdate(
  effectFunction: () => void,
  deps: any[]
) {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);

    if (!firstRender) {
      effectFunction();
    }
  }, deps);
}

/*
export default function useEffectOnUpdate(effectFunction, deps) {
    const firstRender = React.useRef(true)
    
    React.useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
        } else {
            effectFunction()
        }
    }, deps)
}
*/
