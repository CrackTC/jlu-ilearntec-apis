import { ILearnCas } from "../../auth/ilearn-cas.ts";
import { get, getCookie } from "../../utils.ts";
import { ILearnApiResult } from "./types.ts";

type ilearnServiceParams = {
  host: string;
  casPath: string;
  cas: ILearnCas;
  sessionCookieName: string;
};

export abstract class ILearnService {
  protected readonly _host: string;
  private readonly _sessionName: string;
  protected readonly _session: Promise<string>;

  protected async get(endpoint: string): Promise<unknown> {
    const resp = await get(this._host + endpoint, {
      [this._sessionName]: await this._session,
    }).then((res) => res.json());

    const result = resp as ILearnApiResult<unknown>;
    if (result.status != "1") {
      throw new Error(result.message);
    }

    return result.data;
  }

  constructor({ host, casPath, cas, sessionCookieName }: ilearnServiceParams) {
    this._session = cas.authenticate(host + casPath).then(
      (location) => getCookie(get(location), sessionCookieName),
    );
    this._host = host;
    this._sessionName = sessionCookieName;
  }
}
