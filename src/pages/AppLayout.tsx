// react
import classnames from "classnames";
import { debounce, isEmpty } from "lodash";
import React, { Fragment, PropsWithChildren, useState } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import AppLink from "../components/AppLink";
import SearchPage from "../screen/search/SearchPage";

export interface AppLayoutProps extends PropsWithChildren<{}> {}

function AppLayout(props: AppLayoutProps) {
  const { children } = props;
  // const [search, setSearch] = useQueryParam("", withDefault(StringParam, ""));
  const [search, setSearch] = useState<string>("");

  const onChangeSearch = debounce((event) => {
    setSearch(event?.target?.value);
  }, 500);

  return (
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
          <div className="site-body">
            {isEmpty(search) && children}
            {!isEmpty(search) && <SearchPage search={search} />}
          </div>
        </React.StrictMode>

        <footer className="site-footer" />
      </div>
    </Fragment>
  );
}

export default AppLayout;
