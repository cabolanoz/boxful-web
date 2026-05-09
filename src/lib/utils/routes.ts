export const Routes = {
  api: {
    authRegister: () => '/auth/register',
    authLogin: () => '/auth/login',
    authMe: () => '/auth/me',
    orders: () => '/orders',
  },
  web: {
    home: () => '/',
    login: () => '/login',
    register: () => '/register',
    orders: () => '/orders',
    history: () => '/history',
  }
};
