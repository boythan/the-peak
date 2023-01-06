import classnames from "classnames";
import { toUpper } from "lodash";

interface IBookmarkButton {
  className?: any;
  content?: any;
  onClick: any;
}

const BookmarkButton = ({
  content = "view bookmark",
  onClick,
  className,
}: IBookmarkButton) => {
  const classNameContainer = classnames(
    "flex-center bg-primary py-1 px-2 border-radius-1",
    className
  );
  return (
    <button className={classNameContainer} onClick={onClick}>
      <img src="/images/bookmark-on.svg" className="mr-2" />
      <text className="text-white">{toUpper(content)}</text>
    </button>
  );
};

export default BookmarkButton;
