import { sleep } from '../../shared/utils/utils';
import { styles } from './AppParentGrandChild';
import Child from './Child';

export default function Parent() {
  sleep(30);
  console.log('[ ]   [👩🏼‍⚕️]   [ ]   [ ] rendered');
  return (
    <div className={styles.parent}>
      <p className='m-2'>Parent Component</p>
      <Child />
      <Child />
    </div>
  );
}
