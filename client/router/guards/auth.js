import Cookie from 'js-cookie';
let token = Cookie.get('access_token');

export default (to, from) => {
  if (!token && to.name !== 'auth.login') {
    return { name: 'auth.login' };
  }

  return null;
};
