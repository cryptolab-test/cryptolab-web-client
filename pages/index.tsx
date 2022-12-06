import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cryptolab/main</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.message}>Hello world!</h1>
        <Link href={"/space"}>
          <button>space로 이동하기</button>
        </Link>
      </div>
    </>
  );
}
