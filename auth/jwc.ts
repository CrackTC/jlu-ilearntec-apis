import { get, getCookie, getElemValue } from "../utils.ts";
import { JluCas } from "./jlu-cas/index.ts";

const jwcUrl =
  "https://jwcidentity.jlu.edu.cn/iplat-pass-jlu/thirdLogin/jlu/login";

export class Jwc {
  static async fromJluCas(cas: JluCas) {
    return new Jwc(await cas.authenticate(jwcUrl));
  }

  private constructor(private jwcTicketUrl: string) {}

  async getCredentials() {
    const JSESSIONID = await getCookie(get(this.jwcTicketUrl), "JSESSIONID");

    const jwcHtml = get(jwcUrl, { JSESSIONID });

    return {
      username: await getElemValue(jwcHtml, "#username"),
      password: await getElemValue(jwcHtml, "#password"),
    };
  }
}
