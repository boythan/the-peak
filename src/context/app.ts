import React, { Dispatch, SetStateAction } from "react";

export interface IAppLayoutState {
  loadingPage: boolean;
  setLoadingPage: Dispatch<SetStateAction<boolean>>;
}

const appLayoutState: IAppLayoutState = {
  loadingPage: false,
  setLoadingPage: () => {},
};

const AppLayoutContext = React.createContext(appLayoutState);
export default AppLayoutContext;
