import { JluCas } from "./auth/jlu-cas/index.ts";
import { Jwc } from "./auth/jwc.ts";
import { ILearnCas } from "./auth/ilearn-cas.ts";
import { ILearnResService } from "./service/ilearn/res/index.ts";
import { ILearnTecService } from "./service/ilearn/tec/index.ts";

const username = Deno.env.get("JLU_USERNAME")!;
const password = Deno.env.get("JLU_PASSWORD")!;

const jluCas = new JluCas(username, password);
const jwcLocation = await jluCas.authenticate(
    "https://jwcidentity.jlu.edu.cn/iplat-pass-jlu/thirdLogin/jlu/login",
);

const { username: jwcUsername, password: jwcPassword } = await new Jwc(
    jwcLocation,
).getCredentials();

const iLearnCas = new ILearnCas(jwcUsername, jwcPassword);

const iLearnTec = new ILearnTecService(iLearnCas);
const user = await iLearnTec.getSelf();
console.log(JSON.stringify(user, null, 4));

const iLearnRes = new ILearnResService(iLearnCas);
const courseList = await iLearnRes.getCourseList();
console.log(JSON.stringify(courseList, null, 4));
