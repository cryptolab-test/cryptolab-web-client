import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/Space.module.scss";

const ISS = "ISS";
const PEOPLE = "people";

const Space = () => {
  const [section, setSection] = useState<string | undefined>(undefined);

  const onSectionChange = (inputSection: string) => {
    if (inputSection !== section) setSection(inputSection);
  };

  return (
    <>
      <Head>
        <title>Cryptolab/space</title>
      </Head>
      <div className={styles.container}>
        <main>
          <button onClick={() => onSectionChange(ISS)}>ISS</button>
          <button onClick={() => onSectionChange(PEOPLE)}>people</button>
        </main>
        <footer>
          <Link href={"/end"}>
            <button>end</button>
          </Link>
        </footer>
      </div>
    </>
  );
};

export default Space;
