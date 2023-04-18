import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import cn from 'classnames';

import { getApiResource } from '../../utils/network';
import { withErrorApi } from '../../hoc-helpers/withErrorApi';
import { getId, getImg } from '../../services/getPeopleData';
import cancel from '../../assets/cancel.svg';

import styles from './SearchPage.module.css';

const SearchPage = ({ setErrorStatus }) => {
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [people, setPeople] = useState([]);

  const getResponse = async (params) => {
    const res = await getApiResource(`https://swapi.dev/api/people/?search=${params}`);
    // console.log(res);
    if (res) {
      const peopleList = res.results.map((item) => {
        const id = getId(item.url);
        const img = getImg(id);

        return {
          id,
          name: item.name,
          img,
        };
      });
      // console.log(peopleList);
      setPeople(peopleList);

      setErrorStatus(false);
    } else {
      setErrorStatus(true);
    }
  };

  useEffect(() => {
    getResponse('');
  }, []);

  const debounceGetResponse = useCallback(
    debounce((value) => {
      getResponse(value);
    }, 300),
    [],
  );

  const handleInputChange = (e) => {
    setInputSearchValue(e.target.value);
    debounceGetResponse(e.target.value);
  };

  return (
    <>
      <h1 className="header__text">Search</h1>
      <div className={cn(styles.wrapper__input, styles.input__search)}>
        <input
          type="text"
          value={inputSearchValue}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Input characters name"
        />
        <img
          src={cancel}
          alt="cancel"
          className={cn(styles.clear, !inputSearchValue && styles.clear__diabled)}
          onClick={() => setInputSearchValue('')}
        />
      </div>
      {people.length ? (
        <ul className={styles.list__container}>
          {people.map((item) => (
            <li className={styles.list__item} key={item.id}>
              <Link to={`/people/${item.id}`}>
                <img className={styles.person__photo} src={item.img} alt={item.name} />
                <p className={styles.person__name}>{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className={styles.person__comment}>No results</h2>
      )}
    </>
  );
};

export default withErrorApi(SearchPage);
