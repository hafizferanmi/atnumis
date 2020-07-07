import store from "./store";

const appToken =
  "874aa24f1f47050f92c599a3c6b98c1bfa28b3f684d6f4ec5a8053df0b43df1b.591b1b1eaa87471c1cd5a4e4c931b0cb9c56da79fa28b3f684d6f4ec5a8053df0b43df1b874aa24f1f47050f92c599a3c6b98c1b.fa28b3f684d6f4ec5a8053df0b43df1b591b1b1eaa87471c1cd5a4e4c931b0cb9c56da79";
// const root_path = "http://coin.localhost/api";
const root_path = "https://atnumis.com/server/api";
/**
 * _u - username
 * _t - user token
 * _at - application token
 */
let username = "";
let authToken = "";

// store.subscribe(() => {
//   const state = store.getState();
//   username = state.user.userDetails.username;
//   authToken = state.user.userDetails.token;
//   url_query = `?_at=${appToken}&_t=${authToken}&_u=${username}`;
// });

let url_query;

store.subscribe(() => {
  const state = store.getState();
  username = state.user.userDetails.username;
  authToken = state.user.userDetails.token;
  url_query = `?_at=${appToken}&_t=${authToken}&_u=${username}`;
});

const postHttpOptions = (body = {}) => {
  let option = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      x_validated_url: "atnumis",
      x_validated_username: username,
      x_validated_token: authToken
    }
  };

  return option;
};

const getHttpOptions = () => {
  // console.log(username, authToken);
  let option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      x_validated_url: "atnumis",
      x_validated_username: username,
      x_validated_token: authToken
    }
  };

  return option;
};

const postFormDataHttpOptions = body => {
  let option = {
    method: "POST",
    body: body,
    headers: {
      x_validated_url: "atnumis",
      x_validated_username: username,
      x_validated_token: authToken
    }
  };

  return option;
};

export const postData = (path, data) => {
  let url = root_path + path + url_query;
  return fetch(url, postHttpOptions(data)).then(res => res.json());
};

export const fetchData = path => {
  let url = root_path + path + url_query;
  return fetch(url, getHttpOptions()).then(res => res.json());
};

export const postFormData = (path, data) => {
  let url = root_path + path + url_query;
  return fetch(url, postFormDataHttpOptions(data)).then(res => res.json());
};
