import React, { useContext } from 'react';
import { ThemeContext } from '../App/App';

import { THEME_LIGHT, THEME_DARK, THEME_NEITRAL } from '../App/App';
import imgLight from '../../assets/light-side.jpg';
import imgDark from '../../assets/dark-side.jpg';
import falcon from '../../assets/falcon.jpg';

import styles from './HomePage.module.css';
const HomePage = () => {
  const { change } = useContext(ThemeContext);

  return (
    <>
      <h1 className="header__text">HomePage</h1>

      <div className={styles.wrapper}>
        <div onClick={() => change(THEME_LIGHT)} className={styles.item}>
          <div className={styles.item__header}>Light Side</div>
          <img src={imgLight} alt="imgLight" className={styles.item__img} />
        </div>

        <div onClick={() => change(THEME_DARK)} className={styles.item}>
          <div className={styles.item__header}>Dark Side</div>
          <img src={imgDark} alt="imgDark" className={styles.item__img} />
        </div>

        <div onClick={() => change(THEME_NEITRAL)} className={styles.item}>
          <div className={styles.item__header}>Im Han Solo</div>
          <img src={falcon} alt="imgLight" className={styles.item__img} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
