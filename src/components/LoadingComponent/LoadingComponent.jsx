import React, { useEffect, useState } from 'react';

import Loader from '../../assets/Loader.svg';
import loaderBlack from '../../assets/loader-black.svg';
import loaderWhite from '../../assets/loader-white.svg';
import loaderBlue from '../../assets/loader-blue.svg';

import styles from './LoadingComponent.module.css';

const LoadingComponent = () => {
  const [loaderIcon, setLoaderIcon] = useState(null);

  const theme = 'white';

  useEffect(() => {
    switch (theme) {
      case 'black':
        setLoaderIcon(loaderBlack);
        break;
      case 'white':
        setLoaderIcon(loaderWhite);
        break;
      case 'blue':
        setLoaderIcon(loaderBlue);
        break;
      default:
        setLoaderIcon(loaderBlack);
    }
  }, []);

  return (
    <div>
      <img src={loaderIcon} alt="Loader" className={styles.image} />
    </div>
  );
};

export default LoadingComponent;
