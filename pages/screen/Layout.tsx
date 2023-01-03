// react
import classnames from "classnames";
import { Fragment, PropsWithChildren } from "react";

export interface LayoutProps extends PropsWithChildren<{}> {}

function Layout(props: LayoutProps) {
  const { children } = props;
  //general

  const bodyClass = classnames("site-body");

  const footerClass = classnames("site-footer");

  if (false) {
    return <Fragment>{children} </Fragment>;
  }

  return (
    <Fragment>
      <div className="site">
        <header className="site-header ">
          <div className="container position-relative h-100">
            <img src="/images/logo.png" className="site-header__logo" />
          </div>
        </header>

        <div className={bodyClass}>{children}</div>

        <footer className={footerClass}>
          <div />
        </footer>
      </div>
    </Fragment>
  );
}

export default Layout;
