import { get, getCookie, getJsonp, getRedirect } from "../utils.ts";

const getIlearnCasUrl = (params: Record<string, string> = {}) =>
    "https://ilearn.jlu.edu.cn/cas-server/login?" + new URLSearchParams(params);

export class ILearnCas {
    private _casTgc: Promise<string>;

    constructor(private username: string, private password: string) {
        this._casTgc = this.getCasTgc();
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
                    username: this.username,
                    password: btoa(this.password),
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
