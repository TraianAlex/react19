import Parent from './Parent';
import { sleep } from '../../shared/utils/utils';
import { memo } from 'react';
import { styles } from './AppParentGrandChild';

function GrandParent({ style }: { style: React.CSSProperties | undefined }) {
  sleep(30);
  console.log('[👴🏼]   [ ]   [ ]   [ ] rendered');
  return (
    <div className={styles.grandparent} style={style}>
      <p className='m-2'>GrandParent Component.</p>
      <Parent />
      <Parent />
    </div>
  );
}

export default memo(GrandParent);
