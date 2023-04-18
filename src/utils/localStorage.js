// export const storage = {
//   setItem: (name, item) => {
//     localStorage.setItem(name, JSON.stringify(item));
//   },
//   getItem: (name) => {
//     const item = localStorage.getItem(name);
//     if (item.length) {
//       return JSON.parse(item);
//     }
//     return [];
//   },
// };

export const getStorage = (name) => {
  const item = localStorage.getItem(name);
  if (item !== null) {
    return JSON.parse(item);
  }
  return [];
};

export const setStorage = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};
