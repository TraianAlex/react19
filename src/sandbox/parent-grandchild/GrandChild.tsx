import { sleep } from '../../shared/utils/utils';
import { styles } from './AppParentGrandChild';

export default function GrandChild() {
  sleep(30);
  console.log('[ ]   [ ]   [ ]   [👶🏻] rendered');
  return (
    <div className={styles.grandchild}>
      <p className='m-2'>GrandChild Component</p>
    </div>
  );
}
