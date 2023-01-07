// react
import classnames from "classnames";
import { debounce, isArray, isEmpty } from "lodash";
import React, { Fragment, PropsWithChildren, useState } from "react";
import AppLink from "../components/AppLink";
import AppLayoutContext from "../context/app";
import SearchPage from "../screen/search/SearchPage";

export interface AppLayoutProps extends PropsWithChildren<{}> {}

function AppLayout(props: AppLayoutProps) {
  const { children } = props;
  const [search, setSearch] = useState<string>("");
  const [loadingPage, setLoadingPage] = useState(false);

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
    <AppLayoutContext.Provider value={{ fecthNews, setSearch }}>
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
          <React.StrictMode>
            <div className={classnames("site-body position-relative")}>
              {renderSiteBody()}
              {loadingPage && (
                <div className="site__loader">
                  <div className="loader " />
                </div>
              )}
            </div>
          </React.StrictMode>

          <footer className="site-footer" />
        </div>
      </Fragment>
    </AppLayoutContext.Provider>
  );
}

export default AppLayout;
