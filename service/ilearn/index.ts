import { ILearnCas } from "../../auth/ilearn-cas.ts";
import { get, getCookie } from "../../utils.ts";

export abstract class ILearnService {
    protected readonly _session: Promise<string>;

    protected async get(endpoint: string): Promise<unknown> {
        return get(this.host + endpoint, {
            [this.sessionName]: await this._session,
        }).then(
            (res) => res.json(),
        );
    }

    constructor(
        protected readonly host: string,
        protected readonly casPath: string,
        cas: ILearnCas,
        private sessionName: string,
    ) {
        this._session = cas.authenticate(this.host + this.casPath).then((
            location,
        ) => getCookie(get(location), sessionName));
    }
}

