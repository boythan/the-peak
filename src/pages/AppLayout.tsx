// react
import classnames from "classnames";
import { Fragment, PropsWithChildren } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import AppLink from "../components/AppLink";

export interface AppLayoutProps extends PropsWithChildren<{}> {}

function AppLayout(props: AppLayoutProps) {
  const { children } = props;
  const [search, setSearch] = useQueryParam("", withDefault(StringParam, ""));
  //general

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
                value={search}
                id="site-search-input"
                className={classnames("site-header__search-input")}
                placeholder="Search all news"
                autoFocus
                onChange={(event) => setSearch(event?.target?.value)}
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

        <div className="site-body">{children}</div>

        <footer className="site-footer" />
      </div>
    </Fragment>
  );
}

export default AppLayout;
