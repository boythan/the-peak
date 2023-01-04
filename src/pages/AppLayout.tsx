// react
import Image from "next/image";
import { Fragment, PropsWithChildren } from "react";
import AppLink from "../components/AppLink";
import Icon from "../components/icon/Icon";

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
              <Icon name="search" className="text-white" />
            </div>
          </div>
        </header>

        <div className="site-body body">{children}</div>

        <footer className="site-footer" />
      </div>
    </Fragment>
  );
}

export default AppLayout;
