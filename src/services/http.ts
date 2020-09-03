import { IObject } from "../schema";
import config from "../config";

interface IHttpHeaders {
 // "Content-Type" :  string;
  "Authorization": string;
  "Accept"?:string;
}
interface IHttpConfig {
  endpoint: string;
  headers?: IHttpHeaders;
  contentType?:boolean
}

class Http {
  endpoint: string;
  headers: any;

  constructor(config: IHttpConfig) {
    this.endpoint = config.endpoint;
    this.headers = {
      "Authorization": "",
      ...(config.headers || {}),
    };
    if(!config.contentType && !config.headers?.["Content-Type"]){
      this.headers["Content-Type"] = "application/json"
    }
    
  }

  /**
   * Returns a URL string with origin, path and query parameters
   * @param path URL path
   * @param params Query parameters
   */
  __constructURL(path: string, params?: IObject) {
    let url = path;

    if (params) {
      url += "?";

      for (let key in params) {
        url += `${key}=${params[key]}&`;
      }
    }

    return `${this.endpoint}${url}`;
  }

  get<Response = any>(path: string, params?: IObject): Promise<Response> {
    return fetch(this.__constructURL(path, params), {
      headers: { ...this.headers },
    }).then((r) => r.json());
  }

  post<Response = any>(
    path: string,
    params?: IObject,
    body?: any
  ): Promise<Response> {
    return fetch(this.__constructURL(path, params), {
      method: "post",
      body,
      headers: { ...this.headers },
    }).then((r) => r.json());
  }

  put<Response = any>(
    path: string,
    params?: IObject,
    body?: any
  ): Promise<Response> {
    return fetch(this.__constructURL(path, params), {
      method: "put",
      body,
      headers: { ...this.headers },
    }).then((r) => r.json());
  }

  delete<Response = any>(path: string, params?: IObject): Promise<Response> {
    return fetch(this.__constructURL(path, params), {
      method: "delete",
      headers: { ...this.headers },
    }).then((r) => r.json());
  }
}

export default Http;
export const __Http = new Http({ endpoint: config.api_endpoint });

