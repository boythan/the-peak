import React, { CSSProperties } from "react";
import classnames from "classnames";
import styles from "./Icon.module.scss";
interface IconProps {
  name: string;
  size?: "large" | "medium" | "small";
  className?: string;
  style?: CSSProperties;
}
const Icon = ({ name, size = "medium", className, style }: IconProps) => {
  const iconClass = classnames(
    "material-icons",
    styles[`icon-${size}`],
    className
  );
  return (
    <i className={iconClass} style={style}>
      {name}
    </i>
  );
};

export default Icon;
