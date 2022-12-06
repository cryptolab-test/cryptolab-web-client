import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ISSResponse, PeopleResponse, Person } from "../interface";
import styles from "../styles/Space.module.scss";
import axios from "axios";

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
          {section === ISS && <ISSView />}
          {section === PEOPLE && <PeopleView />}
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

const ISSView = () => {
  const [iss, setIss] = useState<ISSResponse>();
  const [click, setClick] = useState(0);

  useEffect(() => {
    const getISS = async () => {
      try {
        const { data } = await axios.get(
          "http://api.open-notify.org/iss-now.json",
        );
        if (data.message === "success") setIss(data);
        await axios.post(
          "https://cff00ebb-62b0-4961-88fb-d68e1995dfd5.mock.pstmn.io",
          {
            data: {
              latitude: data.iss_position?.latitude,
              longitude: data.iss_position?.longitude,
            },
          },
        );
      } catch (e) {
        console.log(e);
      }
    };
    getISS();
  }, [click]);

  return (
    <div>
      <button onClick={() => setClick((click) => click + 1)}>새로고침</button>
      위도: {iss?.iss_position.latitude}, 경도: {iss?.iss_position.longitude}
    </div>
  );
};

const PeopleView = () => {
  const [people, setPeople] = useState<PeopleResponse>();

  const sendPerson = async (person: Person) => {
    try {
      await axios.post(
        "https://cff00ebb-62b0-4961-88fb-d68e1995dfd5.mock.pstmn.io",
        {
          data: person,
        },
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getPeople = async () => {
      try {
        const { data } = await axios.get(
          "http://api.open-notify.org/astros.json",
        );
        if (data) setPeople(data);
      } catch (e) {
        console.log(e);
      }
    };
    getPeople();
  }, []);

  return (
    <ul className={styles.peopleList}>
      {people?.people.map((person) => {
        return (
          <li key={person.name + "/" + person.craft}>
            <button onClick={() => sendPerson(person)}>{person.name}</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Space;
