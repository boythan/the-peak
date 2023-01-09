// react
import { ReactNode, useEffect, useRef, useState } from "react";

// third-party
import classNames from "classnames";

// application
import Menu from "../menu/Menu";

export interface DropdownProps {
  label: ReactNode;
  items?: any[];
  overlay?: any;
  onClick?: (item: any) => void;
  classButton?: string;
  className?: string;
}

function Dropdown(props: DropdownProps) {
  const { label, items, onClick, classButton, className, overlay } = props;
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setOpen((prev) => !prev);
  };

  const handleItemClick = (item: any) => {
    setOpen(false);

    if (onClick) {
      onClick(item);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as HTMLElement)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [wrapperRef, setOpen]);

  const classes = classNames(
    "dropdown py-1",
    {
      "dropdown--opened": open,
    },
    className
  );

  const buttonClass = classNames(
    `dropdown__btn flex-between-center ${classButton}`
  );

  const renderOverlay = () => {
    if (items && items?.length > 0) {
      return <Menu items={items as any} onClick={handleItemClick} />;
    }
    if (!overlay) {
      return overlay;
    }
    return <div />;
  };

  return (
    <div className={classes} ref={wrapperRef}>
      <button className={buttonClass} type="button" onClick={handleButtonClick}>
        {label}
        <img src={"/images/arrow_drop_down.svg"} />
      </button>

      <div className="dropdown__body">{renderOverlay()}</div>
    </div>
  );
}

export default Dropdown;
