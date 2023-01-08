// react
import classnames from "classnames";
import { debounce, isArray, isEmpty } from "lodash";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import AppLink from "../components/AppLink";
import AppLayoutContext from "../context/app";
import { AppFetchNewsState, IAppNotification } from "../interface/app";
import SearchPage from "../screen/search/SearchPage";

export interface AppLayoutProps extends PropsWithChildren<{}> {}

function AppLayout(props: AppLayoutProps) {
  const { children } = props;
  const [search, setSearch] = useState<string>("");
  const [appNotification, setAppNotification] =
    useState<IAppNotification | null>(null);

  const [fetchNewsState, setFetchNewsState] =
    useState<AppFetchNewsState | null>();

  useEffect(() => {
    if (appNotification) {
      setTimeout(() => setAppNotification(null), 3000);
    }
  }, [appNotification]);

  const onChangeSearch = debounce((event) => {
    setSearch(event?.target?.value);
  }, 500);

  const fecthNews = (promiseFunction, resolve) => {
    if (!promiseFunction) {
      return;
    }
    setFetchNewsState(AppFetchNewsState.LOADING);

    const promiseAll = promiseFunction.map((pro) => {
      let taskItem;
      if (!isArray(pro.params)) taskItem = pro.method(pro.params);
      else taskItem = pro.method(...pro.params);

      return taskItem;
    });
    const task = Promise.all(promiseAll);

    task
      .then((result: any[]) => {
        if (result) {
          // Success
          setFetchNewsState(AppFetchNewsState.SUCCESS);
          resolve && resolve(result);
        }
      })
      .catch((error) => {
        setFetchNewsState(AppFetchNewsState.ERROR);
      });
  };

  const renderSiteBody = () => {
    if (fetchNewsState === AppFetchNewsState.ERROR) {
      return renderFecthNewsError();
    }
    if (!isEmpty(search)) {
      return <SearchPage search={search} />;
    }

    return children;
  };

  const renderFecthNewsError = () => {
    return (
      <div className="flex-center p-5">
        <h6>Oops! Error 404</h6>
      </div>
    );
  };

  return (
    <AppLayoutContext.Provider value={{ fecthNews, setAppNotification }}>
      <Fragment>
        <div className="site">
          <header className="site-header">
            <div className="container position-relative h-100">
              <AppLink href={"/"}>
                <img src="/images/logo.png" className="site-header__logo" />
              </AppLink>
              <div className="site-header__search-container flex-center p-1">
                <input
                  id="site-search-input"
                  className={classnames("site-header__search-input", {
                    "site-header__search-input-focus": !isEmpty(search),
                  })}
                  placeholder="Search all news"
                  autoFocus
                  onChange={(event) => onChangeSearch(event)}
                  onBlur={() => setTimeout(() => setSearch(""), 1000)}
                />
                <img
                  src="/images/search.svg"
                  onClick={() => {
                    document.getElementById("site-search-input")?.focus();
                  }}
                />
              </div>
            </div>
          </header>

          <div className={classnames("site-body position-relative")}>
            {renderSiteBody()}
            {fetchNewsState === AppFetchNewsState.LOADING && (
              <div className="site__loader">
                <div className="loader " />
              </div>
            )}
          </div>

          <footer className="site-footer" />
          {appNotification && (
            <div
              className={`site__notification site__notification-${appNotification?.type}`}
            >
              {appNotification?.content}
            </div>
          )}
        </div>
      </Fragment>
    </AppLayoutContext.Provider>
  );
}

export default AppLayout;
