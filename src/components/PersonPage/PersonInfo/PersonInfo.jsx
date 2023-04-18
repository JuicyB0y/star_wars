import React, { useEffect, useState } from 'react';
import { makeConcurrentRequest } from '../../../utils/network';
import styles from './PersonInfo.module.css';

const PersonInfo = ({ personInfo, personFilms }) => {
  const [filmNames, setFilmNames] = useState([]);
  // console.log(personFilms);

  const getFilmNames = async (personFilms) => {
    const result = await makeConcurrentRequest(personFilms);
    setFilmNames(result);
    // console.log(result);
  };

  useEffect(() => {
    getFilmNames(personFilms);
  }, [personFilms]);

  return (
    <>
      <div className={styles.wrapper}>
        <ul className={styles.list__container}>
          {personInfo &&
            personInfo.map((item) => (
              <li className={styles.list__item} key={item.title}>
                <span className={styles.item__title}>{item.title}</span>: {item.data}
              </li>
            ))}
        </ul>
      </div>
      <ul className={styles.films}>
        {personFilms &&
          filmNames
            .sort((a, b) => a.episode_id - b.episode_id)
            .map((item) => (
              <li key={item.title} className={styles.item__films}>
                <span className={styles.film__episode}>Episode {item.episode_id}</span>
                <span className={styles.film__colon}>:</span>
                <span className={styles.film__title}>{item.title}</span>
              </li>
            ))}
        {/* {personFilms &&
          personFilms.map((item) => (
            <li key={item} className={styles.item__films}>
              <span className={styles.film__episode}>Episode {item}</span>
            </li>
          ))} */}
      </ul>
    </>
  );
};

export default PersonInfo;
