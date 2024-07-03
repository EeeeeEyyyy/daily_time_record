

import Link from 'next/link';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/">About</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
