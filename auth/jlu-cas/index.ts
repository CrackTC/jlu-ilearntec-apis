import { strEnc } from "./des.ts";
import {
  get,
  getCookie,
  getElemValue,
  getRedirect,
  post,
} from "../../utils.ts";

const jluCasUrl = "https://cas.jlu.edu.cn/tpass/login?service=";

type jluCasParams = {
  username: string;
  password: string;
};

export class JluCas {
  private _username: string;
  private _password: string;

  constructor({ username, password }: jluCasParams) {
    this._username = username;
    this._password = password;
  }

  /**
   * Authenticate specified service.
   * @param service - The service url to authenticate.
   * @returns The location of the service after authentication.
   */
  async authenticate(service: string) {
    const url = jluCasUrl + service;
    const cas = get(url);
    const lt = await getElemValue(cas, "#lt");
    return await getRedirect(post(url, {
      rsa: strEnc(this._username + this._password + lt),
      ul: this._username.length.toString(),
      pl: this._password.length.toString(),
      sl: "0",
      lt,
      execution: "e1s1",
      _eventId: "submit",
    }, { tpasssessionid: await getCookie(cas, "tpasssessionid") }));
  }
}
