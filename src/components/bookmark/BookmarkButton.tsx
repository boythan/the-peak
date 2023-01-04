import classnames from "classnames";
import Icon from "../icon/Icon";

interface IBookmarkButton {
  className?: any;
}

const BookmarkButton = ({ className }: IBookmarkButton) => {
  const classNameContainer = classnames(
    "flex-center bg-primary py-1 px-2 border-radius-1",
    className
  );
  return (
    <div className={classNameContainer}>
      <Icon name="bookmark" className="text-white" />
      <text className="text-white">VIEW BOOKMARK</text>
    </div>
  );
};

export default BookmarkButton;
