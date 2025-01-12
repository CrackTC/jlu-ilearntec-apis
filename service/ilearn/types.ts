export type ILearnApiResult<T> = {
  data: T;
  code: `${number}`;
  status: `${number}`;
  message: string;
  location: string;
};

export type ILearnDataList<T> = {
  dataList: T[];
};

export type ILearnUser = {
  studentId: `${number}`;
  msg: string;
  studyNo: `${number}`;
  studentName: string;
  schoolName: string;
  userName: string;
  headPic: string;
  memberId: string;
};

export type ILearnTerm = {
  year: `${number}`;
  endDate: string;
  num: `${number}`;
  name: string;
  id: string;
  startDate: string;
  selected: "0" | "1";
};

export enum ILearnClassStatus {
  NotStarted = "0",
  InProgress = "1",
  Finished = "2",
}

export type ILearnClass = {
  id: `${number}`;
  name: string;
  courseId: string;
  courseName: string;
  cover: string;
  teacherId: `${number}`;
  teacherName: string;
  status: ILearnClassStatus;
  statusName: string;
  classId: `${number}`;
  classroomId: `${number}`;
  teacherUserName: string;
  schoolId: `${number}`;
  type: `${number}`;
  typeName: string;
  schoolName: string;
};

export enum ILearnLiveStatus {
  NotStarted = "0",
  Finished = "3",
}

export type ILearnVideoClass = {
  videoClassId: string;
  videoName: string;
};

export type ILearnLive = {
  id: string;
  resourceId: string;
  liveRecordName: string;
  buildingName: string;
  currentWeek: `${number}`;
  currentDay: `${number}`;
  currentDate: string;
  roomName: string;
  roomId: `${number}`;
  isAllowDownload: "0" | "1";
  teacherName: string;
  courseId: string;
  courseName: string;
  classIds: string;
  classNames: string;
  section: string;
  timeRange: string;
  isOpen: "0" | "1";
  isAction: "0" | "1";
  liveStatus: ILearnLiveStatus;
  schImgUrl: string;
  videoTimes: `${number}`;
  classType: `${number}`;
  videoPath: string;
  videoClassMap: ILearnVideoClass[];
  livePath: string;
  roomType: `${number}`;
  scheduleTimeStart: string;
  scheduleTimeEnd: string;
};

export type ILearnVideo = {
    id: string;
    videoCode: `${number}`;
    videoName: string;
    videoPath: string;
    videoSize: `${number}`;
};

export type ILearnLiveResources = {
  videoList: ILearnVideo[];
  phaseUrl: string;
  audioPath: string;
};
