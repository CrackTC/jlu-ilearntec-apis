import { JluCas } from "./auth/jlu-cas/index.ts";
import { Jwc } from "./auth/jwc.ts";
import { ILearnCas } from "./auth/ilearn-cas.ts";
import { ILearnResService } from "./service/ilearn/res/index.ts";
import { ILearnTecService } from "./service/ilearn/tec/index.ts";

const username = Deno.env.get("JLU_USERNAME");
const password = Deno.env.get("JLU_PASSWORD");

if (!username || !password) {
  throw new Error("Please set JLU_USERNAME and JLU_PASSWORD in env");
}

const jluCas = new JluCas({ username, password });
const jwc = await Jwc.fromJluCas(jluCas);
const ilearnCas = await ILearnCas.fromJwc(jwc);

const ilearnTec = new ILearnTecService(ilearnCas);
const ilearnRes = new ILearnResService(ilearnCas);
