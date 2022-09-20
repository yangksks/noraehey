import { Cookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

export type tokenOptionType = {
  path: string;
  secure: boolean;
  sameSite: 'none';
};

export const tokenOption: tokenOptionType = {
  path: '/',
  secure: true,
  sameSite: 'none',
};

export const setCookie = (
  name: string,
  value: string,
  options: CookieSetOptions = tokenOption,
) => cookies.set(name, value, options);

export const getCookie = (name: string) => cookies.get(name);

export const removeCookie = (name: string) => cookies.remove(name);
