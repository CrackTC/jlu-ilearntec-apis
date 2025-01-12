import { ILearnCas } from "../../../auth/ilearn-cas.ts";
import { ILearnService } from "../index.ts";
import { ILearnLive, ILearnLiveResources } from "../types.ts";

export class ILearnResService extends ILearnService {
  constructor(cas: ILearnCas) {
    super({
      host: "https://ilearnres.jlu.edu.cn",
      casPath: "/resource-center/user/casLogin?client_name=resource-center",
      cas,
      sessionCookieName: "JSESSIONID",
    });
  }

  public async getLiveVideos(live: ILearnLive) {
    return await super.get(
      `/resource-center/videoclass/videoClassInfo?resourceId=${live.resourceId}`,
    ) as ILearnLiveResources;
  }
}
