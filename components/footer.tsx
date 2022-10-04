import Link from "next/link";
import styles from "./footer.module.css";
import packageJSON from "../package.json";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <p>Designed by Jesse Pence</p>
        </li>
        <li className={styles.navItem}>
          <p>Jovial Penguin LLC</p>
        </li>
      </ul>
    </footer>
  );
}
