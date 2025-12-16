import Parent from './Parent';
import { sleep } from '../../shared/utils/utils';
import { memo } from 'react';
import { styles } from './AppParentGrandChild';

function GrandParent({
  style,
  increment,
}: {
  style: React.CSSProperties | undefined;
  increment?: () => void;
}) {
  sleep(30);
  console.log('[👴🏼]   [ ]   [ ]   [ ] rendered');
  return (
    <div className={styles.grandparent} style={style}>
      <p className='m-2'>
        GrandParent Component.{' '}
        <button className={styles.button} onClick={increment}>
          +
        </button>
      </p>
      <Parent />
      <Parent />
    </div>
  );
}

export default memo(GrandParent);
