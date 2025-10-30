import styles from './foo.module.css';
import { util } from '@nx-rollup-legacy/util';
import { util3 } from '@nx-rollup-legacy/util3';
import { Bar } from '@nx-rollup-legacy/bar';
import { Bar2 }   from '@nx-rollup-legacy/bar2'

export function Foo() {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Foo!</h1>
      {util()}
      {util3()}
      <Bar />
      <Bar2 />
    </div>
  );
}

export default Foo;
