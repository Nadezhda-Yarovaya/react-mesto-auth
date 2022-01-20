export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  console.log('em: ' + email + 'pass: ' + password);
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((response) => {
      try {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        }
      } catch (e) {
        return (e)
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log('ошибка при попытке fetch register: ' + err));
};


export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(response => response.json())
    .then((data) => {
      if (data.token) {
        console.log('jwt: ' + data.token);
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
    .catch(err => console.log(err))
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then(data => data)
} 