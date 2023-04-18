import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withErrorApi } from '../../hoc-helpers/withErrorApi';

import { getApiResource } from '../../utils/network';
import { API_PEOPLE } from '../../constants/api';
import { getId, getImg, getPeoplePageId } from '../../services/getPeopleData';
import { PeopleList } from '../../components';
// import PeopleList from '../../components/PeoplePage/PeopleList/PeopleList';

import styles from './PeoplePage.module.css';
import { useQueryParams } from '../../hooks/useQueryParams';
import PeopleNavButtons from '../../components/PeoplePage/PeopleNavButtons/PeopleNavButtons';

const PeoplePage = ({ setErrorStatus }) => {
  const [names, setNames] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [counterPage, setCounterPage] = useState(1);

  //Достаем номер страницы из url
  const query = useQueryParams();
  const queryPage = query.get('page');
  // console.log(queryPage);

  const getResource = async (url) => {
    const res = await getApiResource(url);

    if (res) {
      const peopleList = res.results.map((item) => {
        const id = getId(item.url);
        const img = getImg(id);

        // console.log(res);

        return {
          id,
          name: item.name,
          img,
        };
      });
      // console.log(peopleList);
      setNames(peopleList);
      setNextPage(res.next);
      setPrevPage(res.previous);

      setCounterPage(getPeoplePageId(url));

      setErrorStatus(false);
    } else {
      setErrorStatus(true);
    }
  };

  useEffect(() => {
    getResource(`https://swapi.dev/api/people/?page=${queryPage}`);
    // console.log(names);
  }, [queryPage]);

  return (
    <>
      <PeopleNavButtons getResource={getResource} prevPage={prevPage} nextPage={nextPage} counterPage={counterPage} />
      <PeopleList names={names} />
    </>
  );
};

PeoplePage.propTypes = {
  setErrorStatus: PropTypes.func,
};

export default withErrorApi(PeoplePage);
