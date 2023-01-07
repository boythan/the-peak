import React, { Dispatch, SetStateAction } from "react";

export interface IAppLayoutState {
  // loadingPage: boolean;
  setSearch: Dispatch<SetStateAction<string>>;
  fecthNews: (promiseFuntions: any, resolve?: any) => void;
}

const appLayoutState: IAppLayoutState = {
  // loadingPage: false,
  setSearch: () => {},
  fecthNews: () => {},
};

const AppLayoutContext = React.createContext(appLayoutState);
export default AppLayoutContext;
