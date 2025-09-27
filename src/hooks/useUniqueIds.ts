import { useRef } from 'react';

import uniqid from 'uniqid';

const useUniqueIds = (count: number) => {
  const ids = useRef([...new Array(count)].map(() => uniqid()));
  return ids.current;
};

export default useUniqueIds;

/* 1 -
const ids = useUniqueIds(10);
console.log(ids);
2 -
const [descriptionId, stockId, quantityId, priceId] = useUniqueIds(4);
*/
