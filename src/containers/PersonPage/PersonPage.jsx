import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import PersonInfo from '../../components/PersonPage/PersonInfo/PersonInfo';

import BackIcon from '../../assets/previous.png';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

import { withErrorApi } from '../../hoc-helpers/withErrorApi';
import { removePersonFromFav, setPersonToFav } from '../../redux/slices/personSlice';
import { getImg } from '../../services/getPeopleData.js';
import { getApiResource } from '../../utils/network.js';

import star from '../../assets/star.svg';
import starFill from '../../assets/star-fill.svg';

import styles from './PersonPage.module.css';
import { setStorage, storage } from '../../utils/localStorage';

const PersonInfo = React.lazy(() => import('../../components/PersonPage/PersonInfo/PersonInfo'));

const PersonPage = ({ setErrorStatus }) => {
  const [personInfo, setPersonInfo] = useState([]);
  const [personName, setPersonName] = useState('');
  const [personImg, setPersonImg] = useState('');
  const [personFilms, setPersonFilms] = useState([]);

  const [savedPerson, setSavedPerson] = useState([]);

  const isMounted = useRef(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const storePerson = useSelector((state) => state.person.persons);

  // Тут реализовали добавление персонажа в избранное
  console.log(storePerson);
  const result = storePerson?.filter((item) => item.id == id);
  let final = result.length ? true : false;

  console.log(final);

  const personFavInfo = {
    id: id,
    name: personName,
    img: personImg,
  };

  const personToFav = () => {
    dispatch(setPersonToFav({ ...personFavInfo }));
  };

  // const removePerson = () => {
  //   dispatch(removePersonFromFav(id));
  // };

  //Возвращаемся на предыдущую страницу
  const handleBack = () => {
    // e.prevent.default();
    navigate('/people/?page=1', { replace: true });
  };

  //Делаем запрос на информацию о персонаже с помощью id из url
  const fetchPersonInfo = async (id) => {
    const res = await getApiResource(`https://swapi.dev/api/people/${id}/`);
    const image = getImg(id);
    if (res) {
      // console.log(res.films);

      setPersonInfo([
        { title: 'Height', data: res.height },
        { title: 'Mass', data: res.mass },
        { title: 'Hair Color', data: res.hair_color },
        { title: 'Skin Color', data: res.skin_color },
        { title: 'Eye color', data: res.eye_color },
        { title: 'Birth Year', data: res.birth_year },
        { title: 'Gender', data: res.gender },
      ]);

      setPersonName(res.name);
      setPersonImg(image);
      setErrorStatus(false);

      res.films.length && setPersonFilms(res.films);
    } else {
      setErrorStatus(true);
    }
  };

  useEffect(() => {
    fetchPersonInfo(id);
    // storage.setItem('favourites', storePerson);
  }, []);

  // тут логика в том что при первом рендере мы не устанавливаем localStorage, а только начиная со второго
  useEffect(() => {
    if (isMounted.current) {
      setStorage('store', storePerson);
    }
    isMounted.current = true;
  }, [storePerson]);

  const dispatchFavouritePerson = () => {
    if (final) {
      dispatch(removePersonFromFav(id));

      final = false;
    } else {
      personToFav();

      final = true;
    }
  };

  return (
    <div className={styles.wrapper}>
      <a className={styles.link} href="#" onClick={handleBack}>
        <img className={styles.link__image} src={BackIcon} alt="back" />
        <span className={styles.link__name}>Back</span>
      </a>
      <span className={styles.person__name}>{personName}</span>

      <div className={styles.container}>
        <div className={styles.image__container}>
          <img className={styles.image} src={personImg} alt="personName" />

          {/* <button onClick={dispatchFavouritePerson}>{final ? 'Удалить из избранного' : 'Добавить в избранное'}</button> */}
        </div>

        <img
          onClick={dispatchFavouritePerson}
          src={final ? starFill : star}
          alt="favourite"
          className={styles.starImg}
        />

        {/* <PersonInfo personInfo={personInfo} personFilms={personFilms} /> */}

        <React.Suspense
          fallback={
            <div>
              <LoadingComponent />
            </div>
          }>
          <PersonInfo personInfo={personInfo} personFilms={personFilms} />
        </React.Suspense>
      </div>
    </div>
  );
};

export default withErrorApi(PersonPage);
