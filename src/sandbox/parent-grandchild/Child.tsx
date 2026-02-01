import { block } from '../../shared/utils/utils';
import GrandChild from './GrandChild';
import { styles } from './AppParentGrandChild';

export default function Child() {
  block(30);
  console.log('[ ]   [ ]   [🧒🏻]   [ ] rendered');
  return (
    <div className={styles.child}>
      <p className='m-2'>Child Component</p>
      <GrandChild />
      <GrandChild />
    </div>
  );
}
