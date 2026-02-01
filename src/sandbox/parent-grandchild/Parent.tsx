import { block } from '../../shared/utils/utils';
import { styles } from './AppParentGrandChild';
import Child from './Child';

export default function Parent() {
  block(30);
  console.log('[ ]   [👩🏼‍⚕️]   [ ]   [ ] rendered');
  return (
    <div className={styles.parent}>
      <p className='m-2'>Parent Component</p>
      <Child />
      <Child />
    </div>
  );
}
