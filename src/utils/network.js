/**
 * это нужно чтоюы в гитхабе нормально делались запросы
 *
 */
// export const changeHTTP = (url) => {
//   const result = url?.replace('http', 'https');

//   return result;
// };

export const getApiResource = async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error('Could not fetch.', res.status);
      return false;
    }

    return await res.json();
  } catch (error) {
    console.error('Could not fetch.', error.message);
    return false;
  }
};
// getApiResource('https://swapi.dev/api/people');

// (async () => {
//   const body = await getApiResource('https://swapi.dev/api/people');
//   console.log(body);
// })();

//Запрос на результат от массива с url адресами

export const makeConcurrentRequest = async (url) => {
  const res = await Promise.all(
    url.map((res) => {
      return fetch(res).then((res) => res.json());
    }),
  );

  return res;
};
