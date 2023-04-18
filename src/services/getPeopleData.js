const checkProtocol = (url) => {
  if (/https/g.test(url)) {
    // console.log('https');
    return 'https';
  } else {
    // console.log('http');
    return 'http';
  }
};

export const getId = (url) => {
  const protocol = checkProtocol(url);
  const id = url.replace(`${protocol}://swapi.dev/api/people`, '').replace(/\//g, '');
  return id;
};

export const getImg = (id) => {
  const image = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  return image;
};

export const getPeoplePageId = (url) => {
  const number = url.lastIndexOf('=');
  const res = url.slice(number + 1);
  // console.log(res);
  return Number(res);
};
