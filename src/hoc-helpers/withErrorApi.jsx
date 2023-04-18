import React, { useState } from 'react';
// import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { ErrorMessage } from '../components';

// это компонент высшего порядка
export const withErrorApi = (View) => {
  return (props) => {
    const [errorStatus, setErrorStatus] = useState(false);

    return <>{errorStatus ? <ErrorMessage /> : <View setErrorStatus={setErrorStatus} {...props} />}</>;
  };
};
