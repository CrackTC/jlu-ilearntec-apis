import { get, getCookie, getJsonp, getRedirect } from "../utils.ts";
import { Jwc } from "../auth/jwc.ts";

const getIlearnCasUrl = (params: Record<string, string> = {}) =>
  "https://ilearn.jlu.edu.cn/cas-server/login?" + new URLSearchParams(params);

type iLearnCasParams = {
  username: string;
  password: string;
};

export class ILearnCas {
  static async fromJwc(jwc: Jwc) {
    return new ILearnCas(await jwc.getCredentials());
  }

  private _casTgc: Promise<string>;
  private _username: string;
  private _password: string;

  private constructor({ username, password }: iLearnCasParams) {
    this._casTgc = this.getCasTgc();
    this._username = username;
    this._password = password;
  }

  private async getCasTgc() {
    const JSESSIONID = await getCookie(
      get(getIlearnCasUrl()),
      "JSESSIONID",
    );

    const { lt, execution } = await getJsonp(
      get(
        getIlearnCasUrl({
          service: "https://ilearntec.jlu.edu.cn/",
          "get-lt": "true",
        }),
        { JSESSIONID },
      ),
    );

    return await getCookie(
      get(
        getIlearnCasUrl({
          service: "https://ilearntec.jlu.edu.cn/",
          username: this._username,
          password: btoa(this._password),
          isajax: "true",
          _eventId: "submit",
          lt,
          execution,
        }),
        { JSESSIONID },
      ),
      "CASTGC",
    );
  }

  public async authenticate(service: string) {
    return await getRedirect(
      get(getIlearnCasUrl({ service }), { CASTGC: await this._casTgc }),
    );
  }
}
