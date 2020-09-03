import { IObject } from "../schema";

/**
 * Returns a string containing updated params
 * @param search Search string in the URL
 * @param params Object containing new params to be appended in `key-value` pairs
 */
export const paramsToURL = (
  params: IObject<string | undefined>,
  search: string = ""
) => {
  const currParams = new URLSearchParams(search);

  Object.keys(params).forEach((k) => currParams.set(k, params[k] || ""));
  const newParams = [...currParams].map(([k, v]) => `${k}=${v}`).join("&");

  return `?${newParams}`;
};

export const setCookie = (
  name: string,
  value: string,
  opts: { expires?: string; domain?: string } = {}
) => {
  let cookie = `${name}=${encodeURIComponent(value)}; path=/;`;
  if (opts.expires) {
    cookie += ` expires=${new Date(opts.expires).toUTCString()};`;
  }
  if (opts.domain) {
    cookie += ` domain=${opts.domain};`;
  }
  document.cookie = cookie;
};

export const removeCookie = (name: string) => {
  const cookie = getCookie(name);
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
  return cookie;
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");
  const result = cookies.find((c) => c.split("=")[0] === name);
  return result ? decodeURIComponent(result.split("=")[1]) : result;
};
