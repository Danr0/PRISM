import defaultsDeep from 'lodash-es/defaultsDeep';

export const fetchData = (url: string, options: any = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  return fetch(url, defaultsDeep(options, {
    headers,
  }));
};

export const fetchDataAuth = (url: string, options: any = {}) => {
  const token = localStorage.getItem('token');
  if (token !== null) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + (token).toString()
    };

    return fetch(url, defaultsDeep(options, {
      headers,
    }));
  }
  else
    alert("Invalid token");
    return null;
};
