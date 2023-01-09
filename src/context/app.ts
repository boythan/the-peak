import React, { Dispatch, SetStateAction } from "react";
import { IAppNotification } from "../interface/app";

export interface IAppLayoutState {
  fetchNews: (promiseFunctions: any, resolve?: any) => void;
  setAppNotification: (notification: SetStateAction<IAppNotification | null>) => void;
}

const appLayoutState: IAppLayoutState = {
  fetchNews: () => {},
  setAppNotification: () => {},
};

const AppLayoutContext = React.createContext(appLayoutState);
export default AppLayoutContext;
