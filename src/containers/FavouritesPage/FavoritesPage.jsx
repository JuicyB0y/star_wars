import React from 'react';
import { useSelector } from 'react-redux';
import { PeopleList } from '../../components';

import styles from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const storePerson = useSelector((state) => state.person.persons);

  return (
    <div>
      <h1 className="header__text">Favourites Page</h1>
      {storePerson.length ? (
        <PeopleList names={storePerson} />
      ) : (
        <h2 className={styles.subtitle}>No Favourite Characters</h2>
      )}
    </div>
  );
};

export default FavoritesPage;
