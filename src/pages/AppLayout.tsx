// react
import classnames from "classnames";
import { debounce, isArray, isEmpty } from "lodash";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import AppLink from "../components/AppLink";
import AppLayoutContext from "../context/app";
import { AppNotificationType, IAppNotification } from "../interface/app";
import SearchPage from "../screen/search/SearchPage";

export interface AppLayoutProps extends PropsWithChildren<{}> {}

function AppLayout(props: AppLayoutProps) {
  const { children } = props;
  const [search, setSearch] = useState<string>("");
  const [loadingPage, setLoadingPage] = useState(false);
  const [appNotification, setAppNotification] =
    useState<IAppNotification | null>(null);

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
    setLoadingPage(true);

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
          setLoadingPage(false);
          console.log("result", result);
          resolve && resolve(result);
        }
      })
      .catch((error) => {
        // this.setError(error);
        setLoadingPage(false);
      });
  };

  const renderSiteBody = () => {
    if (!isEmpty(search)) {
      return <SearchPage search={search} />;
    }

    return children;
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
            {loadingPage && (
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
