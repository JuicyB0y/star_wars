import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { getApiResource } from '../../utils/network';
import FavoritesPage from '../FavouritesPage/FavoritesPage';
import HomePage from '../HomePage/HomePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { PeoplePage } from '../PeoplePage';
import SearchPage from '../SearchPage/SearchPage.jsx';
import PersonPage from '../PersonPage/PersonPage.jsx';
import { changeCssVariables } from '../../services/changeCssVariables';

import styles from './App.module.css';
import { ErrorMessage } from '../../components';

export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';
export const THEME_NEITRAL = 'neitral';

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('');

  const change = (name) => {
    setTheme(name);
    changeCssVariables(name);
  };
  return (
    <div className={styles.wrapper}>
      <ThemeContext.Provider value={{ theme, change }}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:id" element={<PersonPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/fail" element={<ErrorMessage />} />
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
