import { ILearnCas } from "../../../auth/ilearn-cas.ts";
import { ILearnService } from "../index.ts";

export class ILearnResService extends ILearnService {
  constructor(cas: ILearnCas) {
    super(
      "https://ilearnres.jlu.edu.cn",
      "/resource-center/user/casLogin?client_name=resource-center",
      cas,
      "JSESSIONID",
    );
  }

  public getCourseList() {
    return super.get("/resource-center/common/courseList");
  }

  public getLessonVideos(resourceId: string) {
    return super.get(
      `/resource-center/videoclass/videoClassInfo?resourceId=${resourceId}`,
    );
  }
}
