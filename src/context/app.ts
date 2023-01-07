import React from "react";

export interface IAppLayoutState {
  fecthNews: (promiseFuntions: any, resolve?: any) => void;
}

const appLayoutState: IAppLayoutState = {
  fecthNews: () => {},
};

const AppLayoutContext = React.createContext(appLayoutState);
export default AppLayoutContext;
