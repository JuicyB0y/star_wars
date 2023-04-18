import React from 'react';
import { useLocation } from 'react-router-dom';
import NotFound from '../../assets/not-found.jpg';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const location = useLocation();
  const sliced = location.pathname.slice(1);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={NotFound} alt="not-found" />
      <p className={styles.text}>
        No match for <span>{sliced}</span>
      </p>
    </div>
  );
};

export default NotFoundPage;
