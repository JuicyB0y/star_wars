import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import bookMark from '../../assets/bookmark.svg';
import { ThemeContext } from '../../containers/App/App';

import imgDroid from '../../assets/droid.svg';
import imgLightSaber from '../../assets/lightsaber.svg';
import imgSpaceStation from '../../assets/space-station.svg';

import styles from './Header.module.css';

import { THEME_LIGHT, THEME_DARK, THEME_NEITRAL } from '../../containers/App/App.jsx';

const Header = () => {
  const [icon, setIcon] = useState(imgSpaceStation);
  const storePerson = useSelector((state) => state.person.persons);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    switch (theme) {
      case THEME_LIGHT:
        setIcon(imgLightSaber);
        break;
      case THEME_DARK:
        setIcon(imgSpaceStation);
        break;
      case THEME_NEITRAL:
        setIcon(imgDroid);
        break;
      default:
        setIcon(imgSpaceStation);
        break;
    }
  }, [theme]);

  return (
    <div className={styles.container}>
      <img src={icon} alt="icon" className={styles.logo} />
      <ul className={styles.list__container}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/people/?page=1">People</NavLink>
        </li>
        <li>
          <NavLink to="/not-found">Not Found</NavLink>
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
        <li>
          <NavLink to="/fail">Fail</NavLink>
        </li>
      </ul>

      <Link to="/favorites" className={styles.link}>
        <span className={styles.counter}>{storePerson.length}</span>
        <img className={styles.image} src={bookMark} alt="bookMark" />
      </Link>
    </div>
  );
};

export default Header;
