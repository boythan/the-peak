// react
import classnames from "classnames";
import { debounce, isArray, isEmpty } from "lodash";
import Link from "next/link";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import AppLayoutContext from "../context/app";
import {
  AppFetchNewsState,
  AppNotificationType,
  IAppNotification,
  IAppPromiseFunc,
} from "../interface/app";
import SearchPage from "../screen/search/SearchPage";

export interface AppLayoutProps extends PropsWithChildren<{}> {}

/**
 * Main layout of web app, includes navigation area and content area
 * Content area will be dynamic area for showing different content based on the page.
 */

function AppLayout(props: AppLayoutProps) {
  const { children } = props;

  const [search, setSearch] = useState<string>("");

  const [appNotification, setAppNotification] =
    useState<IAppNotification | null>(null);

  const [fetchNewsState, setFetchNewsState] =
    useState<AppFetchNewsState | null>();

  /**
   * after 3 seconds since app's notification is shown => hide notification
   */
  useEffect(() => {
    if (appNotification) {
      setTimeout(() => setAppNotification(null), 3000);
    }
  }, [appNotification]);

  /**
   * debounce user type search box by 500ms
   */
  const onChangeSearch = debounce((event) => {
    setSearch(event?.target?.value);
  }, 500);

  /**
   * This function be used to help making the Promise functions with a LoaderView or ErrorView
   * LoaderView be shown whenever this function is emitted
   * If Promise function is rejected => show ErrorView
   * Promise functions's resolve will be passed to param resolve
   */
  const fetchNews = (promiseFunction: IAppPromiseFunc[], resolve) => {
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

  const onBlurSearchInput = (event) =>
    setTimeout(() => {
      setSearch("");
      event.target.value = "";
    }, 700);

  const renderSiteBody = () => {
    if (fetchNewsState === AppFetchNewsState.ERROR) {
      return renderFetchNewsError();
    }
    if (!isEmpty(search)) {
      return <SearchPage search={search} />;
    }

    return children;
  };

  const renderFetchNewsError = () => {
    return (
      <div className="flex-center p-5">
        <h6>Oops! Error 404</h6>
      </div>
    );
  };

  return (
    <AppLayoutContext.Provider value={{ fetchNews, setAppNotification }}>
      <Fragment>
        <div className="site">
          <header className="site-header">
            <div className="container position-relative h-100">
              <Link href={"/"}>
                <img src="/images/logo.png" className="site-header__logo" />
              </Link>
              <div className="site-header__search-container flex-center p-1">
                <input
                  id="site-search-input"
                  className={classnames("site-header__search-input", {
                    "site-header__search-input-focus": !isEmpty(search),
                  })}
                  placeholder="Search all news"
                  autoFocus
                  onChange={(event) => onChangeSearch(event)}
                  onBlur={onBlurSearchInput}
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
