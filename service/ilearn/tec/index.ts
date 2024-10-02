import { ILearnCas } from "../../../auth/ilearn-cas.ts";
import { ILearnService } from "../index.ts";

export class ILearnTecService extends ILearnService {
  constructor(cas: ILearnCas) {
    super(
      "https://ilearntec.jlu.edu.cn",
      "/coursecenter/main/index",
      cas,
      "SESSION",
    );
  }

  public getSelf() {
    return super.get("/coursecenter/iplate/getUserByMid");
  }

  public getTermList() {
    return super.get("/studycenter/platform/common/termList");
  }

  public getTermWeekList(termId: string) {
    return super.get(
      `/coursecenter/liveAndRecord/getWeekList?identity=2&termId=${termId}`,
    );
  }

  public getTermClasses(termYear: string, term: string) {
    return super.get(
      `/coursecenter/liveAndRecord/getTeachClassList?termYear=${termYear}&term=${term}`,
    );
  }

  public getClassInfo(classId: string) {
    return super.get(
      `/studycenter/platform/classroom/classInfo?classroomId=${classId}`,
    );
  }

  public getClassLessons(classId: string) {
    return super.get(
      `/coursecenter/liveAndRecord/getLiveAndRecordInfoList?roomType=0&identity=0&teachClassId=${classId}`,
    );
  }
}
