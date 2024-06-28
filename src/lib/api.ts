export const apiURL: string = process.env.API_URL || "";

/**
 * Api class for making authenticated requests to the API
 */
export default class Api {
  private authHeader?: string;

  constructor(authHeader?: string) {
    this.authHeader = authHeader;
  }

  post(url: string, options: any) {
    return fetch(apiURL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.authHeader,
      },
      ...options,
    });
  }

  get(url: string, options: any) {
    return fetch(apiURL + url, {
      method: "GET",
      headers: {
        Authorization: this.authHeader,
      },
      ...options,
    });
  }

  put(url: string, options: any) {
    return fetch(apiURL + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.authHeader,
      },
      ...options,
    });
  }

  delete(url: string, options: any) {
    return fetch(apiURL + url, {
      method: "DELETE",
      headers: {
        Authorization: this.authHeader,
      },
      ...options,
    });
  }
}
