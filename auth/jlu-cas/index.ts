import { strEnc } from "./des.ts";
import {
    get,
    getCookie,
    getElemValue,
    getRedirect,
    post,
} from "../../utils.ts";

const jluCasUrl = "https://cas.jlu.edu.cn/tpass/login?service=";

export class JluCas {
    constructor(private username: string, private password: string) {}

    async authenticate(service: string) {
        const cas = get(jluCasUrl + service);
        const lt = await getElemValue(cas, "#lt");
        return await getRedirect(post(jluCasUrl + service, {
            rsa: strEnc(this.username + this.password + lt),
            ul: this.username.length.toString(),
            pl: this.password.length.toString(),
            sl: "0",
            lt,
            execution: "e1s1",
            _eventId: "submit",
        }, { tpasssessionid: await getCookie(cas, "tpasssessionid") }));
    }
}
