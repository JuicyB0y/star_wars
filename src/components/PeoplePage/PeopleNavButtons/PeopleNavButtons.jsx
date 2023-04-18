import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './PeopleNavButtons.module.css';

const PeopleNavButtons = ({ getResource, prevPage, nextPage, counterPage, theme = 'dark' }) => {
  const handleClickNext = () => getResource(nextPage);
  const handleClickPrev = () => getResource(prevPage);

  return (
    <div className={styles.wrapper}>
      <Link to={`/people/?page=${counterPage - 1}`}>
        <button className={cn(styles.button, styles[theme])} onClick={handleClickPrev} disabled={!prevPage}>
          Previous
        </button>
      </Link>
      <Link to={`/people/?page=${counterPage + 1}`}>
        <button className={cn(styles.button, styles[theme])} onClick={handleClickNext} disabled={!nextPage}>
          Next
        </button>
      </Link>
    </div>
  );
};

PeopleNavButtons.propTypes = {
  getResource: PropTypes.func,
  prevPage: PropTypes.string,
  nextPage: PropTypes.string,
  counterPage: PropTypes.number,
};

export default PeopleNavButtons;
