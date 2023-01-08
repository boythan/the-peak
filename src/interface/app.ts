export enum AppFetchNewsState {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export enum AppNotificationType {
  ERROR = "error",
  SUCCESS = "success",
}

export interface IAppNotification {
  type: AppNotificationType;
  content: any;
}

export interface IAppPromiseFunc {
  method: (...params: any) => Promise<any>;
  params: any[];
}
