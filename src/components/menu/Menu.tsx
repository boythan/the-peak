import { Fragment, ReactNode } from "react";
import classNames from "classnames";
import { filter, map } from "lodash";

interface IMenuItem {
  id: string;
  label: any;
}

interface IBaseMenuItem {
  [key: string]: any;
}

export interface MenuProps<T extends IMenuItem> {
  items: T & IBaseMenuItem[];
  onClick?: (item: T) => void;
  className?: string;
}

function Menu<T extends IMenuItem>(props: MenuProps<T>) {
  const { items = [], onClick = () => {}, className } = props;

  const renderLink = (item: T, content: ReactNode) => {
    return (
      <button type="button" onClick={() => onClick && onClick(item)}>
        {content}
      </button>
    );
  };

  const itemsList = map(
    filter(items, (item) => !!item),
    (item, index) => (
      <li key={index}>
        {renderLink(item as any, <Fragment>{item.label}</Fragment>)}
      </li>
    )
  );

  const classes = classNames(`menu ${className}`);

  return <ul className={classes}>{itemsList}</ul>;
}

export default Menu;
