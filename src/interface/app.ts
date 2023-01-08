export enum AppNotificationType {
  ERROR = "error",
  SUCCESS = "success",
}

export interface IAppNotification {
  type: AppNotificationType;
  content: any;
}
