import React from 'react';
import styles from './PeopleList.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PeopleList = ({ names }) => {
  console.log(names);
  return (
    <ul className={styles.list__container}>
      {names?.map(({ name, img, id }) => (
        <li key={name} className={styles.list__item}>
          <Link to={id}>
            <img src={img} alt="name" className={styles.list__photo} />
            <p>{name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

// указываем типы пропсов
PeopleList.propTypes = {
  names: PropTypes.array,
};

export default PeopleList;
