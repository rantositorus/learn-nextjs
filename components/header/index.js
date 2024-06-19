import { withAuth } from "../with-auth";
import Menu from "../menu";
import Link from "next/link";
import styles from "./styles.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <Menu />
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/users">Users</Link>
        </li>
      </ul>
    </div>
  );
}

export default withAuth(Header);
