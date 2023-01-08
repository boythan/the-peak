import React, { Dispatch, SetStateAction } from "react";
import { IAppNotification } from "../interface/app";

export interface IAppLayoutState {
  fecthNews: (promiseFuntions: any, resolve?: any) => void;
  setAppNotification: (noti: SetStateAction<IAppNotification | null>) => void;
}

const appLayoutState: IAppLayoutState = {
  fecthNews: () => {},
  setAppNotification: () => {},
};

const AppLayoutContext = React.createContext(appLayoutState);
export default AppLayoutContext;
