// react
import Image from "next/image";
import { Fragment, PropsWithChildren, useState } from "react";
import AppLink from "../components/AppLink";
import classnames from "classnames";

export interface AppLayoutProps extends PropsWithChildren<{}> {}

function AppLayout(props: AppLayoutProps) {
  const { children } = props;

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
                id="site-search-input"
                className={classnames("site-header__search-input")}
                placeholder="Search all news"
                autoFocus
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
