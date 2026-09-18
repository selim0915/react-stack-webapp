export const setCookie = (name: string, value: string, days: number = 1) => {
  let expires = '';

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Strict`;
};

export const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : '';
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1999 00:00:01 GMT;`;
};

export const deleteAllCookies = () => {
  const cookies = document.cookie.split('; ');

  cookies.forEach((cookie) => {
    const cookieName = cookie.split('=')[0];
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1999 00:00:10 GMT; path=/`;
  });
};
