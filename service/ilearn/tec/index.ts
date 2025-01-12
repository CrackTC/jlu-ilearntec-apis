import { ILearnCas } from "../../../auth/ilearn-cas.ts";
import { ILearnService } from "../index.ts";
import {
  ILearnClass,
  ILearnLive,
  ILearnDataList,
  ILearnTerm,
  ILearnUser,
} from "../types.ts";

export class ILearnTecService extends ILearnService {
  constructor(cas: ILearnCas) {
    super({
      host: "https://ilearntec.jlu.edu.cn",
      casPath: "/coursecenter/main/index",
      cas,
      sessionCookieName: "SESSION",
    });
  }

  public async getSelf() {
    return await super.get(
      "/studycenter/platform/public/getUserInfo",
    ) as ILearnUser;
  }

  public async getTerms() {
    const resp = await super.get(
      "/studycenter/platform/common/termList",
    ) as ILearnDataList<ILearnTerm>;
    return resp.dataList;
  }

  public async getTermClasses(term: ILearnTerm) {
    const resp = await super.get(
      `/studycenter/platform/classroom/myClassroom?termYear=${term.year}&term=${term.num}`,
    ) as ILearnDataList<ILearnClass>;
    return resp.dataList;
  }

  public async getClassLives(cls: ILearnClass) {
    const resp = await super.get(
      `/coursecenter/liveAndRecord/getLiveAndRecordInfoList?roomType=0&identity=0&teachClassId=${cls.id}`,
    ) as ILearnDataList<ILearnLive>;
    return resp.dataList;
  }
}
